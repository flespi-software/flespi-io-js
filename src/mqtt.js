import mqtt from './flespi-mqtt-io/async'
import extender from './flespi-mqtt-io/index'
import uniqueId from 'lodash/uniqueId'
import merge from 'lodash/merge'

let _client = null, /* client of mqtt connection */
  _topics = {}, /* topics which subscribed by mqtt {'uniqueId': {name: String, handler: Function},...} */
  _config = {}, /* config of mqtt connection {server, port(optional), token} */
  _events = {}, /* store name of events and array of handlers by current event {name: [...handlers]} */
  _timestampsByTopic = {}, /* flespi feature by filtering by timestamp */
  _currentClientVersion = 0

function _generateTimestampFilteringWrapper (name, handler) {
  return function (message, topic, packet) {
    let timestamp = packet.properties && packet.properties.userProperties && packet.properties.userProperties.timestamp ? parseFloat(packet.properties.userProperties.timestamp) : 0,
      seqno = packet.properties && packet.properties.userProperties && packet.properties.userProperties.seqno ? parseFloat(packet.properties.userProperties.seqno) : 0
    if (!_timestampsByTopic[name]) { _timestampsByTopic[name] = {} }
    if (!_timestampsByTopic[name][topic]) { _timestampsByTopic[name][topic] = { timestamp: 0, seqno: 0 } }
    if (timestamp > _timestampsByTopic[name][topic].timestamp || (timestamp === _timestampsByTopic[name][topic].timestamp && seqno >= _timestampsByTopic[name][topic].seqno)) {
      handler(message, topic, packet)
      _timestampsByTopic[name][topic] = { timestamp, seqno }
    }
  }
}

/* Private method for creating, setting and subscribing for events of client of mqtt connection */
async function createClient () {
  if (_client) { // if client exist, clear him
    await _client.end(true)
  }
  /* if config is empty - dont create new client */
  if (!_config.token || !_config.server) { return false }
  /* configure baseURl by server and port from config */
  let baseURL = _config.server
  if (_config.port) {
    baseURL += `:${_config.port}`
  }
  let defaultMqttConfig = {
      reschedulePings: true,
      keepalive: 60,
      reconnectPeriod: 5000,
      connectTimeout: 30000,
      resubscribe: true
    },
    mqttConfig = Object.assign(defaultMqttConfig, _config.mqttSettings)
  mqttConfig.username = _config.token
  mqttConfig.clientId = _config.clientId || `flespi-io-js_${Math.random().toString(16).substr(2, 8)}`
  /* mqtt connection creating by baseURL and token */
  _client = mqtt.connect(baseURL, mqttConfig)

  /* make subscribe to all topics on client after connecting */
  _client.on('connect', (connack) => {
    if (!connack.sessionPresent && !mqttConfig.resubscribe) {
      _topics = {}
    }
    _currentClientVersion = _config.mqttSettings && _config.mqttSettings.protocolVersion ? _config.mqttSettings.protocolVersion : 4
    /* handling all handler by connect event */
    if (_events['connect']) {
      _events['connect'].forEach((handler) => { typeof handler === 'function' && handler(connack) })
    }
  })

  /* Handle errors of connect by mqtt */
  _client.on('error', (error) => {
    /* processing by error code */
    if (error.code === 2) { mqttConnector.close(true) }
    /* handling all handler by error event */
    if (_events['error']) {
      _events['error'].forEach((handler) => { typeof handler === 'function' && handler(error) }) /* error = {message, code} */
    }
  })

  /* Handle disconnect of connect */
  _client.on('close', () => {
    if (!_config.mqttSettings || (_config.mqttSettings && (_config.mqttSettings.clean === undefined || _config.mqttSettings.clean === true))) { _timestampsByTopic = {} }
    /* handling all handler by close event */
    if (_events['close']) {
      _events['close'].forEach((handler) => { typeof handler === 'function' && handler() })
    }
  })

  /* Handle disconnect by broker */
  _client.on('disconnect', (packet) => {
    /* handling all handler by close event */
    if (_events['disconnect']) {
      _events['disconnect'].forEach((handler) => { typeof handler === 'function' && handler(packet) })
    }
  })

  /* calling each callbacks by subscribed topic after getting new message. */
  const fallbackMessageProcessing = (topic, message, packet) => {
      let topicPath = topic.split('/'), /* getting full topic path */
        /* searching for all the signed topics that criteria for the current current topic, comparing their path trees */
        activeTopicsId = Object.keys(_topics).filter((checkedTopicId) => {
          let currentTopicPath = _topics[checkedTopicId].name.split('/')
          /* process $share subscriptions */
          if (currentTopicPath[0] === '$share') {
            currentTopicPath.splice(0, 2)
          }
          /* if the lengths are the same or the last element of the path is '#'. '#' can just be in the end of the path of the subscribed topic */
          if (currentTopicPath.length === topicPath.length || currentTopicPath[currentTopicPath.length - 1] === '#') {
            return currentTopicPath.reduce((result, currentPath, index) => {
              /*
                            '+' in the path of the topic means any part of the path of the topic.
                            '#' in the path of the topic means any part or later length of the path of the topic.
                            */
              if (currentPath === '#' || currentPath === '+') {
                return result && true
              }
              return result && currentPath === topicPath[index]
            }, true)
          } else {
            return false
          }
        })
      /* calling each callbacks with payload as message by subscribed topic. */
      activeTopicsId.forEach((topicId) => {
        try {
          _topics[topicId].handler(message, topic, packet)
        } catch (e) {
          console.log(e)
        }
      })
    },
    messageProcessing = (topic, message, packet) => {
      if (_currentClientVersion !== 5) {
        return fallbackMessageProcessing(topic, message, packet)
      }
      let activeTopicsId = packet.properties && packet.properties.subscriptionIdentifier
      if (typeof activeTopicsId === 'number') {
        activeTopicsId = [activeTopicsId]
      }
      /* calling each callbacks with payload as message by subscribed topic. */
      activeTopicsId.forEach((topicId) => {
        try {
          _topics[topicId] && _topics[topicId].handler(message, topic, packet)
        } catch (e) {
          console.log(e)
        }
      })
    }
  _client.on('message', messageProcessing)

  /* handling reconnect */
  _client.on('reconnect', () => {
    if (_events['reconnect']) {
      _events['reconnect'].forEach((handler) => { typeof handler === 'function' && handler() })
    }
  })

  /* handling offline */
  _client.on('offline', () => {
    if (_events['offline']) {
      _events['offline'].forEach((handler) => { typeof handler === 'function' && handler() })
    }
  })

  /* handling end */
  _client.on('end', () => {
    if (_events['end']) {
      _events['end'].forEach((handler) => { typeof handler === 'function' && handler() })
    }
  })
}
/* Main function of mqtt connection. It setting up private variables and creating of client. Topics must be an Object or Array */
function mqttConnector (topics) {
  /* Check type of topics */
  let indexes = []
  if (topics instanceof Array) {
    /* If type is Array - set to _topics new topics and save his index to indexes */
    topics.forEach((topic) => {
      let id = uniqueId()
      _topics[id] = topic
      indexes.push(id)
    })
  } else {
    /* If type is Object - set to _topics and set index */
    let id = uniqueId()
    _topics[id] = topics
    indexes = id
  }
  createClient()
  /* return indexes/index of new subscribed topics/topic */
  return indexes
}

mqttConnector.init = async function init (token, config) {
  if (!Object.keys(_config).length) {
    _config = Object.assign(config, { token: token })
  }
  if (!_client) { await createClient() }
}

/* Updating function of the mqtt connection. Thats update private params of the connection and rebuild client */
mqttConnector.update = async function update (type, payload) {
  switch (type) {
    case 'token': {
      _config.token = payload
      if (_client) { /* if has client */
        if (payload) { /* if token isn`t empty - recreate client */
          await createClient()
        } else { await mqttConnector.close(true) }/* else close it */
      } else { await createClient() }
      break
    }
    case 'config': {
      _config = Object.assign(_config, payload)
      if (_client) { await createClient() } else { await createClient() }
      break
    }
  }
}

/* Check has client */
mqttConnector.hasClient = () => !!_client

/* Check connection status */
mqttConnector.connected = () => !!_client && _client.connected

/* Subscription method for client of mqtt */
mqttConnector.subscribe = async function subscribe (topic) {
  let isProtocolNew = _config.mqttSettings && _config.mqttSettings.protocolVersion === 5
  if (!Array.isArray(topic)) {
    topic = [topic]
  }
  return topic.reduce(async (result, topic) => {
    let id = Number(uniqueId())
    if (isProtocolNew && topic.options && topic.options.filterByTimestamp) {
      topic.handler = _generateTimestampFilteringWrapper(topic.name, topic.handler)
    }
    if (isProtocolNew) {
      if (!topic.options) { topic.options = {} }
      topic.options = merge(topic.options, { properties: { subscriptionIdentifier: id } })
    }
    _topics[id] = topic
    /* if has client and he is connected */
    if (_client) {
      try {
        let granted = await _client.subscribe(topic.name, topic.options)
        result[id] = granted
      } catch (e) {
        result[id] = e
      }
    } else {
      result[id] = new Error('Client don`t created')
    }
    return result
  }, {})
}
/* Unsubscription method for client of mqtt by topic name or topic names. */
mqttConnector.unsubscribe = async function unsubscribe (name, unsubId, options) {
  /* Searching for indexes removable topics from private storage */
  let removableTopicsIndexes = Object.keys(_topics).reduce((result, topicId, index) => {
    if ((typeof name === 'string' && _topics[topicId].name === name) || (name instanceof Array && name.includes(_topics[topicId].name))) {
      result.push(topicId)
    }
    return result
  }, [])
  let filteredRemovableTopicsIndexes = removableTopicsIndexes
  if (unsubId) {
    filteredRemovableTopicsIndexes = removableTopicsIndexes.filter(topicId => {
      /* if second argument is right index */
      return topicId === unsubId || (unsubId instanceof Array && unsubId.includes(topicId))
    })
  }
  let needUnsubscribe = filteredRemovableTopicsIndexes.length === removableTopicsIndexes.length
  /* remove thats topics */
  filteredRemovableTopicsIndexes.forEach((index) => {
    let topic = _topics[index]
    if (topic.options && topic.options.filterByTimestamp && _timestampsByTopic[topic.name]) {
      delete _timestampsByTopic[topic.name]
    }
    delete _topics[index]
  })
  /* if has client and he is connected */
  if (needUnsubscribe && !_client._client.disconnecting) {
    let state = await _client.unsubscribe(name, options)
    return state
  } else { return false }
}
/* Unsubscription method for client of mqtt from all topics */
mqttConnector.unsubscribeAll = async function unsubscribeAll (options) {
  _timestampsByTopic = {}
  for (let topicId of Object.keys(_topics)) {
    await _client.unsubscribe(_topics[topicId].name, options)
  }
}
/* Publishing method for client of mqtt. publish(topic, message, [options]). Message must be a String or Buffer */
mqttConnector.publish = async function () {
  if (_client) {
    let state = await _client.publish(...arguments)
    return state
  } else {
    throw new Error('Client is empty')
  }
}
/* Closing method for client of mqtt. Closing session by client and clear private variable _client */
mqttConnector.close = async function close () {
  if (_client) {
    _topics = {}
    return _client.end(...arguments)/* if need force end */
      .then(() => {
        _client = null
      })
  }
}

mqttConnector.end = mqttConnector.close

/* method attach event to mqtt client
* @param {String} name   name of event
* @param {Function} handler   handler of event which need add
* */
mqttConnector.on = function on (name, handler) {
  /* create namespace for current event if it doesn`t exist */
  if (!_events[name]) {
    _events[name] = []
  }
  /* save handler in namespace by current event */
  _events[name].push(handler)
  return _events[name].length - 1
}

/* clear event or remove current handler from event
* @param {String} name   name of event
* @param {Number/Array} index   index or array of indexes of current event`s handler
* */
mqttConnector.off = function off (name, index) {
  /* check has handler and process remove handlers */
  if (index !== undefined) {
    let currentHandlerIndex = Array.isArray(index) ? index : [index]
    /* remove all handlers like a current handler */
    currentHandlerIndex.forEach((index) => { _events[name][index] = undefined })
  } else { /* if need clear all handlers by event */
    if (_events[name]) {
      _events[name] = undefined
    }
  }
}

export default extender(mqttConnector)

import mqtt from './flespi-mqtt-io/async'
import uniqueId from 'lodash/uniqueId'
import merge from 'lodash/merge'

class MQTT {
  constructor (config) {
    this._client = null, /* client of mqtt connection */
    this._topics = {}, /* topics which subscribed by mqtt {'uniqueId': {name: String, handler: Function},...} */
    this._config = config, /* config of mqtt connection {server, port(optional), token} */
    this._timestampsByTopic = {}, /* flespi feature by filtering by timestamp */
    this._currentClientVersion = 0
    this._events = {} /* store name of events and array of handlers by current event {name: [...handlers]} */
    this._createClient()
  }
  _generateTimestampFilteringWrapper (name, handler) {
    return function (message, topic, packet) {
      const timestamp = packet.properties && packet.properties.userProperties && packet.properties.userProperties.timestamp ? parseFloat(packet.properties.userProperties.timestamp) : 0
      if (!this._timestampsByTopic[name]) { this._timestampsByTopic[name] = {} }
      if (!this._timestampsByTopic[name][topic]) { this._timestampsByTopic[name][topic] = { timestamp: 0 } }
      if (timestamp > this._timestampsByTopic[name][topic].timestamp) {
        handler(message, topic, packet)
        this._timestampsByTopic[name][topic] = { timestamp }
      }
    }
  }

  /* Private method for creating, setting and subscribing for events of client of mqtt connection */
  async _createClient () {
    if (this._client) { // if client exist, clear him
      await this._client.end(true)
    }
    /* if config is empty - dont create new client */
    if (!this._config.token || !this._config.server) { return false }
    /* configure baseURl by server and port from config */
    let baseURL = this._config.server
    if (this._config.port) {
      baseURL += `:${this._config.port}`
    }
    const defaultMqttConfig = {
        reschedulePings: true,
        keepalive: 60,
        reconnectPeriod: 5000,
        connectTimeout: 30000,
        resubscribe: true
      },
      mqttConfig = Object.assign(defaultMqttConfig, this._config.mqttSettings)
    mqttConfig.username = this._config.token
    mqttConfig.clientId = this._config.clientId || `flespi-io-js_${Math.random().toString(16).substr(2, 8)}`
    /* mqtt connection creating by baseURL and token */
    this._client = mqtt.connect(baseURL, mqttConfig)

    /* make subscribe to all topics on client after connecting */
    this._client.on('connect', (connack) => {
      if (!connack.sessionPresent && !mqttConfig.resubscribe) {
        this._topics = {}
      }
      this._currentClientVersion = this._config.mqttSettings && this._config.mqttSettings.protocolVersion ? this._config.mqttSettings.protocolVersion : 4
      /* handling all handler by connect event */
      if (this._events.connect) {
        this._events.connect.forEach((handler) => { typeof handler === 'function' && handler(connack) })
      }
    })

    /* Handle errors of connect by mqtt */
    this._client.on('error', (error) => {
      /* processing by error code */
      if (error.code === 2) { this.close(true) }
      /* handling all handler by error event */
      if (this._events.error) {
        this._events.error.forEach((handler) => { typeof handler === 'function' && handler(error) }) /* error = {message, code} */
      }
    })

    /* Handle disconnect of connect */
    this._client.on('close', () => {
      if (!this._config.mqttSettings || (this._config.mqttSettings && (this._config.mqttSettings.clean === undefined || this._config.mqttSettings.clean === true))) { this._timestampsByTopic = {} }
      /* handling all handler by close event */
      if (this._events.close) {
        this._events.close.forEach((handler) => { typeof handler === 'function' && handler() })
      }
    })

    /* Handle disconnect by broker */
    this._client.on('disconnect', (packet) => {
      /* handling all handler by close event */
      if (this._events.disconnect) {
        this._events.disconnect.forEach((handler) => { typeof handler === 'function' && handler(packet) })
      }
    })

    /* calling each callbacks by subscribed topic after getting new message. */
    const fallbackMessageProcessing = (topic, message, packet) => {
        const topicPath = topic.split('/'), /* getting full topic path */
          /* searching for all the signed topics that criteria for the current current topic, comparing their path trees */
          activeTopicsId = Object.keys(this._topics).filter((checkedTopicId) => {
            const currentTopicPath = this._topics[checkedTopicId].name.split('/')
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
            this._topics[topicId].handler(message, topic, packet)
          } catch (e) {
            console.log(e)
          }
        })
      },
      messageProcessing = (topic, message, packet) => {
        if (this._currentClientVersion !== 5) {
          return fallbackMessageProcessing(topic, message, packet)
        }
        let activeTopicsId = packet.properties && packet.properties.subscriptionIdentifier
        if (typeof activeTopicsId === 'number') {
          activeTopicsId = [activeTopicsId]
        }
        /* calling each callbacks with payload as message by subscribed topic. */
        activeTopicsId && activeTopicsId.forEach((topicId) => {
          try {
            this._topics[topicId] && this._topics[topicId].handler(message, topic, packet)
          } catch (e) {
            console.log(e)
          }
        })
      }
    this._client.on('message', messageProcessing)

    /* handling reconnect */
    this._client.on('reconnect', () => {
      if (this._events.reconnect) {
        this._events.reconnect.forEach((handler) => { typeof handler === 'function' && handler() })
      }
    })

    /* handling offline */
    this._client.on('offline', () => {
      if (this._events.offline) {
        this._events.offline.forEach((handler) => { typeof handler === 'function' && handler() })
      }
    })

    /* handling end */
    this._client.on('end', () => {
      if (this._events.end) {
        this._events.end.forEach((handler) => { typeof handler === 'function' && handler() })
      }
    })
  }

  /* Updating function of the mqtt connection. Thats update private params of the connection and rebuild client */
  async update (type, payload) {
    switch (type) {
      case 'token': {
        this._config.token = payload
        if (this._client) { /* if has client */
          if (payload) { /* if token isn`t empty - recreate client */
            await this._createClient()
          } else { await this.close(true) }/* else close it */
        } else { await this._createClient() }
        break
      }
      case 'config': {
        this._config = Object.assign(this._config, payload)
        if (this._client) { await this._createClient() } else { await this._createClient() }
        break
      }
    }
  }

  /* Check has client */
  hasClient () { return !!this._client }

  /* Check connection status */
  connected () { return !!this._client && this._client.connected }

  /* Subscription method for client of mqtt */
  async subscribe (topic) {
    const isProtocolNew = this._config.mqttSettings && this._config.mqttSettings.protocolVersion === 5
    if (!Array.isArray(topic)) {
      topic = [topic]
    }
    return topic.reduce(async (result, topic) => {
      const id = Number(uniqueId())
      if (isProtocolNew && topic.options && topic.options.filterByTimestamp) {
        topic.handler = this._generateTimestampFilteringWrapper(topic.name, topic.handler)
      }
      if (isProtocolNew) {
        if (!topic.options) { topic.options = {} }
        topic.options = merge(topic.options, { properties: { subscriptionIdentifier: id } })
      }
      this._topics[id] = topic
      /* if has client and he is connected */
      if (this._client) {
        try {
          const granted = await this._client.subscribe(topic.name, topic.options)
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
  async unsubscribe (name, unsubId, options) {
    /* Searching for indexes removable topics from private storage */
    const removableTopicsIndexes = Object.keys(this._topics).reduce((result, topicId, index) => {
      if ((typeof name === 'string' && this._topics[topicId].name === name) || (name instanceof Array && name.includes(this._topics[topicId].name))) {
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
    const needUnsubscribe = filteredRemovableTopicsIndexes.length === removableTopicsIndexes.length
    /* remove thats topics */
    filteredRemovableTopicsIndexes.forEach((index) => {
      const topic = this._topics[index]
      if (topic.options && topic.options.filterByTimestamp && this._timestampsByTopic[topic.name]) {
        delete this._timestampsByTopic[topic.name]
      }
      delete this._topics[index]
    })
    /* if has client and he is connected */
    if (needUnsubscribe && !this._client._client.disconnecting) {
      const state = await this._client.unsubscribe(name, options)
      return state
    } else { return false }
  }

  /* Unsubscription method for client of mqtt from all topics */
  async unsubscribeAll (options) {
    this._timestampsByTopic = {}
    for (const topicId of Object.keys(this._topics)) {
      await this._client.unsubscribe(this._topics[topicId].name, options)
    }
  }

  /* Publishing method for client of mqtt. publish(topic, message, [options]). Message must be a String or Buffer */
  async publish () {
    if (this._client) {
      const state = await this._client.publish(...arguments)
      return state
    } else {
      throw new Error('Client is empty')
    }
  }

  /* Closing method for client of mqtt. Closing session by client and clear private variable this._client */
  async close () {
    if (this._client) {
      this._topics = {}
      return this._client.end(...arguments)/* if need force end */
        .then(() => {
          this._client = null
        })
    }
  }

  async end () { return await this.close(...arguments) }

  /* method attach event to mqtt client
  * @param {String} name   name of event
  * @param {Function} handler   handler of event which need add
  * */
  on (name, handler) {
    /* create namespace for current event if it doesn`t exist */
    if (!this._events[name]) {
      this._events[name] = []
    }
    /* save handler in namespace by current event */
    this._events[name].push(handler)
    return this._events[name].length - 1
  }

  /* clear event or remove current handler from event
  * @param {String} name   name of event
  * @param {Number/Array} index   index or array of indexes of current event`s handler
  * */
  off (name, index) {
    /* check has handler and process remove handlers */
    if (index !== undefined) {
      const currentHandlerIndex = Array.isArray(index) ? index : [index]
      /* remove all handlers like a current handler */
      currentHandlerIndex.forEach((index) => { this._events[name][index] = undefined })
    } else { /* if need clear all handlers by event */
      if (this._events[name]) {
        this._events[name] = undefined
      }
    }
  }
}

/* Main function of mqtt connection. It setting up private variables and creating of client. Topics must be an Object or Array */
// function mqttConnector (topics) {
//   /* Check type of topics */
//   let indexes = []
//   if (topics instanceof Array) {
//     /* If type is Array - set to this._topics new topics and save his index to indexes */
//     topics.forEach((topic) => {
//       const id = uniqueId()
//       this._topics[id] = topic
//       indexes.push(id)
//     })
//   } else {
//     /* If type is Object - set to this._topics and set index */
//     const id = uniqueId()
//     this._topics[id] = topics
//     indexes = id
//   }
//   this._createClient()
//   /* return indexes/index of new subscribed topics/topic */
//   return indexes
// }

export default MQTT

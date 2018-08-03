import mqtt from './flespi-mqtt-io/async'
import extender from './flespi-mqtt-io/index'
import uniqueId from 'lodash/uniqueId'

let _client = null, /* client of mqtt connection */
    _topics = {}, /* topics which subscribed by mqtt {'uniqueId': {name: String, handler: Function},...} */
    _config = {}, /* config of mqtt connection {server, port(optional), token} */
    _events = {} /* store name of events and array of handlers by current event {name: [...handlers]} */

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
        keepalive: 3600,
        resubscribe: false,
        reconnectPeriod: 5000,
        connectTimeout: 3600000
    },
        mqttConfig = Object.assign(defaultMqttConfig, _config.mqttSettings)
    mqttConfig.username = _config.token
    mqttConfig.clientId = _config.clientId || `flespi-io-js_${Math.random().toString(16).substr(2, 8)}`
    /*mqtt connection creating by baseURL and token*/
    _client = mqtt.connect(baseURL, mqttConfig)

    /* make subscribe to all topics on client after connecting */
    _client.on('connect', () => {
        let topicsKeys = Object.keys(_topics)
        if (topicsKeys.length) {
            topicsKeys.forEach((topicId) => {
                _client.subscribe(_topics[topicId].name)
            })
        }
        /* handling all handler by connect event */
        if (_events['connect']) {
            _events['connect'].forEach((handler) => { handler() })
        }
    })

    /* Handle errors of connect by mqtt */
    _client.on('error', (error) => {
        let message = '' /* error message */
        /* processing by error code */
        switch (error.code) {
            case 2: {
                mqttConnector.close(true)
                message = 'connection refused, identifier rejected'
                break
            }
            case 3: {
                message = 'connection refused, server unavailable'
                break
            }
            case 5: {
                message = 'connection refused, not authorized'
                break
            }
        }
        /* handling all handler by error event */
        if (_events['error']) {
            _events['error'].forEach((handler) => { handler(Object.assign({ message }, error)) }) /* error = {message, code} */
        }
    })

    /* Handle disconnect of connect */
    _client.on('close', () => {
        /* handling all handler by close event */
        if (_events['close']) {
            _events['close'].forEach((handler) => { handler() })
        }
    })

    /* calling each callbacks by subscribed topic after getting new message. */
    _client.on('message', (topic, message, packet) => {
        let topicPath = topic.split('/'), /* getting full topic path */
            /* searching for all the signed topics that criteria for the current current topic, comparing their path trees */
            activeTopicsId = Object.keys(_topics).filter((checkedTopicId) => {
                let currentTopicPath = _topics[checkedTopicId].name.split('/')
                    /*if the lengths are the same or the last element of the path is '#'. '#' can just be in the end of the path of the subscribed topic */
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
                }
                else {
                    return false
                }
            })
        /* calling each callbacks with payload as message by subscribed topic. */
        activeTopicsId.forEach((topicId) => { _topics[topicId].handler(message, topic, packet) })
    })

    /* handling reconnect */
    _client.on('reconnect', () => {
        if (_events['reconnect']) {
            _events['reconnect'].forEach((handler) => { handler() })
        }
    })

    /* handling offline */
    _client.on('offline', () => {
        if (_events['offline']) {
            _events['offline'].forEach((handler) => { handler() })
        }
    })

    /* handling end */
    _client.on('end', () => {
        if (_events['end']) {
            _events['end'].forEach((handler) => { handler() })
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
    }
    else {
        /* If type is Object - set to _topics and set index */
        let id = uniqueId()
        _topics[id] = topics
        indexes = id
    }
    createClient()
    /* return indexes/index of new subscribed topics/topic */
    return indexes
}

mqttConnector.init = async function init(token, config) {
    if (!Object.keys(_config).length) {
        _config = Object.assign(config, {token: token})
    }
    if (!_client) { await createClient() }
}

/* Updating function of the mqtt connection. Thats update private params of the connection and rebuild client */
mqttConnector.update = async function update(type, payload) {
    switch (type) {
        case 'token': {
            _config.token = payload
            if (_client) { /* if has client */
                if (payload) { await createClient() }/* if token isn`t empty - recreate client */
                else { await mqttConnector.close(true) }/* else close it */
            }
            else { await createClient() }
            break
        }
        case 'config': {
            _config = Object.assign(_config, payload)
            if (_client) { await createClient() }
            else { await createClient() }
            break
        }
    }
}

/* Check has client */
mqttConnector.hasClient = () => !!_client

/* Check connection status */
mqttConnector.connected = () => !!_client && _client._client.connected

/* Subscription method for client of mqtt */
mqttConnector.subscribe = async function subscribe(topic) {
    debugger
    if (topic instanceof Array) {
        /* return array of subscribed indexes of topics */
        return topic.reduce(async (result, topic) => {
            let id = uniqueId()
            _topics[id] = topic
            /* if has client and he is connected */
            if (_client) {
                try {
                    let granted = await _client.subscribe(topic.name, topic.options)
                    result[id] = Promise.resolve(granted)
                } catch (e) {
                    result[id] = Promise.reject(e)
                }
            }
            else {
                result[id] = Promise.reject(new Error('Client don`t created'))
            }
            return result
        }, {})
    }
    else if (typeof topic === 'object') {
        let id = uniqueId()
        _topics[id] = topic
        /* if has client and he is connected */
        if (_client) {
            try {
                let granted = await _client.subscribe(topic.name, topic.options)
                /* return granted by index of new subscription */
                return Promise.resolve({[id]: granted})
            } catch (e) {
                return Promise.reject(e)
            }
        }
        else { return Promise.reject(new Error('Client don`t created')) }
    }
    else { return Promise.reject(new Error('Not valid type of topic/topics')) }
}
/* Unsubscription method for client of mqtt by topic name or topic names. */
mqttConnector.unsubscribe = async function unsubscribe (name) {
    /* Searching for indexes removable topics from private storage */
    let removableTopicsIndexes = Object.keys(_topics).reduce((result, topicId, index) => {
        if ((typeof name === 'string' && _topics[topicId].name === name) || (name instanceof Array && name.includes(_topics[topicId].name))) {
            /* check has index in arguments */
            if (arguments[1]) {
                /* if second argument is right index */
                if (topicId === arguments[1]) {
                    result.push(topicId)
                }
            }
            else { result.push(topicId) }
        }
        return result
    }, [])
    /* remove thats topics */
    removableTopicsIndexes.forEach((index) => { delete _topics[index] })
    /* if has client and he is connected */
    if (removableTopicsIndexes.length && !_client._client.disconnecting) { return await _client.unsubscribe(name) }
    else { return false }
}
/* Unsubscription method for client of mqtt from all topics */
mqttConnector.unsubscribeAll = async function unsubscribeAll() {
    Object.keys(_topics).forEach(async (topicId) => {
        await _client.unsubscribe(_topics[topicId].name)
    })
}
/* Publishing method for client of mqtt. publish(topic, message, [options]). Message must be a String or Buffer */
mqttConnector.publish = async function () {
    if (_client) {
        return await _client.publish(...arguments)
    }
    else {
        throw new Error('Client is empty')
    }
}
/* Closing method for client of mqtt. Closing session by client and clear private variable _client */
mqttConnector.close = async function close() {
    if (_client) {
        _topics = {}
        return _client.end(arguments[0])/* if need force end */
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
mqttConnector.on = function on(name, handler) {
    /* create namespace for current event if it doesn`t exist */
    if (!_events[name]) {
        _events[name] = []
    }
    /* save handler in namespace by current event */
    _events[name].push(handler)
}

/* clear event or remove current handler from event
* @param {String} name   name of event
* */
mqttConnector.off = function off(name) {
    /* check has handler and process remove handlers */
    if (arguments[1] && typeof arguments[1] === 'function') {
        /* search for current handler entries by current event */
        let currentHandler = arguments[1]
        let currentHandlerIndexesInStore = _events[name].reduce((result, handler, index) => {
            if (handler.toString() === currentHandler.toString()) { result.push(index) }
            return result
        }, [])
        /* remove all handlers like a current handler */
        currentHandlerIndexesInStore.forEach((index) => { _events[name].splice(index, 1) })
    }
    /* if need clear all handlers by event */
    else {
        if (_events[name]) {
            _events[name] = undefined
        }
    }
}

export default extender(mqttConnector)
# flespi-io-js

> flespi-io-js is a library for connecting to [flespi.io](https://flespi.io) via http and mqtt protocols.

## Features
* http connection
* mqtt connection

## Prerequisites:

- [Node.js](https://nodejs.org/en/) (>=6.x)
- npm version 3+ and [Git](https://git-scm.com/).

## Installation
```sh
npm install git+https://github.com/flespi-software/flespi-io-js.git --save
```

## API
### class Connection
Connection make global connector by passed config
The arguments are:
* `config` is a global config for all connections you have
    * `token` is a token for connections
    * `httpConfig` config for http connections
        * `server` server for http connections
        * `port (optional)` port for http connections
    * `mqttConfig` config for mqtt connections
        * `server` server for mqtt connections
        * `port (optional)` port for mqtt connections
 
        
### getters and setters

```js
let connector = new Connection({
  token: 'FlespiToken xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  httpConfig: { server: 'https://server.io', port: 8080 },
  mqttConfig: { server: `ws://server.io` }
})
```

* Token

```js
let token = connector.token
connector.token = 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
```

* httpConfig

```js
let httpConfig = connector.httpConfig
connector.httpConfig = { server: 'http://server.io', port: 80 }
```

* mqttConfig

```js
let mqttConfig = connector.mqttConfig
connector.mqttConfig = { server: 'ws://mqtt.server.io' }
```

### HTTP
Method for making http requests. It`s using axios as a dependency. So API of HTTP is the same as axios [HTTP API axios](https://github.com/axios/axios) 
* `Connector#http(options)`: same options axios
* `Connector#http.get(url, [options])`,
* `Connector#http.delete(url, [options])`,
* `Connector#http.post(url, data, [options])`,
* `Connector#http.put(url,data, [options])`
    * `url` is the server URL that will be used for the request
    * `data` is the data to be sent as the request body
    * `options` are another options by axios API

Methods for easy access to flespi.io API. More info: [FlespiDocs](https://flespi.io/#/panel/docs)

Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string 
* `body`: Params in plain object for request body 

### Platform API

* `Connector#getCustomer(query)`
* `Connector#http.customer.get(query)`
* `Connector#getCustomerAccounts(accountSelector, query)`
* `Connector#http.customer.accounts.get(accountSelector, query)`
* `Connector#deleteCustomerAccounts(accountSelector)`
* `Connector#http.customer.accounts.delete(accountSelector)`
* `Connector#getCustomerLogs(query)`
* `Connector#http.customer.logs.get(query)`
* `Connector#getCustomerStatistics(query)`
* `Connector#http.customer.statistics.get(query)`
* `Connector#getCustomerTokens(tokenSelector, query)`
* `Connector#http.customer.tokens.get(tokenSelector, query)`
* `Connector#postCustomerTokens(query, body)`
* `Connector#http.customer.tokens.post(query, body)`
* `Connector#deleteCustomerTokens(tokenSelector)`
* `Connector#http.customer.tokens.delete(tokenSelector)`
* `Connector#putCustomerTokens(tokenSelector, query, body)`
* `Connector#http.customer.tokens.put(tokenSelector, query, body)`

### Gateway API

* `Connector#getProtocols(protocolSelector, query)`
* `Connector#http.protocols.get(protocolSelector, query)`
* `Connector#getProtocolsCommands(protocolSelector, protocolCmdsSelector, query)`
* `Connector#http.protocols.commands.get(protocolSelector, protocolCmdsSelector, query)`
* `Connector#getProtocolsDeviceTypes(protocolSelector, deviceTypeSelector, query)`
* `Connector#http.protocols.deviceTypes.get(protocolSelector, deviceTypeSelector, query)`


* `Connector#getChannels(channelSelector, query)`
* `Connector#http.channels.get(channelSelector, query)`
* `Connector#getChannelsCommandsQueue(channelSelector, commandsQueueSelector, query)`
* `Connector#http.channels.commandsQueue(channelSelector, commandsQueueSelector, query)`
* `Connector#getChannelsCommandsResult(channelSelector, commandsResultSelector, query)`
* `Connector#http.channels.commandsResult.get(channelSelector, commandsResultSelector, query)`
* `Connector#getChannelsConnections(channelSelector, connectionSelector, query)`
* `Connector#http.channels.connections.get(channelSelector, connectionSelector, query)`
* `Connector#getChannelsLogs(channelSelector, query)`
* `Connector#http.channels.logs.get(channelSelector, query)`
* `Connector#getChannelsMessages(channelSelector, query)`
* `Connector#http.channels.messages.get(channelSelector, query)`
* `Connector#postChannels(query, body)`
* `Connector#http.channels.post(query, body)`
* `Connector#postChannelsCommandsQueue(channelSelector, query, body)`
* `Connector#http.channels.commandsQueue.post(channelSelector, query, body)`
* `Connector#putChannels(channelSelector, query, body)`
* `Connector#http.channels.put(channelSelector, query, body)`
* `Connector#deleteChannels(channelSelector)`
* `Connector#http.channels.delete(channelSelector)`
* `Connector#deleteChannelsCommandsQueue(channelSelector, commandsQueueSelector)`
* `Connector#http.channels.commandsQueue.delete(channelSelector, commandsQueueSelector)`
* `Connector#deleteChannelsCommandsResult(channelSelector, commandsResultSelector, body)`
* `Connector#http.channels.commandsResult.delete(channelSelector, commandsResultSelector, body)`
* `Connector#deleteChannelsConnections(channelSelector, connectionSelector)`
* `Connector#http.channels.connections.delete(channelSelector, connectionSelector)`
* `Connector#deleteChannelsMessages(channelSelector, body)`
* `Connector#http.channels.messages.delete(channelSelector, body)`


* `Connector#getModems(modemSelector, query)`
* `Connector#http.modems.get(modemSelector, query)`
* `Connector#getModemsLogs(modemSelector, query)`
* `Connector#http.modems.logs.get(modemSelector, query)`
* `Connector#postModems(query, body)`
* `Connector#http.modems.post(query, body)`
* `Connector#putModems(modemSelector, query, body)`
* `Connector#http.modems.put(modemSelector, query, body)`
* `Connector#deleteModems(modemSelector)`
* `Connector#http.modems.delete(modemSelector)`

### Storage API

* `Connector#getAbques(abqueSelector, query)`
* `Connector#http.abques.get(abqueSelector, query)`
* `Connector#getAbquesLogs(abqueSelector, query)`
* `Connector#http.abques.logs.get(abqueSelector, query)`
* `Connector#getAbquesMessages(abqueSelector, query)`
* `Connector#http.abques.messages.get(abqueSelector, query)`
* `Connector#postAbques(query, body)`
* `Connector#http.abques.post(query, body)`
* `Connector#postAbquesMessages(abqueSelector, body)`
* `Connector#http.abques.messages.post(abqueSelector, body)`
* `Connector#putAbques(abqueSelector, query, body)`
* `Connector#http.abques.put(abqueSelector, query, body)`
* `Connector#deleteAbques(abqueSelector)`
* `Connector#http.abques.delete(abqueSelector)`
* `Connector#deleteAbquesMessages(abqueSelector, body)`
* `Connector#http.abques.messages.delete(abqueSelector, body)`

* `Connector#getContainers(containerSelector, query)`
* `Connector#http.containers.get(containerSelector, query)`
* `Connector#getContainersLogs(containerSelector, query)`
* `Connector#http.containers.logs.get(containerSelector, query)`
* `Connector#getContainersMessages(containerSelector, query)`
* `Connector#http.containers.messages.get(containerSelector, query)`
* `Connector#postContainers(query, body)`
* `Connector#http.containers.post(query, body)`
* `Connector#postContainersMessages(containerSelector, body)`
* `Connector#http.containers.messages.post(containerSelector, body)`
* `Connector#putContainers(containerSelector, body)`
* `Connector#http.containers.put(containerSelector, body)`
* `Connector#deleteContainers(containerSelector)`
* `Connector#http.containers.delete(containerSelector)`
* `Connector#deleteContainersMessages(containerSelector, query)`
* `Connector#http.containers.messages.delete(containerSelector, query)`

### Registry API

* `Connector#getDevices(devSelector, query)`
* `Connector#http.devices.get(devSelector, query)`
* `Connector#getDevicesLogs(devSelector, query)`
* `Connector#http.devices.logs.get(devSelector, query)`
* `Connector#getDevicesMessages(devSelector, query)`
* `Connector#http.devices.messages.get(devSelector, query)`
* `Connector#getDevicesSettings(devSelector, settSelector, query)`
* `Connector#http.devices.settings.get(devSelector, settSelector, query)`
* `Connector#postDevices(query, body)`
* `Connector#http.devices.post(query, body)`
* `Connector#postDevicesMessages(devSelector, body)`
* `Connector#http.devices.messages.post(devSelector, body)`
* `Connector#postDevicesSettings(devSelector, settSelector, query, body)`
* `Connector#http.devices.settings.post(devSelector, settSelector, query, body)`
* `Connector#putDevices(devSelector, query, body)`
* `Connector#http.devices.put(devSelector, query, body)`
* `Connector#putDevicesSettings(devSelector, settSelector, query, body)`
* `Connector#http.devices.settings.put(devSelector, settSelector, query, body)`
* `Connector#deleteDevices(devSelector)`
* `Connector#http.devices.delete(devSelector)`
* `Connector#deleteDevicesMessages(devSelector, query)`
* `Connector#http.devices.messages.delete(devSelector, query)`
* `Connector#deleteDevicesSettings(devSelector, settSelector, query)`
* `Connector#http.device.settings.delete(devSelector, settSelector, query)`

* `Connector#getStreams(streamSelector, query)`
* `Connector#http.streams.get(streamSelector, query)`
* `Connector#getStreamsLogs(streamSelector, query)`
* `Connector#http.streams.logs.get(streamSelector, query)`
* `Connector#getStreamsSubscriptions(streamSelector, subscriptionSelector, query)`
* `Connector#http.streams.subscriptions.get(streamSelector, subscriptionSelector, query)`
* `Connector#postStreams(query, body)`
* `Connector#http.streams.post(query, body)`
* `Connector#postStreamsSubscriptions(streamSelector, query, body)`
* `Connector#http.streams.subscriptions.post(streamSelector, query, body)`
* `Connector#putStreams(streamSelector, query, body)`
* `Connector#http.streams.put(streamSelector, query, body)`
* `Connector#putStreamsSubscriptions(streamSelector, subscriptionSelector, query, body)`    
* `Connector#http.streams.subscriptions.put(streamSelector, subscriptionSelector, query, body)` 
* `Connector#deleteStreams(streamSelector)`
* `Connector#http.streams.delete(streamSelector)`
* `Connector#deleteStreamsSubscriptions(streamSelector, subscriptionSelector)`
* `Connector#http.streams.subscriptions.delete(streamSelector, subscriptionSelector)`

### MQTT Broker API

* `Connector#getMqttLogs(query)`
* `Connector#http.mqtt.logs.get(query)`
* `Connector#getMqttSessions(sessionSelector, query)`
* `Connector#http.mqtt.sessions.get(sessionSelector, query)`
* `Connector#getMqttSessionsLogs(sessionSelector, query)`
* `Connector#http.mqtt.sessions.logs.get(sessionSelector, query)`
* `Connector#getMqttSessionsSubscriptions(sessionSelector, subscriptionSelector, query)`
* `Connector#http.mqtt.sessions.subscriptions.get(sessionSelector, subscriptionSelector, query)`
* `Connector#postMqttSessions(body)`
* `Connector#http.mqtt.sessions.post(body)`
* `Connector#postMqttSessionsSubscriptions(sessionSelector, query, body)`
* `Connector#http.mqtt.sessions.subscriptions.post(sessionSelector, query, body)`
* `Connector#putMqttSessionsSubscriptions(sessionSelector, subscriptionSelector, query, body)`
* `Connector#http.mqtt.sessions.subscriptions.put(sessionSelector, subscriptionSelector, query, body)`
* `Connector#deleteMqttSessions(sessionSelector)`
* `Connector#http.mqtt.sessions.delete(sessionSelector)`
* `Connector#deleteMqttSessionsSubscriptions(sessionSelector, subscriptionSelector)`
* `Connector#http.mqtt.sessions.subscriptions.delete(sessionSelector, subscriptionSelector)`

### MQTT
Method for making mqtt subscriptions. It`s using  mqtt.js as dependency.
#### MQTT methods
* `Connector#subscribe(topic/topics array)`: subscribe to new topic(s). Return promise with resolved index of subscription.
    * `topic/topics array` is the topic or topics to need subscribe
    
        ```js
            topic = { name: 'a/b/c', handler: (message) => { console.log(message) } }
        ```
        
    ```js
      connector.mqtt.subscribe({name: 'custom/info', handler: (data) => { console.log(`subscribed: ${data}`) }})
    ```
    
* `Connector#unsubscribe(topicName, [index])`: unsubscribe from topic. Return promise.
    * `topicName`: is the topic name
    * `index`: index of current subscription by topic
    
    ```js
       connector.mqtt.unsubscribe('custom/logs')
    ```
    
* `Connector#unsubscribeAll()`: unsubscribe from all topics

    ```js
       connector.mqtt.unsubscribeAll()
    ```    
    
* `Connector#publish(topic, message, [options])`: publish a message to a topic. Return promise.
    * `topic` is the topic to publish to, `String`
    * `message` is the message to publish, `Buffer` or `String`
    * `options` are the options to publish with, including:
      * `qos` QoS level, `Number`, default `0`
      * `retain` retain flag, `Boolean`, default `false`
      * `dup` mark as duplicate flag, `Boolean`, default `false`
      
    ```js
      connector.mqtt.publish('custom/info', JSON.stringify({name: 'device#269'}))
    ```
    
* `Connector#on(event, handler)`: subscribe connector to event
    * `event` is the event type to subscribe
    * `handler` is the handler for current event type to subscribe
    
    ```js
      Vue.connector.mqtt.on('connect', () => { console.log('Working!') })
    ```
    
* `Connector#off(event, [handler])`: unsubscribe connector from event
    * `event` is the event type to unsubscribe
    * `handler` is the handler for current event type need to unsubscribe
    
    ```js
        Vue.connector.mqtt.off('connect', () => { console.log('Working!') })
    ```
Methods to easily subscribe and unsubscribe via Flespi MQTT Broker.
Param handler is a function to process new messages from mqtt. Example:
```js
(messages) => { console.log(messages) }
``` 
Other params described at [Flespi MQTT Topics](https://flespi.com/mqtt-api)
    
* `Connector#subscribeLogs(api, origin, event_type, handler)`
* `Connector#mqtt.logs.subscribe(api, origin, event_type, handler)`
* `Connector#unsubscribeLogs(api, origin, event_type, handler)`
* `Connector#mqtt.logs.unsubscribe(api, origin, event_type, handler)`

* `Connector#subscribeMessagesAbques(abque_id, name, handler)`
* `Connector#mqtt.messages.abques.subscribe(abque_id, name, handler)`
* `Connector#unsubscribeMessagesAbques(abque_id, name, handler)`
* `Connector#mqtt.messages.abques.unsubscribe(abque_id, name, handler)`

* `Connector#subscribeMessagesChannels(channel_id, ident, handler)`
* `Connector#mqtt.messages.channels.subscribe(channel_id, ident, handler)`
* `Connector#unsubscribeMessagesChannels(channel_id, ident, handler)`
* `Connector#mqtt.messages.channels.unsubscribe(channel_id, ident, handler)`

* `Connector#subscribeMessagesContainers(container_id, name, handler`
* `Connector#mqtt.messages.containers.subscribe(container_id, name, handler)`
* `Connector#unsubscribeMessagesContainers(container_id, name, handler)`
* `Connector#mqtt.messages.containers.unsubscribe(container_id, name, handler)`

* `Connector#subscribeMessagesDevices(device_id, handler)`
* `Connector#mqtt.messages.devices.subscribe(device_id, handler)`
* `Connector#unsubscribeMessagesDevices(device_id, handler)`
* `Connector#mqtt.messages.devices.unsubscribe(device_id, handler)`

* `Connector#subscribeSms(modem_id, phone, handler)`
* `Connector#mqtt.sms.subscribe(modem_id, phone, handler)`
* `Connector#unsubscribeSms(modem_id, phone, handler)`
* `Connector#mqtt.sms.unsubscribe(modem_id, phone, handler)`
    
#### MQTT events

Event `connect`: Emitted on successful (re)connection

```js
    
  function handler() {}
        
```
    
Event `error`: Emitted when the client cannot connect

```js
    
  function handler(error) {}
  // error_example = {message: 'connection refused, identifier rejected', code: 2}
        
```
    
    * `code: 2`: connection refused, identifier rejected
    * `code: 3`: connection refused, server unavailable
    * `code: 5`: connection refused, not authorized
    
Event `close`: Emitted after disconnect 
    `function () {}`

### Examples of use as main, module, and vue-plugin
Use as main or module build:

```js
import Connection from 'flespi-io-js'
/*create connector with config*/
let connector = new Connection({
  token: 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  httpConfig: { server: 'https://flespi.io' },
  mqttConfig: { server: `ws://mqtt.flespi.io` }
})
/*create connection via mqtt with subscriptions to some topics*/
connector.mqtt([
  {name: 'flespi/logs', handler: (data) => { console.log(data) }},
  {name: 'flespi/message/registry/devices/269/+', handler: (data) => { console.log(data) }}
])
/* create request via http */
connector.http({url: '/platform/customer'})
  .then(resp => console.log(resp))
```

Use as Vue plugin:
* Register:

```js
import Connection from 'flespi-io-js/dist/vue-plugin'
/* Register plugin with config for creation of connector */
Vue.use(ConnectionPlugin, {
  token: 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx',
  httpConfig: { server: 'https://localhost', port: 9005 },
  mqttConfig: { server: `ws://localhost:9016` }
})
```

* In code:

```js
/* Subscribe to event */
Vue.connector.mqtt.on('connect', () => { console.log('Working!!!!') })
/* Subscribe to topics */
Vue.connector.mqtt([
  {name: '#', handler: (data) => { console.log(data.toString()) }},
  {name: 'flespi/logs', handler: (data) => { console.log(data) }},
  {name: 'flespi/message/registry/devices/269/+', handler: (data) => { console.log(data) }}
])
/* Make HTTP request */
Vue.connector.http({url: '/platform/customer'})
  .then(resp => console.log(resp))
```

* In components:

```js
/* Subscribe to event */
this.$connector.mqtt.on('connect', () => { console.log('Working!!!!') })
/* Subscribe to topics */
this.$connector.mqtt([
  {name: '#', handler: (data) => { console.log(data.toString()) }},
  {name: 'flespi/logs', handler: (data) => { console.log(data) }},
  {name: 'flespi/message/registry/devices/269/+', handler: (data) => { console.log(data) }}
])
/* Make HTTP request */
this.$connector.http({url: '/platform/customer'})
  .then(resp => console.log(resp))
```

## License
[MIT](https://github.com/flespi-software/flespi-io-js/blob/master/LICENSE) license.

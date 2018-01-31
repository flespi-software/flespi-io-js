### MQTT
Method for making mqtt subscriptions. It`s using  mqtt.js as dependency.
#### MQTT methods
* `subscribe(topic/topics array)`: subscribe to new topic(s). Return promise with resolved index of subscription.
    * `topic/topics array` is the topic or topics to need subscribe
    
        ```js
            topic = { name: 'a/b/c', handler: (message) => { console.log(message) } }
        ```
        
    ```js
      connector.mqtt.subscribe({name: 'custom/info', handler: (data) => { console.log(`subscribed: ${data}`) }})
    ```
    
* `unsubscribe(topicName, [index])`: unsubscribe from topic. Return promise.
    * `topicName`: is the topic name
    * `index`: index of current subscription by topic
    
    ```js
       connector.mqtt.unsubscribe('custom/logs')
    ```
    
* `unsubscribeAll()`: unsubscribe from all topics

    ```js
       connector.mqtt.unsubscribeAll()
    ```    
    
* `publish(topic, message, [options])`: publish a message to a topic. Return promise.
    * `topic` is the topic to publish to, `String`
    * `message` is the message to publish, `Buffer` or `String`
    * `options` are the options to publish with, including:
      * `qos` QoS level, `Number`, default `0`
      * `retain` retain flag, `Boolean`, default `false`
      * `dup` mark as duplicate flag, `Boolean`, default `false`
      
    ```js
      connector.mqtt.publish('custom/info', JSON.stringify({name: 'device#269'}))
    ```
    
* `on(event, handler)`: subscribe connector to event
    * `event` is the event type to subscribe
    * `handler` is the handler for current event type to subscribe
    
    ```js
      Vue.connector.mqtt.on('connect', () => { console.log('Working!') })
    ```
    
* `off(event, [handler])`: unsubscribe connector from event
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
  
### Example of use

```js
connector.mqtt.logs.subscribe(api, origin, event_type, handler)
// or
connector.subscribeLogs(api, origin, event_type, handler)
```
  
| Method  | Alias  | Params  | Description  |
|---|---|---|---| 
| mqtt.logs.subscribe | subscribeLogs | api, origin, event_type, handler | Subscribe to logs. {event_type} has occurred in {origin}, see platform logs for more information |
| mqtt.logs.unsubscribe | unsubscribeLogs | api, origin, event_type, handler | Unsubscribe from logs. {event_type} has occurred in {origin}, see platform logs for more information |
| mqtt.messages.abques.subscribe | subscribeMessagesAbques | abque_id, name, handler | Subscribe to new message posted to abque |
| mqtt.messages.abques.unsubscribe | unsubscribeMessagesAbques | abque_id, name, handler | Unsubscribe from new message posted to abque |
| mqtt.messages.channels.subscribe | subscribeMessagesChannels | channel_id, ident, handler | Subscribe to new message received by channel |
| mqtt.messages.channels.unsubscribe | unsubscribeMessagesChannels | channel_id, ident, handler | Unsubscribe from new message received by channel |
| mqtt.messages.containers.subscribe | subscribeMessagesContainers | container_id, name, handler | Subscribe to new message posted to container |
| mqtt.messages.containers.unsubscribe | unsubscribeMessagesContainers | container_id, name, handler | Unsubscribe from new message posted to container |
| mqtt.messages.devices.subscribe | subscribeMessagesDevices | device_id, handler | Subscribe to new message received by device |
| mqtt.messages.devices.unsubscribe | unsubscribeMessagesDevices | device_id, handler | Unsubscribe from new message received by device |
| mqtt.sms.subscribe | subscribeSms | modem_id, phone, handler | Subscribe to SMS message received by modem |
| mqtt.sms.unsubscribe | unsubscribeSms | modem_id, phone, handler | Unsubscribe from SMS message received by modem |
    
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

### MQTT
Method for making mqtt subscriptions. It`s using  mqtt.js as dependency.
#### MQTT methods
* `subscribe(topic/topics array)`: subscribe to new topic(s). Return promise with resolved object of subscription.
    * `topic/topics array` is the topic or topics to need subscribe

        ```js
            topic = { name: 'a/b/c', options: {qos: 2}, handler: (message, topic) => { console.log(message) } }
        ```

    ```js
      connector.socket.subscribe({name: 'custom/info', handler: (data, topic) => { console.log(`subscribed: ${data}`) }})
            .then(function (grants) { console.log(grants) }).catch(function(e) { console.log(e) })
    ```

    grants structure:
    ```js
      {[id of subscription]: [grants by subscription]}
   ```

* `unsubscribe(topicName, [index/indexes])`: unsubscribe from topic (remove hanlers by it ids). Return promise.
    * `topicName`: is the topic name
    * `index`: index or array of indexes of current subscription by topic

    ```js
       connector.socket.unsubscribe('custom/logs')
    ```

* `unsubscribeAll()`: unsubscribe from all topics

    ```js
       connector.socket.unsubscribeAll()
    ```

* `publish(topic, message, [options])`: publish a message to a topic. Return promise.
    * `topic` is the topic to publish to, `String`
    * `message` is the message to publish, `Buffer` or `String`
    * `options` are the options to publish with, including:
      * `qos` QoS level, `Number`, default `0`
      * `retain` retain flag, `Boolean`, default `false`
      * `dup` mark as duplicate flag, `Boolean`, default `false`

    ```js
      connector.socket.publish('custom/info', JSON.stringify({name: 'device#269'}))
    ```

 * `close([force])`: close connection
    * `force` is flag force closing of connection
     ```js
        connector.socket.close()
     ```

 * `connected()`: return status of connection
     ```js
        connector.socket.connected()
     ```

* `on(event, handler)`: subscribe connector to event
    * `event` is the event type to subscribe
    * `handler` is the handler for current event type to subscribe

    ```js
      Vue.connector.socket.on('connect', () => { console.log('Working!') })
    ```

* `off(event, [handler])`: unsubscribe connector from event
    * `event` is the event type to unsubscribe
    * `handler` is the handler for current event type need to unsubscribe

    ```js
        Vue.connector.socket.off('connect', () => { console.log('Working!') })
    ```
Methods to easily subscribe and unsubscribe via Flespi MQTT Broker.
Param handler is a function to process new messages from mqtt. Example:
```js
(messages) => { console.log(messages) }
```
Other params described at [Flespi MQTT Topics](https://flespi.com/mqtt-api)

### Example of use

```js
connector.socket.logs.subscribe(api, origin, event_type, handler)
// or
connector.subscribeLogs(api, origin, event_type, handler)
```
 Return promise with resolved index of subscription.

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| socket.logs.subscribe | subscribeLogs | api, origin, event_type, handler, options | Subscribe to logs. {event_type} has occurred in {origin}, see platform logs for more information |
| socket.logs.unsubscribe | unsubscribeLogs | api, origin, event_type, [indexOfSubscription] | Unsubscribe from logs. {event_type} has occurred in {origin}, see platform logs for more information |
| socket.messages.abques.subscribe | subscribeMessagesAbques | abque_id, name, handler, [options] | Subscribe to new message posted to abque |
| socket.messages.abques.unsubscribe | unsubscribeMessagesAbques | abque_id, name, [indexOfSubscription] | Unsubscribe from new message posted to abque |
| socket.messages.channels.subscribe | subscribeMessagesChannels | channel_id, ident, handler, [options] | Subscribe to new message received by channel |
| socket.messages.channels.unsubscribe | unsubscribeMessagesChannels | channel_id, ident, [indexOfSubscription] | Unsubscribe from new message received by channel |
| socket.messages.devices.subscribe | subscribeMessagesDevices | device_id, handler, [options] | Subscribe to new message received by device |
| socket.messages.devices.unsubscribe | unsubscribeMessagesDevices | device_id, [indexOfSubscription] | Unsubscribe from new message received by device |
| socket.messages.sms.subscribe | subscribeSms | modem_id, phone, handler, [options] | Subscribe to SMS message received by modem |
| socket.messages.sms.unsubscribe | unsubscribeSms | modem_id, phone, [indexOfSubscription] | Unsubscribe from SMS message received by modem |

#### MQTT events

Event `connect`: Emitted on successful (re)connection. In handler provided connack packet.

```js

  function handler(connack) {}

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

Event `reconnect`: Emitted after reconnect start
    `function () {}`

Event `offline`: Emitted when the client goes offline
    `function () {}`

Event `end`: Emitted when the client goes end
    `function () {}`
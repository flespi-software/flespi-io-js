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
    * options structure:
        * `filterByTimestamp` flespi MQTT 5.0 feature that filters messages by user properties timestamp provided by flespi `boolean`
        * `qos` qos subscription level, default 0
        * `nl` No Local MQTT 5.0 flag (If the value is true, Application Messages MUST NOT be forwarded to a connection with a ClientID equal to the ClientID of the publishing connection)
        * `rap` Retain as Published MQTT 5.0 flag (If true, Application Messages forwarded using this subscription keep the RETAIN flag they were published with. If false, Application Messages forwarded using this subscription have the RETAIN flag set to 0.)
        * `rh` Retain Handling MQTT 5.0 (This option specifies whether retained messages are sent when the subscription is established.)
        * `properties`: `object`
            * `subscriptionIdentifier`:  representing the identifier of the subscription `number`,
            * `userProperties`: The User Property is allowed to appear multiple times to represent multiple name, value pairs `object`

    grants structure:
    ```js
      {[id of subscription]: [grants by subscription]}
   ```

* `unsubscribe(topicName, index/indexes, options)`: unsubscribe from topic (remove hanlers by it ids). Return promise.
    * `topicName`: is the topic name
    * `index`: index or array of indexes of current subscription by topic
    * `options`: options of unsubscribe.
        * `properties`: `object`
            * `userProperties`: The User Property is allowed to appear multiple times to represent multiple name, value pairs `object`
    ```js
       connector.socket.unsubscribe('custom/logs')
       connector.socket.unsubscribe('custom/logs', 1)
       connector.socket.unsubscribe('custom/logs', [1, 2, 3])
       connector.socket.unsubscribe('custom/logs', undefined, {properties})
    ```

* `unsubscribeAll([options])`: unsubscribe from all topics
    * `options`: options of unsubscribe.
        * `properties`: `object`
            * `userProperties`: The User Property is allowed to appear multiple times to represent multiple name, value pairs `object`

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
      * `properties`: MQTT 5.0 properties `object`
        * `payloadFormatIndicator`: Payload is UTF-8 Encoded Character Data or not `boolean`,
        * `messageExpiryInterval`: the lifetime of the Application Message in seconds `number`,
        * `topicAlias`: value that is used to identify the Topic instead of using the Topic Name `number`,
        * `responseTopic`: String which is used as the Topic Name for a response message `string`,
        * `correlationData`: used by the sender of the Request Message to identify which request the Response Message is for when it is received `binary`,
        * `userProperties`: The User Property is allowed to appear multiple times to represent multiple name, value pairs `object`,
        * `subscriptionIdentifier`: representing the identifier of the subscription `number`,
        * `contentType`: String describing the content of the Application Message `string`

    ```js
      connector.socket.publish('custom/info', JSON.stringify({name: 'device#269'}))
    ```

 * `close([force], [options])`: close connection
    * `force` is flag force closing of connection
    * `options`: options of disconnect.
        * `reasonCode`: Disconnect Reason Code `number`
        * `properties`: `object`
            * `sessionExpiryInterval`: representing the Session Expiry Interval in seconds `number`,
            * `reasonString`: representing the reason for the disconnect `string`,
            * `userProperties`: The User Property is allowed to appear multiple times to represent multiple name, value pairs `object`,
            * `serverReference`: String which can be used by the Client to identify another Server to use `string`
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
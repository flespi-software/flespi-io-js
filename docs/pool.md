### Pool methods

> Methods for getting and updating entities from flespi

Params:
* `getHandler`: Function for handling initial data
* `updateHandler`: Function for handling create/update/delete data

They are returns array of ids by MQTT subscriptions needed for update array of entities

### Example of use

```js
let ids = await connector.pool.devices((data) => { console.log(`data: ${JSON.stringify(data.data.result)}`) }, (type, data) => { console.log(`mqtt ${type}: ${JSON.stringify(data)}`) })
// or
let ids = await connector.poolDevices((data) => { console.log(`data: ${JSON.stringify(data.data.result)}`) }, (type, data) => { console.log(`mqtt ${type}: ${JSON.stringify(data)}`) })
```

| Method  | Alias  | Params| Description  |
|---|---|---|---|
|pool.devices|poolDevices| getHandler, updateHandler |Polling devices|
|pool.devices.stop|poolDevicesStop| ids |Stop polling devices|
|pool.streams|poolStreams|getHandler, updateHandler|Pooling streams|
|pool.streams.stop|poolStreamsStop|ids|Stop pooling streams|
|pool.streams.subscriptions|poolStreamsSubscriptions|getHandler, updateHandler|Pooling streams subscriptions|
|pool.streams.subscriptions.stop|poolSubscriptionsStop|ids|Stop pooling streams subscriptions|
|pool.channels|poolChannels|getHandler, updateHandler|Pooling channels|
|pool.channels.stop|poolChannelsStop|ids|Stop pooling channels|
|pool.abques|poolAbques|getHandler, updateHandler|Pooling abques|
|pool.abques.stop|poolAbquesStop|ids|Stop pooling abques|
|pool.containers|poolContainers|getHandler, updateHandler|Pooling containers|
|pool.containers.stop|poolContainersStop|ids|Stop pooling containers|
|pool.cdns|poolCdns|getHandler, updateHandler|Pooling cdns|
|pool.cdns.stop|poolCdnsStop|ids|Stop pooling cdns|
|pool.modems|poolModems|getHandler, updateHandler|Pooling modems|
|pool.modems.stop|poolModemsStop|ids|Stop pooling modems|
|pool.customer.tokens|poolCustomerTokens|getHandler, updateHandler|Pooling customer tokens|
|pool.customer.tokens.stop|poolCustomerTokensStop|ids|Stop pooling customer tokens|
|pool.mqtt.sessions|poolMqttSessions|getHandler, updateHandler|Pooling MQTT sessions|
|pool.mqtt.sessions.stop|poolMqttSessionsStop|ids|Stop pooling MQTT sessions|
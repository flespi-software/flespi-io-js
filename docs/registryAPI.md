### Registry API


Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string 
* `body`: Params in plain object for request body 

### Example of use

```js
connector.http.registry.devices.get(devSelector, query)
// or
connector.registry.getDevices(devSelector, query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.registry.devices.get | registry.getDevices | devSelector, query | Get collection of devices matching filter parameters. Use special keyword "all" to retreieve all devices. |
| http.registry.devices.logs.get | registry.getDevicesLogs | devSelector, query | Get logs for specified device. The request without parameters will return all logs records. |
| http.registry.devices.messages.get | registry.getDevicesMessages | devSelector, query | Get specified device messages |
| http.registry.devices.settings.get | registry.getDevicesSettings | devSelector, settSelector, query | Get collection of settings matching filter parameters. |
| http.registry.devices.post | registry.postDevices | query, body | Create new device. |
| http.registry.devices.messages.post | registry.postDevicesMessages | devSelector, body | Post new messages into specified device and associated streams. |
| http.registry.devices.settings.post | registry.postDevicesSettings | devSelector, settSelector, query, body | |
| http.registry.devices.put | registry.putDevices | devSelector, query, body | Change properties of existing devices matching filter parameters. |
| http.registry.devices.settings.put | registry.putDevicesSettings | devSelector, settSelector, query, body | Set new setting value by pushing setting set command to device commands queue. |
| http.registry.devices.delete | registry.deleteDevices | devSelector | Delete all devices matching filtering parameters |
| http.registry.devices.messages.delete | registry.deleteDevicesMessages | devSelector, query | Delete specified messages from the device container. |
| http.registry.device.settings.delete | registry.deleteDevicesSettings | devSelector, settSelector, query | Reset setting value or cancel pending operations |
| http.registry.streams.get | registry.getStreams | streamSelector, query | Get collection of streams matching filter parameters |
| http.registry.streams.logs.get | registry.getStreamsLogs | streamSelector, query | Get logs for specified stream. |
| http.registry.streams.subscriptions.get | registry.getStreamsSubscriptions | streamSelector, subscriptionSelector, query | Get collection of subscriptions matching filter parameters. |
| http.registry.streams.post | registry.postStreams | query, body | Create new stream that is capable for transferring devices and channel messages to external platforms. |
| http.registry.streams.subscriptions.post | registry.postStreamsSubscriptions | streamSelector, query, body | There are two available messages sources for now - channel and device. |
| http.registry.streams.put | registry.putStreams | streamSelector, query, body | Change properties of existing streams matching filter parameters. |
| http.registry.streams.subscriptions.put | registry.putStreamsSubscriptions | streamSelector, subscriptionSelector, query, body | Change properties of existing stream subscriptions matching filter parameters. | 
| http.registry.streams.delete | registry.deleteStreams | streamSelector | Delete all streams matching filtering parameters |
| http.registry.streams.subscriptions.delete | registry.deleteStreamsSubscriptions | streamSelector, subscriptionSelector | Delete all subscriptions matching filtering parameters. |
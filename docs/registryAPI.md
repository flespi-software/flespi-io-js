### Registry API


Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string 
* `body`: Params in plain object for request body 

### Example of use

```js
connector.http.devices.get(devSelector, query)
// or
connector.getDevices(devSelector, query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.devices.get | getDevices | devSelector, query | Get collection of devices matching filter parameters. Use special keyword "all" to retreieve all devices. |
| http.devices.logs.get | getDevicesLogs | devSelector, query | Get logs for specified device. The request without parameters will return all logs records. |
| http.devices.messages.get | getDevicesMessages | devSelector, query | Get specified device messages |
| http.devices.settings.get | getDevicesSettings | devSelector, settSelector, query | Get collection of settings matching filter parameters. |
| http.devices.post | postDevices | query, body | Create new device. |
| http.devices.messages.post | postDevicesMessages | devSelector, body | Post new messages into specified device and associated streams. |
| http.devices.settings.post | postDevicesSettings | devSelector, settSelector, query, body | |
| http.devices.put | putDevices | devSelector, query, body | Change properties of existing devices matching filter parameters. |
| http.devices.settings.put | putDevicesSettings | devSelector, settSelector, query, body | Set new setting value by pushing setting set command to device commands queue. |
| http.devices.delete | deleteDevices | devSelector | Delete all devices matching filtering parameters |
| http.devices.messages.delete | deleteDevicesMessages | devSelector, query | Delete specified messages from the device container. |
| http.device.settings.delete | deleteDevicesSettings | devSelector, settSelector, query | Reset setting value or cancel pending operations |
| http.streams.get | getStreams | streamSelector, query | Get collection of streams matching filter parameters |
| http.streams.logs.get | getStreamsLogs | streamSelector, query | Get logs for specified stream. |
| http.streams.subscriptions.get | getStreamsSubscriptions | streamSelector, subscriptionSelector, query | Get collection of subscriptions matching filter parameters. |
| http.streams.post | postStreams | query, body | Create new stream that is capable for transferring devices and channel messages to external platforms. |
| http.streams.subscriptions.post | postStreamsSubscriptions | streamSelector, query, body | There are two available messages sources for now - channel and device. |
| http.streams.put | putStreams | streamSelector, query, body | Change properties of existing streams matching filter parameters. |
| http.streams.subscriptions.put | putStreamsSubscriptions | streamSelector, subscriptionSelector, query, body | Change properties of existing stream subscriptions matching filter parameters. | 
| http.streams.delete | deleteStreams | streamSelector | Delete all streams matching filtering parameters |
| http.streams.subscriptions.delete | deleteStreamsSubscriptions | streamSelector, subscriptionSelector | Delete all subscriptions matching filtering parameters. |
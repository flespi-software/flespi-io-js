### Gateway API


Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string
* `body`: Params in plain object for request body

### Example of use

```js
connector.http.gw.protocols.get(protocolSelector, query)
// or
connector.gw.getProtocols(protocolSelector, query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.gw.channelProtocols.get | gw.getChannelProtocols | protocolSelector, query | Get collection of protocols matching filtering parameters. Use special keyword "all" to retreieve all protocols.|
| http.gw.channelProtocols.commands.get | gw.getChannelProtocolsCommands | protocolSelector, protocolCmdsSelector, query |Get commands collection supported by selected protocol. |
| http.gw.channelProtocols.deviceTypes.get | gw.getChannelProtocolsDeviceTypes | protocolSelector, deviceTypeSelector, query |Get device types collection supported by selected protocol. |
| http.gw.channels.get | gw.getChannels | channelSelector, query | Get collection of channels matching filter parameters. Use special keyword "all" to retreieve all channels.|
| http.gw.channels.commandsQueue.get | gw.getChannelsCommandsQueue | channelSelector, commandsQueueSelector, query | Get commands waiting to be sent meeting filtering conditions.|
| http.gw.channels.commandsResult.get | gw.getChannelsCommandsResult | channelSelector, commandsResultSelector, query |Get executed or expired commands from specified channels. |
| http.gw.channels.connections.get | gw.getChannelsConnections | channelSelector, connectionSelector, query | List active TCP connections matching filtering parameters to selected channels.|
| http.gw.channels.logs.get | gw.getChannelsLogs | channelSelector, query |Get logs for specified channels. The request without parameters will return all logs records. |
| http.gw.channels.messages.get | gw.getChannelsMessages | channelSelector, query | Get new messages from specified channels.|
| http.gw.channels.post | gw.postChannels | query, body | Create new channel listening for messages from tracking devices, working on specified protocol.|
| http.gw.channels.commandsQueue.post | gw.postChannelsCommandsQueue | channelSelector, query, body | Add command to commands queue. |
| http.gw.channels.put | gw.putChannels | channelSelector, query, body | Change properties of existing channels matching filter parameters.|
| http.gw.channels.delete | gw.deleteChannels | channelSelector |Remove all existing channels matching filtering parameters. |
| http.gw.channels.commandsQueue.delete | gw.deleteChannelsCommandsQueue | channelSelector, commandsQueueSelector |Delete commands meeting filtering conditions for specified channels. |
| http.gw.channels.commandsResult.delete | gw.deleteChannelsCommandsResult | channelSelector, commandsResultSelector, body |Remove finished commands until gw.delete_key parameter |
| http.gw.channels.connections.delete | gw.deleteChannelsConnections | channelSelector, connectionSelector | Close selected TCP connections to selected channels.|
| http.gw.channels.messages.delete | gw.deleteChannelsMessages | channelSelector, body | Remove unnecessary messages|
| http.gw.modems.get | gw.getModems | modemSelector, query | Get specified modems info.|
| http.gw.modems.logs.get | gw.getModemsLogs | modemSelector, query | Get logs for specified modem. The request without parameters will return all logs records. |
| http.gw.modems.post | gw.postModems | query, body |Create modem and establish SMPP connection. |
| http.gw.modems.put | gw.putModems | modemSelector, query, body |Change parameters of selected modem. |
| http.gw.modems.delete | gw.deleteModems | modemSelector | Delete selected modems.|
| http.gw.messageParameters.get | gw.getMessageParameters | messageParameterSelector | Get list of all available message parameters |
| http.gw.devices.get | gw.getDevices | devSelector, query | Get collection of devices matching filter parameters. Use special keyword "all" to retreieve all devices. |
| http.gw.devices.logs.get | gw.getDevicesLogs | devSelector, query | Get logs for specified device. The request without parameters will return all logs records. |
| http.gw.devices.messages.get | gw.getDevicesMessages | devSelector, query | Get specified device messages |
| http.gw.devices.settings.get | gw.getDevicesSettings | devSelector, settSelector, query | Get collection of settings matching filter parameters. |
| http.gw.devices.post | gw.postDevices | query, body | Create new device. |
| http.gw.devices.messages.post | gw.postDevicesMessages | devSelector, body | Post new messages into specified device and associated streams. |
| http.gw.devices.settings.post | gw.postDevicesSettings | devSelector, settSelector, query, body | |
| http.gw.devices.put | gw.putDevices | devSelector, query, body | Change properties of existing devices matching filter parameters. |
| http.gw.devices.settings.put | gw.putDevicesSettings | devSelector, settSelector, query, body | Set new setting value by pushing setting set command to device commands queue. |
| http.gw.devices.delete | gw.deleteDevices | devSelector | Delete all devices matching filtering parameters |
| http.gw.devices.messages.delete | gw.deleteDevicesMessages | devSelector, query | Delete specified messages from the device container. |
| http.gw.devices.settings.delete | gw.deleteDevicesSettings | devSelector, settSelector, query | Reset setting value or cancel pending operations |
| http.gw.devices.telemetry.get | gw.getDevicesTelemetry | devSelector | Get specified device telemetry - e.g. latest values of parameters from registered messages. |
| http.gw.streams.get | gw.getStreams | streamSelector, query | Get collection of streams matching filter parameters |
| http.gw.streams.logs.get | gw.getStreamsLogs | streamSelector, query | Get logs for specified stream. |
| http.gw.streams.subscriptions.get | gw.getStreamsSubscriptions | streamSelector, subscriptionSelector, query | Get collection of subscriptions matching filter parameters. |
| http.gw.streams.post | gw.postStreams | query, body | Create new stream that is capable for transferring devices and channel messages to external platforms. |
| http.gw.streams.subscriptions.post | gw.postStreamsSubscriptions | streamSelector, query, body | There are two available messages sources for now - channel and device. |
| http.gw.streams.put | gw.putStreams | streamSelector, query, body | Change properties of existing streams matching filter parameters. |
| http.gw.streams.subscriptions.put | gw.putStreamsSubscriptions | streamSelector, subscriptionSelector, query, body | Change properties of existing stream subscriptions matching filter parameters. |
| http.gw.streams.delete | gw.deleteStreams | streamSelector | Delete all streams matching filtering parameters |
| http.gw.streams.subscriptions.delete | gw.deleteStreamsSubscriptions | streamSelector, subscriptionSelector | Delete all subscriptions matching filtering parameters. |
| http.gw.calcs.post | gw.postCalcs | query, body | Create new calculator. |
| http.gw.calcs.delete | gw.deleteCalcs | calcSelector | Delete calculators |
| http.gw.calcs.get | gw.getCalcs | calcSelector, query | Get specified calculators information.. |
| http.gw.calcs.put | gw.putCalcs | calcSelector, query, body | Modify calculator parameters. |
| http.gw.calcs.devices.post | gw.postCalcsDevices | calcSelector, query, body | Assign device to calculator. |
| http.gw.calcs.devices.delete | gw.deleteCalcsDevices | calcSelector, deviceSelector | Unassign device from calculator and remove its calculated intervals permanently. |
| http.gw.calcs.devices.get | gw.getCalcsDevices | calcSelector, deviceSelector, query | Fetch devices assigned to calculator. |
| http.gw.calcs.devices.put | gw.putCalcsDevices | calcSelector, deviceSelector, query, body | Modify device assigned to caluclator. |
| http.gw.calcs.devices.intervals.get | gw.getCalcsDevicesIntervals | calcSelector, deviceSelector, intervalSelector, query | Fetch calculated device intervals. |
| http.gw.calcs.devices.intervals.put | gw.putCalcsDevicesIntervals | calcSelector, deviceSelector, intervalSelector, body | Attach to automatically calculated device intervals custom parameters. |
| http.gw.calcs.logs.get | gw.getCalcsLogs | calcSelector, query | Get logs for specified calc. |
| http.gw.channels.idents.get | gw.getChannelsIdents | channelSelector, identSelector | Get list of idents that have stored traffic for given channel. |
| http.gw.channels.idents.packets.get | gw.getChannelsIdentsPackets | channelSelector, identSelector, query | Fetch raw traffic stored for specified ident in given channel. |
| http.gw.devices.packets.get | gw.getDevicesPackets | deviceSelector, query | Fetch raw traffic stored for specified device. |

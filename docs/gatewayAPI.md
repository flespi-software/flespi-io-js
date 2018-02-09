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
| http.gw.protocols.get | gw.getProtocols | protocolSelector, query | Get collection of protocols matching filtering parameters. Use special keyword "all" to retreieve all protocols.|
| http.gw.protocols.commands.get | gw.getProtocolsCommands | protocolSelector, protocolCmdsSelector, query |Get commands collection supported by selected protocol. |
| http.gw.protocols.deviceTypes.get | gw.getProtocolsDeviceTypes | protocolSelector, deviceTypeSelector, query |Get device types collection supported by selected protocol. |
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
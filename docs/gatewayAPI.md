### Gateway API


Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string 
* `body`: Params in plain object for request body 

### Example of use

```js
connector.http.protocols.get(protocolSelector, query)
// or
connector.getProtocols(protocolSelector, query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.protocols.get | getProtocols | protocolSelector, query | Get collection of protocols matching filtering parameters. Use special keyword "all" to retreieve all protocols.|
| http.protocols.commands.get | getProtocolsCommands | protocolSelector, protocolCmdsSelector, query |Get commands collection supported by selected protocol. |
| http.protocols.deviceTypes.get | getProtocolsDeviceTypes | protocolSelector, deviceTypeSelector, query |Get device types collection supported by selected protocol. |
| http.channels.get | getChannels | channelSelector, query | Get collection of channels matching filter parameters. Use special keyword "all" to retreieve all channels.|
| http.channels.commandsQueue.get | getChannelsCommandsQueue | channelSelector, commandsQueueSelector, query | Get commands waiting to be sent meeting filtering conditions.|
| http.channels.commandsResult.get | getChannelsCommandsResult | channelSelector, commandsResultSelector, query |Get executed or expired commands from specified channels. |
| http.channels.connections.get | getChannelsConnections | channelSelector, connectionSelector, query | List active TCP connections matching filtering parameters to selected channels.|
| http.channels.logs.get | getChannelsLogs | channelSelector, query |Get logs for specified channels. The request without parameters will return all logs records. |
| http.channels.messages.get | getChannelsMessages | channelSelector, query | Get new messages from specified channels.|
| http.channels.post | postChannels | query, body | Create new channel listening for messages from tracking devices, working on specified protocol.|
| http.channels.commandsQueue.post | postChannelsCommandsQueue | channelSelector, query, body | Add command to commands queue. |
| http.channels.put | putChannels | channelSelector, query, body | Change properties of existing channels matching filter parameters.|
| http.channels.delete | deleteChannels | channelSelector |Remove all existing channels matching filtering parameters. |
| http.channels.commandsQueue.delete | deleteChannelsCommandsQueue | channelSelector, commandsQueueSelector |Delete commands meeting filtering conditions for specified channels. |
| http.channels.commandsResult.delete | deleteChannelsCommandsResult | channelSelector, commandsResultSelector, body |Remove finished commands until delete_key parameter |
| http.channels.connections.delete | deleteChannelsConnections | channelSelector, connectionSelector | Close selected TCP connections to selected channels.|
| http.channels.messages.delete | deleteChannelsMessages | channelSelector, body | Remove unnecessary messages|
| http.modems.get | getModems | modemSelector, query | Get specified modems info.|
| http.modems.logs.get | getModemsLogs | modemSelector, query | Get logs for specified modem. The request without parameters will return all logs records. |
| http.modems.post | postModems | query, body |Create modem and establish SMPP connection. |
| http.modems.put | putModems | modemSelector, query, body |Change parameters of selected modem. |
| http.modems.delete | deleteModems | modemSelector | Delete selected modems.|
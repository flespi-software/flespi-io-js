### MQTT Broker API

Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string 
* `body`: Params in plain object for request body 

### Example of use

```js
connector.http.mqtt.logs.get(query)
// or
connector.getMqttLogs(query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.mqtt.logs.get | getMqttLogs | query | Get specified logs. |
| http.mqtt.sessions.get | getMqttSessions | sessionSelector, query | Fetch sessions list. |
| http.mqtt.sessions.logs.get | getMqttSessionsLogs | sessionSelector, query | Get logs for specified session.  |
| http.mqtt.sessions.subscriptions.get | getMqttSessionsSubscriptions | sessionSelector, subscriptionSelector, query | Fetch session subscriptions matching given selector. |
| http.mqtt.sessions.post | postMqttSessions | body | Create a new persistent session. |
| http.mqtt.sessions.subscriptions.post | postMqttSessionsSubscriptions | sessionSelector, query, body | Subscribe sessions matching given selector. |
| http.mqtt.sessions.subscriptions.put | putMqttSessionsSubscriptions | sessionSelector, subscriptionSelector, query, body | Update subscriptions matching given selector. |
| http.mqtt.sessions.delete | deleteMqttSessions | sessionSelector | Remove sessions matching given filter. |
| http.mqtt.sessions.subscriptions.delete | deleteMqttSessionsSubscriptions | sessionSelector, subscriptionSelector | Remove subscriptions matching given selector. |
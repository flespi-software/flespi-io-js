### MQTT Broker API

Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string
* `body`: Params in plain object for request body

### Example of use

```js
connector.http.mqtt.logs.get(query)
// or
connector.mqtt.getLogs(query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.mqtt.logs.get | mqtt.getLogs | query | Get specified logs. |
| http.mqtt.sessions.get | mqtt.getSessions | sessionSelector, query | Fetch sessions list. |
| http.mqtt.sessions.logs.get | mqtt.getSessionsLogs | sessionSelector, query | Get logs for specified session.  |
| http.mqtt.sessions.subscriptions.get | mqtt.getSessionsSubscriptions | sessionSelector, subscriptionSelector, query | Fetch session subscriptions matching given selector. |
| http.mqtt.sessions.post | mqtt.postSessions | body | Create a new persistent session. |
| http.mqtt.sessions.subscriptions.post | mqtt.postSessionsSubscriptions | sessionSelector, query, body | Subscribe sessions matching given selector. |
| http.mqtt.sessions.subscriptions.put | mqtt.putSessionsSubscriptions | sessionSelector, subscriptionSelector, query, body | Update subscriptions matching given selector. |
| http.mqtt.sessions.delete | mqtt.deleteSessions | sessionSelector | Remove sessions matching given filter. |
| http.mqtt.sessions.subscriptions.delete | mqtt.deleteSessionsSubscriptions | sessionSelector, subscriptionSelector | Remove subscriptions matching given selector. |

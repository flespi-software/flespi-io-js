### Storage API


Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string 
* `body`: Params in plain object for request body 

### Example of use

```js
connector.http.storage.abques.get(abqueSelector, query)
// or
connector.storage.getAbques(abqueSelector, query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.storage.abques.get | storage.getAbques | abqueSelector, query | Get collection of queues matching filter parameters. Use special keyword "all" to retreieve all queues. |
| http.storage.abques.logs.get | storage.getAbquesLogs | abqueSelector, query | Get logs for specified abque. The request without parameters will return all logs records. |
| http.storage.abques.messages.get | storage.getAbquesMessages | abqueSelector, query | Get new messages from specified queues. |
| http.storage.abques.post | storage.postAbques | query, body | Create new asynchronous batch queue for reliably posting JSON messages. |
| http.storage.abques.messages.post | storage.postAbquesMessages | abqueSelector, body | Post new messages into specified queues. |
| http.storage.abques.put | storage.putAbques | abqueSelector, query, body | Update all existing queues matching filtering parameters. |
| http.storage.abques.delete | storage.deleteAbques | abqueSelector | Remove all existing queues matching filtering parameters. |
| http.storage.abques.messages.delete | storage.deleteAbquesMessages | abqueSelector, body | This request is optional, normal method of work is to delete messages via GET  |
| http.storage.containers.get | storage.getContainers | containerSelector, query | Get collection of containers matching filter parameters. Use special keyword "all" to retreieve all containers. |
| http.storage.containers.logs.get | storage.getContainersLogs | containerSelector, query | Get logs for specified containers. The request without parameters will return all logs records. |
| http.storage.containers.messages.get | storage.getContainersMessages | containerSelector, query | Get specified messages from the container.  |
| http.storage.containers.post | storage.postContainers | query, body | Create new container for storing JSON messages identified by unique key. |
| http.storage.containers.messages.post | storage.postContainersMessages | containerSelector, body | Post new messages into specified containers. |
| http.storage.containers.put | storage.putContainers | containerSelector, body | Update all existing containers matching filtering parameters. |
| http.storage.containers.delete | storage.deleteContainers | containerSelector | Remove all existing containers matching filtering parameters. |
| http.storage.containers.messages.delete | storage.deleteContainersMessages | containerSelector, query | Delete specified messages from the container.  |
### Storage API


Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string 
* `body`: Params in plain object for request body 

### Example of use

```js
connector.http.abques.get(abqueSelector, query)
// or
connector.getAbques(abqueSelector, query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.abques.get | getAbques | abqueSelector, query | Get collection of queues matching filter parameters. Use special keyword "all" to retreieve all queues. |
| http.abques.logs.get | getAbquesLogs | abqueSelector, query | Get logs for specified abque. The request without parameters will return all logs records. |
| http.abques.messages.get | getAbquesMessages | abqueSelector, query | Get new messages from specified queues. |
| http.abques.post | postAbques | query, body | Create new asynchronous batch queue for reliably posting JSON messages. |
| http.abques.messages.post | postAbquesMessages | abqueSelector, body | Post new messages into specified queues. |
| http.abques.put | putAbques | abqueSelector, query, body | Update all existing queues matching filtering parameters. |
| http.abques.delete | deleteAbques | abqueSelector | Remove all existing queues matching filtering parameters. |
| http.abques.messages.delete | deleteAbquesMessages | abqueSelector, body | This request is optional, normal method of work is to delete messages via GET  |
| http.containers.get | getContainers | containerSelector, query | Get collection of containers matching filter parameters. Use special keyword "all" to retreieve all containers. |
| http.containers.logs.get | getContainersLogs | containerSelector, query | Get logs for specified containers. The request without parameters will return all logs records. |
| http.containers.messages.get | getContainersMessages | containerSelector, query | Get specified messages from the container.  |
| http.containers.post | postContainers | query, body | Create new container for storing JSON messages identified by unique key. |
| http.containers.messages.post | postContainersMessages | containerSelector, body | Post new messages into specified containers. |
| http.containers.put | putContainers | containerSelector, body | Update all existing containers matching filtering parameters. |
| http.containers.delete | deleteContainers | containerSelector | Remove all existing containers matching filtering parameters. |
| http.containers.messages.delete | deleteContainersMessages | containerSelector, query | Delete specified messages from the container.  |
### Platform API

> This REST API provides methods to manage your account data and authorization tokens.

Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string 
* `body`: Params in plain object for request body 

### Example of use

```js
connector.http.customer.get(query)
// or
connector.getCustomerAccounts(query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.customer.get  | getCustomer  |  query |  View your registration data: name, email, ACL and ID. |
|  http.customer.accounts.get | getCustomerAccounts  | accountSelector, query  | Get accounts through which it is possible to authorize customer on the platform.  |
|  http.customer.accounts.delete | deleteCustomerAccounts  | accountSelector  |  Detach selected accounts from flespi customer |
| http.customer.logs.get  | getCustomerLogs  | query  |  Get logs for whole platform. The request without parameters will return all logs records. |
|  http.customer.statistics.get | getCustomerStatistics  | query  |  Platform storing items statistics counters into special container available within this method. You may optionally filter them by "origin" or activate generalization algorithm to aggregate counters. |
| http.customer.tokens.get  | getCustomerTokens  |  tokenSelector, query | List existing tokens with specified fields.  |
|  http.customer.tokens.post | postCustomerTokens  | query, body  |  Create new token with defined lifetime and rights. Either 'expire' or 'ttl' should be specified for correct token expiration time detection. |
|  http.customer.tokens.delete |  deleteCustomerTokens | tokenSelector  |  Delete uneeded tokens with specified ID or matching filtering parameters. |
| http.customer.tokens.put  | putCustomerTokens  | tokenSelector, query, body  |  Modify some token properies. |

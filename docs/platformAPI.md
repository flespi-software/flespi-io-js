### Platform API

> This REST API provides methods to manage your account data and authorization tokens.

Params:
* `*Selector`: Selected entity
* `query`: Params in plain object for query string 
* `body`: Params in plain object for request body 

### Example of use

```js
connector.http.platform.customer.get(query)
// or
connector.platform.getCustomerAccounts(query)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.platform.customer.get  | platform.getCustomer  |  query |  View your registration data: name, email, ACL and ID. |
|  http.platform.customer.accounts.get | platform.getCustomerAccounts  | accountSelector, query  | Get accounts through which it is possible to authorize customer on the platform.  |
|  http.platform.customer.accounts.delete | platform.deleteCustomerAccounts  | accountSelector  |  Detach selected accounts from flespi customer |
| http.platform.customer.logs.get  | platform.getCustomerLogs  | query  |  Get logs for whole platform. The request without parameters will return all logs records. |
|  http.platform.customer.statistics.get | platform.getCustomerStatistics  | query  |  Platform storing items statistics counters into special container available within this method. You may optionally filter them by "origin" or activate generalization algorithm to aggregate counters. |
| http.platform.customer.tokens.get  | platform.getCustomerTokens  |  tokenSelector, query | List existing tokens with specified fields.  |
|  http.platform.customer.tokens.post | platform.postCustomerTokens  | query, body  |  Create new token with defined lifetime and rights. Either 'expire' or 'ttl' should be specified for correct token expiration time detection. |
|  http.platform.customer.tokens.delete |  platform.deleteCustomerTokens | tokenSelector  |  Delete uneeded tokens with specified ID or matching filtering parameters. |
| http.platform.customer.tokens.put  | platform.putCustomerTokens  | tokenSelector, query, body  |  Modify some token properies. |

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
|  http.platform.customer.oauth.get | platform.getCustomerOauth  | accountSelector, query  | Get OAuth profiles through which it is possible to authorize customer on the platform  |
|  http.platform.customer.oauth.delete | platform.deleteCustomerOauth  | accountSelector  |  Detach selected OAuth profiles from flespi customer |
| http.platform.customer.logs.get  | platform.getCustomerLogs  | query  |  Get logs for whole platform. The request without parameters will return all logs records. |
|  http.platform.customer.statistics.get | platform.getCustomerStatistics  | query  |  Platform storing items statistics counters into special container available within this method. You may optionally filter them by "origin" or activate generalization algorithm to aggregate counters. |
| http.platform.customer.tokens.get  | platform.getCustomerTokens  |  tokenSelector, query | List existing tokens with specified fields.  |
|  http.platform.customer.tokens.post | platform.postCustomerTokens  | query, body  |  Create new token with defined lifetime and rights. Either 'expire' or 'ttl' should be specified for correct token expiration time detection. |
|  http.platform.customer.tokens.delete |  platform.deleteCustomerTokens | tokenSelector  |  Delete uneeded tokens with specified ID or matching filtering parameters. |
| http.platform.customer.tokens.put  | platform.putCustomerTokens  | tokenSelector, query, body  |  Modify some token properies. |
| http.platform.limits.post  | platform.postLimits  | query, body  |  Define new limits. |
| http.platform.limits.delete  | platform.deleteLimits  | limitsSelector  |  Delete selected limit rules. |
| http.platform.limits.get  | platform.getLimits  | limitsSelector, query  |  Get exisiting limits. |
| http.platform.limits.put  | platform.putLimits  | limitsSelector, query, body  |  Update limits. |
| http.platform.subaccounts.post  | platform.postSubaccounts | query, body |  Create new subaccounts. |
| http.platform.subaccounts.delete  | platform.deleteSubaccounts | subaccountsSelector  |  Delete selected subaccounts. |
| http.platform.subaccounts.get  | platform.getSubaccounts | subaccountsSelector, query  |  Get subaccounts. |
| http.platform.subaccounts.put  | platform.putSubaccounts | subaccountsSelector, query, body  |  Update existing subaccounts. |
| http.platform.subaccounts.tokens.post  | platform.postSubaccountsTokens | subaccountsSelector, query, body |  Generate new tokens. |
| http.platform.subaccounts.tokens.delete  | platform.deleteSubaccountsTokens | subaccountsSelector, tokensSelector  |  Delete tokens. |
| http.platform.subaccounts.tokens.get  | platform.getSubaccountsTokens | subaccountsSelector, tokensSelector, query  |  Get subaccount's tokens. |
| http.platform.subaccounts.tokens.put  | platform.putSubaccountsTokens | subaccountsSelector, tokensSelector, query, body  |  Modify subaccounts tokens. |
| http.platform.subaccounts.logs.get  | platform.getSubaccountsLogs | subaccountsSelector, body  |  Get logs by subaccounts |

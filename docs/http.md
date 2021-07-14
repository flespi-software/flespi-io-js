### HTTP
Method for making http requests. It`s using axios as a dependency. So API of HTTP is the same as axios [HTTP API axios](https://github.com/axios/axios)
* `Connector#http.request(options)`: same options axios
* `Connector#http.get(url, [options])`,
* `Connector#http.delete(url, [options])`,
* `Connector#http.post(url, data, [options])`,
* `Connector#http.put(url,data, [options])`
    * `url` is the server URL that will be used for the request
    * `data` is the data to be sent as the request body
    * `options` are another options by axios API
* `Connector#http.external(options)`: to make requests to somewhere. Get full api of axios.

Methods for easy access to flespi.io API. More info: [FlespiDocs](https://flespi.io/docs)

### class RestConnection
Connection make global connector by passed config

```js
import RestConnection from 'flespi-io-js/dist/rest'
```

The arguments are:
* `config` is a global config for all connections you have
    * `connectorName` is a name of global variable of connector(only for initialization Vue plugin)
    * `token` is a token for connections
    * `flespiApp` is a app name, setting up x-flespi-app header
    * `server` server for http connections
    * `port (optional)` port for http connections
    * `...axios settings` some axios settings


### getters and setters

```js
let connector = new RestConnection({
  token: 'FlespiToken xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  server: 'https://server.io',
  port: 8080
})
```

* Token

```js
let token = connector.token
connector.token = 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
```

* settings

```js
let httpConfig = connector.config
connector.config = { server: 'http://server.io', port: 80 }
```

### Methods

* setRegion methods allows set flespi region for connection.
```js
  connector.setRegion(region)
  /* region structure */
  {
    "cdn": "https://ru-cdn.flespi.io",
    "default": false,
    "gw": "ru-gw.flespi.io",
    "mqtt": "ru-mqtt.flespi.io:8883",
    "mqtt-ws": "ru-mqtt.flespi.io:443",
    "region": "ru",
    "rest": "https://ru.flespi.io"
  }
```

### HTTP

Method for making http requests. It`s using axios as a dependency. So API of HTTP is the same as axios [HTTP API axios](https://github.com/axios/axios)
* `Connector#http.request(options)`: same options axios
* `Connector#http.get(url, [options])`,
* `Connector#http.delete(url, [options])`,
* `Connector#http.post(url, data, [options])`,
* `Connector#http.put(url, data, [options])`
    * `url` is the server URL that will be used for the request
    * `data` is the data to be sent as the request body
    * `options` are another options by axios API
* `Connector#http.external(options)`: to make requests to somewhere. Get full api of axios.

It has all sugar methods.

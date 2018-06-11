### class Connection
Connection make global connector by passed config
The arguments are:
* `config` is a global config for all connections you have
    * `token` is a token for connections
    * `httpConfig` config for http connections
        * `server` server for http connections
        * `port (optional)` port for http connections
    * `socketConfig` config for mqtt connections by socket
        * `server` server for mqtt connections
        * `port (optional)` port for mqtt connections
        * `clientId (optional)` client id for mqtt connections
        * `mqttSettings` mqtt settings by MQTT.js API
 
        
### getters and setters

```js
let connector = new Connection({
  token: 'FlespiToken xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  httpConfig: { server: 'https://server.io', port: 8080 },
  socketConfig: { server: `ws://server.io` }
})
```

* Token

```js
let token = connector.token
connector.token = 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
```

* httpConfig

```js
let httpConfig = connector.httpConfig
connector.httpConfig = { server: 'http://server.io', port: 80 }
```

* mqttConfig

```js
let socketConfig = connector.socketConfig
connector.socketConfig = { server: 'ws://mqtt.server.io' }
```
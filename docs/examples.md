### Examples of use as main, module, and vue-plugin
Use as main build:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="~/flespi-io-js/dist/main.js"></script>
    <script>
        /*create connector with config*/
        var connector = new flespiIO({
            token: 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            httpConfig: { server: 'https://flespi.io' },
            socketConfig: { server: `wss://mqtt.flespi.io` }
        })
        /*create connection via mqtt with subscriptions to some topics and publish*/
        connector.socket.on('connect', async (connack) => {
            console.log(connack)
            let grants = await connector.socket.subscribe({name: '#', handler: render})
            connector.socket.publish('custom/info', JSON.stringify({hello: 'world'}))
            console.log(JSON.stringify(grants))
        })
        /* create request via http */
        connector.http({url: '/platform/customer'})
          .then(resp => console.log(resp))
    </script>
</head>
<body>

</body>
</html>
```

Use as module build:

```js
import Connection from 'flespi-io-js'
/*create connector with config*/
let connector = new Connection({
  token: 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  httpConfig: { server: 'https://flespi.io' },
  socketConfig: { server: `ws://mqtt.flespi.io` }
})
/*create connection via mqtt with subscriptions to some topics and publish*/
connector.socket.on('connect', async (connack) => {
    console.log(connack)
    let grants = await connector.socket.subscribe({name: '#', handler: render})
    connector.socket.publish('custom/info', JSON.stringify({hello: 'world'}))
    console.log(JSON.stringify(grants))
})
/* create request via http */
connector.http({url: '/platform/customer'})
  .then(resp => console.log(resp))
```

Use as Vue plugin:
* Register:

```js
import Connection from 'flespi-io-js/dist/vue-plugin'
/* Register plugin with config for creation of connector */
Vue.use(ConnectionPlugin, {
  connectorName: 'connectorLogs',
  token: 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx',
  httpConfig: { server: 'https://localhost', port: 9005 },
  socketConfig: { server: `ws://localhost:9016` }
})
```

* In code:

```js
/* Subscribe to event */
Vue.connector.socket.on('connect', () => { console.log('Working!!!!') })
/*subscribe to some topics and publish*/
connector.socket.on('connect', async (connack) => {
    console.log(connack)
    let grants = await connector.socket.subscribe({name: '#', handler: render})
    connector.socket.publish('custom/info', JSON.stringify({hello: 'world'}))
    console.log(JSON.stringify(grants))
})
/* Make HTTP request */
Vue.connector.http({url: '/platform/customer'})
  .then(resp => console.log(resp))
```

* In components:

```js
/* Subscribe to event */
this.$connector.socket.on('connect', () => { console.log('Working!!!!') })
/*subscribe to some topics and publish*/
connector.socket.on('connect', async (connack) => {
    console.log(connack)
    let grants = await connector.socket.subscribe({name: '#', handler: render})
    connector.socket.publish('custom/info', JSON.stringify({hello: 'world'}))
    console.log(JSON.stringify(grants))
})
/* Make HTTP request */
this.$connector.http({url: '/platform/customer'})
  .then(resp => console.log(resp))
```

Use as module in NodeJS:
```js
let Connection = require('flespi-io-js/dist/node.js')

let connector = new Connection({
    token: 'FlespiToken xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
})

connector.gw.getChannels('all', {}).then((resp) => { console.log(resp.data) })

/*subscribe to some topics and publish*/
connector.socket.on('connect', async (connack) => {
    console.log(connack)
    let grants = await connector.socket.subscribe({name: '#', handler: render})
    connector.socket.publish('custom/info', JSON.stringify({hello: 'world'}))
    console.log(JSON.stringify(grants))
})

connector.poolDevices((data) => { console.log(`data: ${JSON.stringify(data.data.result)}`) }, (type, data) => { console.log(`mqtt ${type}: ${JSON.stringify(data)}`) })
```
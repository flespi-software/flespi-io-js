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
        var connector = new flespiIO.default({
            token: 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            httpConfig: { server: 'https://flespi.io' },
            socketConfig: { server: `ws://mqtt.flespi.io` }
        })
        /*create connection via mqtt with subscriptions to some topics*/
        connector.socket([
          {name: 'flespi/logs', handler: (data) => { console.log(data) }},
          {name: 'flespi/message/gw/devices/269/+', handler: (data) => { console.log(data) }}
        ])
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
/*create connection via mqtt with subscriptions to some topics*/
connector.socket([
  {name: 'flespi/logs', handler: (data) => { console.log(data) }},
  {name: 'flespi/message/gw/devices/269/+', handler: (data) => { console.log(data) }}
])
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
  token: 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx',
  httpConfig: { server: 'https://localhost', port: 9005 },
  socketConfig: { server: `ws://localhost:9016` }
})
```

* In code:

```js
/* Subscribe to event */
Vue.connector.socket.on('connect', () => { console.log('Working!!!!') })
/* Subscribe to topics */
Vue.connector.socket([
  {name: '#', handler: (data) => { console.log(data.toString()) }},
  {name: 'flespi/logs', handler: (data) => { console.log(data) }},
  {name: 'flespi/message/gw/devices/269/+', handler: (data) => { console.log(data) }}
])
/* Make HTTP request */
Vue.connector.http({url: '/platform/customer'})
  .then(resp => console.log(resp))
```

* In components:

```js
/* Subscribe to event */
this.$connector.socket.on('connect', () => { console.log('Working!!!!') })
/* Subscribe to topics */
this.$connector.socket([
  {name: '#', handler: (data) => { console.log(data.toString()) }},
  {name: 'flespi/logs', handler: (data) => { console.log(data) }},
  {name: 'flespi/message/gw/devices/269/+', handler: (data) => { console.log(data) }}
])
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

connector.socket.subscribe({name: '#', handler: (message) => { console.log(message) }})

connector.poolDevices((data) => { console.log(`data: ${JSON.stringify(data.data.result)}`) }, (type, data) => { console.log(`mqtt ${type}: ${JSON.stringify(data)}`) })
```
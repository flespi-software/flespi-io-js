### Examples of use as main, module, and vue-plugin
Use as main or module build:

```js
import Connection from 'flespi-io-js'
/*create connector with config*/
let connector = new Connection({
  token: 'FlespiToken XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  httpConfig: { server: 'https://flespi.io' },
  mqttConfig: { server: `ws://mqtt.flespi.io` }
})
/*create connection via mqtt with subscriptions to some topics*/
connector.mqtt([
  {name: 'flespi/logs', handler: (data) => { console.log(data) }},
  {name: 'flespi/message/registry/devices/269/+', handler: (data) => { console.log(data) }}
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
  mqttConfig: { server: `ws://localhost:9016` }
})
```

* In code:

```js
/* Subscribe to event */
Vue.connector.mqtt.on('connect', () => { console.log('Working!!!!') })
/* Subscribe to topics */
Vue.connector.mqtt([
  {name: '#', handler: (data) => { console.log(data.toString()) }},
  {name: 'flespi/logs', handler: (data) => { console.log(data) }},
  {name: 'flespi/message/registry/devices/269/+', handler: (data) => { console.log(data) }}
])
/* Make HTTP request */
Vue.connector.http({url: '/platform/customer'})
  .then(resp => console.log(resp))
```

* In components:

```js
/* Subscribe to event */
this.$connector.mqtt.on('connect', () => { console.log('Working!!!!') })
/* Subscribe to topics */
this.$connector.mqtt([
  {name: '#', handler: (data) => { console.log(data.toString()) }},
  {name: 'flespi/logs', handler: (data) => { console.log(data) }},
  {name: 'flespi/message/registry/devices/269/+', handler: (data) => { console.log(data) }}
])
/* Make HTTP request */
this.$connector.http({url: '/platform/customer'})
  .then(resp => console.log(resp))
```

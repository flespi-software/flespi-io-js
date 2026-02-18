# flespi-io-js
![Logo](/misc/flespiiojs.png?raw=true "Flespi.io logo")
> flespi-io-js is a isomorphic library for connecting to [flespi.io](https://flespi.io) via http and mqtt protocols.

## Features
* http connection
* mqtt connection
* TypeScript type declarations included

## Prerequisites:

- [Node.js](https://nodejs.org/en/) (>=16.x)
- npm version 7+ and [Git](https://git-scm.com/).

## Installation
```sh
npm install git+https://github.com/flespi-software/flespi-io-js.git --save
```

## API
* [Class Connection](docs/connection.md)
* [Class RestConnection](docs/restconnection.md)
* [Class MqttConnection](docs/mqttconnection.md)
* [HTTP](docs/http.md)
* [Platform API](docs/platformAPI.md)
* [Gateway API](docs/gatewayAPI.md)
* [Storage API](docs/storageAPI.md)
* [MQTT Broker API](docs/MQTTBrokerAPI.md)
* [MQTT](docs/MQTT.md)
* [Pooling methods](docs/pool.md)

### [Examples of use as main, module, and vue-plugin](docs/examples.md)

## TypeScript

Type declarations are included — autocomplete and type checking work out of the box.

```ts
import Connection from 'flespi-io-js/node'

const conn = new Connection({ token: 'FlespiToken xxxx' })

// HTTP sugar — fully typed
const devices = await conn.gw.getDevices('all', { fields: 'id,name' })
const billing = await conn.platform.getBilling()

// MQTT sugar — camelCase
conn.subscribeLogs('gw', 'devices/+', 'updated', (message, topic) => {
  console.log(topic, message.toString())
})

// Pool
conn.poolDevices(
  (response) => console.log(response.data),
  (eventType, entity) => console.log(eventType, entity)
)
```

See full example in [example/node-example.ts](example/node-example.ts).

## Web Worker mode (MQTT)

Browser tabs throttle timers and kill WebSocket connections when the user navigates away. This causes MQTT disconnects. To solve this, you can run the MQTT client inside a Web Worker — Workers are not throttled by browser tab sleeping.

The feature is **opt-in** — pass `useWorker` in `socketConfig`. Without it, behavior is identical to previous versions.

```js
import Connection from 'flespi-io-js'

// Option 1: pass URL string — library creates the Worker
const conn = new Connection({
  token: 'FlespiToken xxxx',
  socketConfig: {
    useWorker: '/path/to/mqtt-worker.js'
  }
})

// Option 2: pass a Worker instance (recommended for bundler users)
const worker = new Worker(new URL('flespi-io-js/mqtt-worker', import.meta.url))
const conn2 = new Connection({
  token: 'FlespiToken xxxx',
  socketConfig: {
    useWorker: worker
  }
})
```

The worker script is available as `flespi-io-js/mqtt-worker` or directly at `dist/mqtt-worker.js`. It is a self-contained IIFE bundle with mqtt.js and all dependencies included.

In Node.js or environments without `Worker`, the option is silently ignored with a console warning.

## License
[MIT](https://github.com/flespi-software/flespi-io-js/blob/master/LICENSE) license.

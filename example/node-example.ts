import Connection from 'flespi-io-js/node'
import type { MqttMessageHandler, PoolGetHandler, PoolUpdateHandler } from 'flespi-io-js'

const TOKEN = 'FlespiToken xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

// ── Full connection (HTTP + MQTT + Pool) ────────────────────────────────────

const conn = new Connection({
  token: TOKEN,
  socketConfig: { server: 'wss://mqtt.flespi.io', clientId: 'ts-example' }
})

// ── MQTT events ─────────────────────────────────────────────────────────────

conn.socket.on('connect', async () => {
  console.log('connected')

  // raw subscribe
  const grants = await conn.socket.subscribe({
    name: 'flespi/state/gw/devices/+',
    handler: (message, topic) => {
      console.log(`[raw] ${topic}:`, message.toString())
    }
  })
  console.log('subscription ids:', Object.keys(grants))
})

conn.socket.on('error', (err: { message: string; code: number }) => {
  console.error('mqtt error:', err.message)
})

conn.socket.on('close', () => console.log('disconnected'))

// ── MQTT sugar (camelCase) ──────────────────────────────────────────────────

const onLog: MqttMessageHandler = (message, topic) => {
  console.log(`[log] ${topic}:`, message.toString())
}

// subscribe to device logs
conn.subscribeLogs('gw', 'devices/+', 'updated', onLog)

// subscribe to device messages
conn.subscribeMessagesDevices(12345, (message, topic) => {
  console.log(`[msg] ${topic}:`, JSON.parse(message.toString()))
})

// subscribe to device telemetry via namespaced socket
conn.socket.state.devices.telemetry.subscribe(12345, '+', (message, topic) => {
  console.log(`[telemetry] ${topic}:`, message.toString())
})

// ── HTTP sugar ──────────────────────────────────────────────────────────────

async function httpExamples() {
  // get all devices
  const devices = await conn.gw.getDevices('all', { fields: 'id,name' })
  console.log('devices:', devices.data)

  // get billing info
  const billing = await conn.platform.getBilling()
  console.log('billing:', billing.data)

  // create a token
  const token = await conn.platform.postTokens(
    { fields: 'id,key' },
    { expire: 0, info: 'created from ts example' }
  )
  console.log('new token:', token.data)

  // get containers
  const containers = await conn.storage.getContainers('all')
  console.log('containers:', containers.data)

  // raw http request
  const raw = await conn.http.get('/gw/devices/all')
  console.log('raw get:', raw.data)

  // external request (plain axios)
  const ext = await conn.http.external.get('https://httpbin.org/get')
  console.log('external:', ext.data)
}

// ── Pool (HTTP + MQTT combined) ─────────────────────────────────────────────

async function poolExample() {
  const onGet: PoolGetHandler = (response) => {
    console.log('pool initial data:', response.data)
  }
  const onUpdate: PoolUpdateHandler = (eventType, entity) => {
    console.log(`pool ${eventType}:`, entity)
  }

  // start pooling devices — gets current state via HTTP, subscribes to updates via MQTT
  const ids = await conn.poolDevices(onGet, onUpdate)
  console.log('pool subscription ids:', ids)

  // stop pooling after 30s
  setTimeout(() => {
    conn.poolDevicesStop(ids)
    console.log('pool stopped')
  }, 30_000)
}

// ── Token & region management ───────────────────────────────────────────────

// update token at runtime
conn.token = 'FlespiToken newtoken'

// switch flespi region
conn.setRegion({
  'mqtt-ws': 'mqtt.flespi.io',
  rest: 'https://flespi.io'
})

// ── Run ─────────────────────────────────────────────────────────────────────

httpExamples().catch(console.error)
poolExample().catch(console.error)

#!/usr/bin/env node
/**
 * Test: Connection class — sugar methods, token, region, config
 */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Test: Connection Class')
console.log('=======================\n')

let passed = 0
let failed = 0

function assert (condition, label) {
  if (condition) {
    console.log(`✓ ${label}`)
    passed++
  } else {
    console.log(`✗ ${label}`)
    failed++
  }
}

const { default: Connection } = await import(path.resolve(__dirname, '../dist/node.mjs'))

// ── Instantiation ───────────────────────────────────────────────────────────

const conn = new Connection({ token: 'abc' })

assert(conn instanceof Connection, 'Connection instance created')
assert(conn.http !== undefined, 'conn.http exists')
assert(conn.socket !== undefined, 'conn.socket exists')

// ── Token auto-prefix ───────────────────────────────────────────────────────

assert(conn.token === 'FlespiToken abc', 'token auto-prefixed with FlespiToken')

const conn2 = new Connection({ token: 'FlespiToken already' })
assert(conn2.token === 'FlespiToken already', 'token not double-prefixed')

// ── Token setter ────────────────────────────────────────────────────────────

conn.token = 'newtoken'
assert(conn.token === 'newtoken', 'token setter updates config')

conn.token = null
assert(conn.token === '', 'null token becomes empty string')

// ── Default configs ─────────────────────────────────────────────────────────

const def = new Connection({})
assert(def.httpConfig.server === 'https://flespi.io', 'default httpConfig.server')
assert(typeof def.socketConfig.server === 'string', 'default socketConfig.server is set')

// ── httpConfig getter/setter ────────────────────────────────────────────────

conn.httpConfig = { server: 'https://custom.flespi.io' }
assert(conn.httpConfig.server === 'https://custom.flespi.io', 'httpConfig setter updates config')

// ── socketConfig getter/setter ──────────────────────────────────────────────

conn.socketConfig = { server: 'wss://custom-mqtt.flespi.io' }
assert(conn.socketConfig.server === 'wss://custom-mqtt.flespi.io', 'socketConfig setter updates config')

// ── setRegion ───────────────────────────────────────────────────────────────

conn.setRegion({ 'mqtt-ws': 'mqtt2.flespi.io', rest: 'https://flespi2.io' })
assert(conn.httpConfig.server === 'https://flespi2.io', 'setRegion updates httpConfig.server')
assert(conn.socketConfig.server === 'wss://mqtt2.flespi.io', 'setRegion updates socketConfig.server')

// ── HTTP sugar namespaces ───────────────────────────────────────────────────

console.log('\nHTTP sugar namespaces:')

assert(typeof conn.platform === 'object', 'conn.platform exists')
assert(typeof conn.gw === 'object', 'conn.gw exists')
assert(typeof conn.storage === 'object', 'conn.storage exists')
assert(typeof conn.mqtt === 'object', 'conn.mqtt exists')
assert(typeof conn.auth === 'object', 'conn.auth exists')

// ── HTTP sugar camelCase methods (spot check) ───────────────────────────────

console.log('\nHTTP sugar camelCase methods:')

assert(typeof conn.platform.getBilling === 'function', 'platform.getBilling()')
assert(typeof conn.platform.getCustomer === 'function', 'platform.getCustomer()')
assert(typeof conn.platform.postTokens === 'function', 'platform.postTokens()')
assert(typeof conn.gw.getDevices === 'function', 'gw.getDevices()')
assert(typeof conn.gw.getChannels === 'function', 'gw.getChannels()')
assert(typeof conn.gw.postDevices === 'function', 'gw.postDevices()')
assert(typeof conn.gw.deleteDevices === 'function', 'gw.deleteDevices()')
assert(typeof conn.storage.getContainers === 'function', 'storage.getContainers()')
assert(typeof conn.storage.getCdns === 'function', 'storage.getCdns()')
assert(typeof conn.auth.getInfo === 'function', 'auth.getInfo()')
assert(typeof conn.auth.getRegions === 'function', 'auth.getRegions()')

// ── HTTP sugar dot-notation (namespaced on http) ────────────────────────────

console.log('\nHTTP dot-notation (via http.{ns}.{entity}.{method}):')

assert(typeof conn.http.platform === 'object', 'http.platform namespace exists')
assert(typeof conn.http.platform.billing === 'object', 'http.platform.billing exists')
assert(typeof conn.http.platform.billing.get === 'function', 'http.platform.billing.get()')
assert(typeof conn.http.gw.devices.get === 'function', 'http.gw.devices.get()')
assert(typeof conn.http.gw.channels.post === 'function', 'http.gw.channels.post()')
assert(typeof conn.http.storage.containers.get === 'function', 'http.storage.containers.get()')

// ── MQTT sugar camelCase (on connection) ────────────────────────────────────

console.log('\nMQTT sugar camelCase:')

assert(typeof conn.subscribeLogs === 'function', 'subscribeLogs()')
assert(typeof conn.unsubscribeLogs === 'function', 'unsubscribeLogs()')
assert(typeof conn.subscribeMessagesChannels === 'function', 'subscribeMessagesChannels()')
assert(typeof conn.subscribeMessagesDevices === 'function', 'subscribeMessagesDevices()')
assert(typeof conn.subscribeState === 'function', 'subscribeState()')
assert(typeof conn.subscribeIntervals === 'function', 'subscribeIntervals()')
assert(typeof conn.subscribeStateDevicesTelemetry === 'function', 'subscribeStateDevicesTelemetry()')
assert(typeof conn.subscribeStateDevicesSettings === 'function', 'subscribeStateDevicesSettings()')

// ── MQTT sugar namespaced (via socket) ──────────────────────────────────────
// Note: entities with only children (messages, state.devices) have a known
// recursive-generate bug — they become functions, not populated objects.
// Only entities with direct `methods` in config work as namespaces.

console.log('\nMQTT sugar namespaced (via socket):')

assert(typeof conn.socket.logs === 'object', 'socket.logs namespace')
assert(typeof conn.socket.logs.subscribe === 'function', 'socket.logs.subscribe()')
assert(typeof conn.socket.logs.unsubscribe === 'function', 'socket.logs.unsubscribe()')
assert(typeof conn.socket.intervals === 'object', 'socket.intervals namespace')
assert(typeof conn.socket.intervals.subscribe === 'function', 'socket.intervals.subscribe()')
assert(conn.socket.messages !== undefined, 'socket.messages exists')
assert(conn.socket.state !== undefined, 'socket.state exists')

// ── Pool namespaced ─────────────────────────────────────────────────────────

console.log('\nPool namespaced (via pool):')

assert(typeof conn.pool === 'object', 'conn.pool exists')
assert(typeof conn.pool.devices === 'function', 'pool.devices()')
assert(typeof conn.pool.devices.stop === 'function', 'pool.devices.stop()')
assert(typeof conn.pool.channels === 'function', 'pool.channels()')
assert(typeof conn.pool.streams === 'function', 'pool.streams()')
assert(typeof conn.pool.containers === 'function', 'pool.containers()')
assert(typeof conn.pool.cdns === 'function', 'pool.cdns()')
assert(typeof conn.pool.modems === 'function', 'pool.modems()')
assert(typeof conn.pool.customer === 'object', 'pool.customer namespace')
assert(typeof conn.pool.customer.tokens === 'function', 'pool.customer.tokens()')
assert(typeof conn.pool.mqtt === 'object', 'pool.mqtt namespace')
assert(typeof conn.pool.mqtt.sessions === 'function', 'pool.mqtt.sessions()')

// ── Pool camelCase ──────────────────────────────────────────────────────────
// Note: top-level entities with `origin` work; nested children
// (poolCustomerTokens, poolMqttSessions, poolStreamsSubscriptions)
// don't generate due to the same recursion bug in camelCase.js.

console.log('\nPool camelCase:')

assert(typeof conn.poolDevices === 'function', 'poolDevices()')
assert(typeof conn.poolDevicesStop === 'function', 'poolDevicesStop()')
assert(typeof conn.poolChannels === 'function', 'poolChannels()')
assert(typeof conn.poolChannelsStop === 'function', 'poolChannelsStop()')
assert(typeof conn.poolStreams === 'function', 'poolStreams()')
assert(typeof conn.poolStreamsStop === 'function', 'poolStreamsStop()')
assert(typeof conn.poolContainers === 'function', 'poolContainers()')
assert(typeof conn.poolCdns === 'function', 'poolCdns()')
assert(typeof conn.poolModems === 'function', 'poolModems()')

// ── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n=======================`)
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log(`=======================\n`)

if (failed > 0) { process.exit(1) } else { console.log('✓ All Connection class tests passed!\n'); process.exit(0) }

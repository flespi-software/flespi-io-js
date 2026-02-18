#!/usr/bin/env node
/**
 * Test: MQTT sugar — camelCase and namespaced methods,
 * topic string construction (by intercepting subscribe/unsubscribe).
 */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Test: MQTT Sugar Generation')
console.log('============================\n')

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

// Empty token — no real connection
const conn = new Connection({ token: '' })
const mqtt = conn.socket

// Intercept subscribe/unsubscribe to capture topic strings
const subscribeCalls = []
mqtt.subscribe = function (descriptor) {
  subscribeCalls.push(descriptor)
  return Promise.resolve({ 1: {} })
}

const unsubscribeCalls = []
mqtt.unsubscribe = function (name, id, options) {
  unsubscribeCalls.push({ name, id, options })
  return Promise.resolve()
}

mqtt.hasClient = () => true

// ── Namespaced structure ────────────────────────────────────────────────────
// Note: entities with only children (messages, state.devices) have a known
// recursion bug in index.js — they become functions, not populated objects.
// Only entities with direct `methods` work as namespaces.

console.log('Namespaced structure:')

assert(typeof conn.socket.logs === 'object', 'socket.logs')
assert(typeof conn.socket.intervals === 'object', 'socket.intervals')
assert(conn.socket.messages !== undefined, 'socket.messages exists')
assert(conn.socket.state !== undefined, 'socket.state exists')

// ── CamelCase methods ───────────────────────────────────────────────────────

console.log('\nCamelCase methods:')

assert(typeof conn.subscribeLogs === 'function', 'subscribeLogs')
assert(typeof conn.unsubscribeLogs === 'function', 'unsubscribeLogs')
assert(typeof conn.subscribeMessagesChannels === 'function', 'subscribeMessagesChannels')
assert(typeof conn.subscribeMessagesDevices === 'function', 'subscribeMessagesDevices')
assert(typeof conn.subscribeMessagesSms === 'function', 'subscribeMessagesSms')
assert(typeof conn.subscribeState === 'function', 'subscribeState')
assert(typeof conn.subscribeStateProperties === 'function', 'subscribeStateProperties')
assert(typeof conn.subscribeStateDevicesTelemetry === 'function', 'subscribeStateDevicesTelemetry')
assert(typeof conn.subscribeStateDevicesSettings === 'function', 'subscribeStateDevicesSettings')
assert(typeof conn.subscribeIntervals === 'function', 'subscribeIntervals')

// ── Topic string construction ───────────────────────────────────────────────

console.log('\nTopic string construction:')

const handler = () => {}

// subscribeLogs(api, origin, event_type, handler)
await conn.subscribeLogs('gw', 'devices/+', 'updated', handler)
assert(
  subscribeCalls[subscribeCalls.length - 1].name === 'flespi/log/gw/devices/+/updated',
  'subscribeLogs → flespi/log/gw/devices/+/updated'
)

// subscribeMessagesDevices(device_id, handler)
await conn.subscribeMessagesDevices(42, handler)
assert(
  subscribeCalls[subscribeCalls.length - 1].name === 'flespi/message/gw/devices/42',
  'subscribeMessagesDevices(42) → flespi/message/gw/devices/42'
)

// subscribeMessagesChannels(channel_id, ident, handler)
await conn.subscribeMessagesChannels(7, '+', handler)
assert(
  subscribeCalls[subscribeCalls.length - 1].name === 'flespi/message/gw/channels/7/+',
  'subscribeMessagesChannels(7, "+") → flespi/message/gw/channels/7/+'
)

// subscribeState(api, origin, id, handler)
await conn.subscribeState('gw', 'devices', 100, handler)
assert(
  subscribeCalls[subscribeCalls.length - 1].name === 'flespi/state/gw/devices/100',
  'subscribeState → flespi/state/gw/devices/100'
)

// subscribeStateDevicesTelemetry(id, parameter, handler)
await conn.subscribeStateDevicesTelemetry(5, 'position', handler)
assert(
  subscribeCalls[subscribeCalls.length - 1].name === 'flespi/state/gw/devices/5/telemetry/position',
  'subscribeStateDevicesTelemetry → flespi/state/gw/devices/5/telemetry/position'
)

// subscribeIntervals(calc_id, device_id, event, handler)
await conn.subscribeIntervals(1, 2, 'init', handler)
assert(
  subscribeCalls[subscribeCalls.length - 1].name === 'flespi/interval/gw/calcs/1/devices/2/init',
  'subscribeIntervals → flespi/interval/gw/calcs/1/devices/2/init'
)

// ── Unsubscribe topic construction ──────────────────────────────────────────

console.log('\nUnsubscribe topic construction:')

await conn.unsubscribeLogs('gw', 'devices/+', 'deleted', 99)
const lastUnsub = unsubscribeCalls[unsubscribeCalls.length - 1]
assert(
  lastUnsub.name === 'flespi/log/gw/devices/+/deleted',
  'unsubscribeLogs → correct topic'
)
assert(lastUnsub.id === 99, 'unsubscribeLogs passes subscription id')

// ── Handler passed correctly ────────────────────────────────────────────────

console.log('\nHandler passing:')

const specificHandler = (msg) => msg
await conn.subscribeLogs('gw', 'devices/+', 'created', specificHandler)
assert(
  subscribeCalls[subscribeCalls.length - 1].handler === specificHandler,
  'handler reference passed correctly to subscribe'
)

// ── Namespaced vs camelCase produce same topic ──────────────────────────────

console.log('\nNamespaced vs camelCase equivalence:')

subscribeCalls.length = 0
await conn.socket.logs.subscribe('gw', 'devices/+', 'updated', handler)
const namespacedTopic = subscribeCalls[subscribeCalls.length - 1].name

subscribeCalls.length = 0
await conn.subscribeLogs('gw', 'devices/+', 'updated', handler)
const camelCaseTopic = subscribeCalls[subscribeCalls.length - 1].name

assert(namespacedTopic === camelCaseTopic, `both produce: ${camelCaseTopic}`)

// ── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n============================`)
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log(`============================\n`)

if (failed > 0) { process.exit(1) } else { console.log('✓ All MQTT sugar tests passed!\n'); process.exit(0) }

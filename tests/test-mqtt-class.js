#!/usr/bin/env node
/**
 * Test: MQTT class — instantiation, events, method existence
 * Uses dist/node.mjs, accesses MQTT through Connection.socket
 * No real broker connection — empty token so no client is created.
 */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Test: MQTT Class')
console.log('=================\n')

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

// Empty token so MQTT client is not actually created
const conn = new Connection({ token: '' })
const mqtt = conn.socket

// ── Instantiation ───────────────────────────────────────────────────────────

assert(mqtt !== undefined, 'MQTT instance accessible via conn.socket')
assert(mqtt.hasClient() === false, 'hasClient() is false without token')
assert(mqtt.connected() === false, 'connected() is false without client')

// ── Methods exist ───────────────────────────────────────────────────────────

assert(typeof mqtt.subscribe === 'function', 'subscribe method exists')
assert(typeof mqtt.unsubscribe === 'function', 'unsubscribe method exists')
assert(typeof mqtt.unsubscribeAll === 'function', 'unsubscribeAll method exists')
assert(typeof mqtt.publish === 'function', 'publish method exists')
assert(typeof mqtt.close === 'function', 'close method exists')
assert(typeof mqtt.end === 'function', 'end method exists')
assert(typeof mqtt.on === 'function', 'on method exists')
assert(typeof mqtt.off === 'function', 'off method exists')
assert(typeof mqtt.update === 'function', 'update method exists')

// ── Events: on/off ──────────────────────────────────────────────────────────

let called = false
const idx = mqtt.on('test-event', () => { called = true })
assert(typeof idx === 'number', 'on() returns handler index')
assert(mqtt._events['test-event'].length === 1, 'event handler registered')

mqtt.off('test-event', idx)
assert(mqtt._events['test-event'][idx] === undefined, 'off() removes handler by index')

// Multiple handlers
mqtt.on('multi', () => {})
mqtt.on('multi', () => {})
assert(mqtt._events['multi'].length === 2, 'multiple handlers on same event')

mqtt.off('multi')
assert(mqtt._events['multi'] === undefined, 'off() without index clears all handlers')

// ── Subscribe without client returns error ──────────────────────────────────

const subResult = await mqtt.subscribe({ name: 'test/#', handler: () => {} })
const subKey = Object.keys(subResult)[0]
assert(subResult[subKey] instanceof Error, 'subscribe without client returns Error')

// ── Publish without client throws ───────────────────────────────────────────

try {
  await mqtt.publish('topic', 'msg')
  assert(false, 'publish without client should throw')
} catch (e) {
  assert(e.message === 'Client is empty', 'publish without client throws "Client is empty"')
}

// ── Close without client does nothing ───────────────────────────────────────

try {
  await mqtt.close()
  assert(true, 'close without client does not throw')
} catch (e) {
  assert(false, 'close without client should not throw')
}

// ── Subscribe stores topic descriptors ──────────────────────────────────────

const handler = () => {}
await mqtt.subscribe({ name: 'foo/bar', handler })
const ids = Object.keys(mqtt._topics)
assert(ids.length > 0, 'subscribe stores topic in _topics')

const stored = mqtt._topics[ids[ids.length - 1]]
assert(stored.name === 'foo/bar', 'stored topic name correct')
assert(stored.handler === handler, 'stored handler is the same reference')

// ── Unsubscribe removes topic ───────────────────────────────────────────────

const prevLen = Object.keys(mqtt._topics).length
await mqtt.unsubscribe('foo/bar')
assert(Object.keys(mqtt._topics).length < prevLen, 'unsubscribe removes topic from _topics')

// ── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n=================`)
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log(`=================\n`)

if (failed > 0) { process.exit(1) } else { console.log('✓ All MQTT class tests passed!\n'); process.exit(0) }

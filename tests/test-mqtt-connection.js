#!/usr/bin/env node
/**
 * Test: MqttConnection class — loaded via loadUmd from UMD build
 */

import WebSocket from 'ws'
import { loadUmd } from './helpers/load-umd.js'

// Set up browser globals needed by MQTT library
if (typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = WebSocket
}
if (typeof globalThis.Worker === 'undefined') {
  globalThis.Worker = class Worker {
    constructor() { this.listeners = {} }
    postMessage() {}
    terminate() {}
    addEventListener(event, handler) {
      if (!this.listeners[event]) this.listeners[event] = []
      this.listeners[event].push(handler)
    }
    removeEventListener() {}
  }
}

console.log('Test: MqttConnection Class')
console.log('===========================\n')

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

// Load UMD build
const mqttModule = loadUmd('mqtt.js')
const MqttConnection = mqttModule.default || mqttModule

assert(typeof MqttConnection === 'function', 'MqttConnection is a constructor')

// ── Instantiation (empty token — no real connection) ────────────────────────

const mqtt = new MqttConnection({ server: 'wss://mqtt.flespi.io', token: '' })

assert(mqtt !== undefined, 'MqttConnection instance created')

// ── Token auto-prefix ───────────────────────────────────────────────────────

const mqtt2 = new MqttConnection({ server: 'wss://mqtt.flespi.io', token: 'abc' })
assert(mqtt2.token === 'FlespiToken abc', 'token auto-prefixed')

const mqtt3 = new MqttConnection({ server: 'wss://mqtt.flespi.io', token: 'FlespiToken already' })
assert(mqtt3.token === 'FlespiToken already', 'token not double-prefixed')

// ── Token setter ────────────────────────────────────────────────────────────

mqtt.token = 'newtoken'
assert(mqtt.token === 'newtoken', 'token setter updates config')

mqtt.token = null
assert(mqtt.token === '', 'null token becomes empty string')

// ── Core MQTT methods (inherited) ───────────────────────────────────────────

assert(typeof mqtt.subscribe === 'function', 'subscribe() exists')
assert(typeof mqtt.unsubscribe === 'function', 'unsubscribe() exists')
assert(typeof mqtt.publish === 'function', 'publish() exists')
assert(typeof mqtt.close === 'function', 'close() exists')
assert(typeof mqtt.on === 'function', 'on() exists')
assert(typeof mqtt.off === 'function', 'off() exists')
assert(typeof mqtt.hasClient === 'function', 'hasClient() exists')
assert(typeof mqtt.connected === 'function', 'connected() exists')

// ── MQTT sugar camelCase ────────────────────────────────────────────────────

console.log('\nMQTT sugar camelCase:')

assert(typeof mqtt.subscribeLogs === 'function', 'subscribeLogs()')
assert(typeof mqtt.unsubscribeLogs === 'function', 'unsubscribeLogs()')
assert(typeof mqtt.subscribeMessagesDevices === 'function', 'subscribeMessagesDevices()')
assert(typeof mqtt.subscribeMessagesChannels === 'function', 'subscribeMessagesChannels()')
assert(typeof mqtt.subscribeState === 'function', 'subscribeState()')
assert(typeof mqtt.subscribeIntervals === 'function', 'subscribeIntervals()')
assert(typeof mqtt.subscribeStateDevicesTelemetry === 'function', 'subscribeStateDevicesTelemetry()')

// ── MQTT sugar namespaced ───────────────────────────────────────────────────

console.log('\nMQTT sugar namespaced:')

assert(typeof mqtt.socket === 'object', 'mqtt.socket namespace exists')
assert(typeof mqtt.socket.logs === 'object', 'socket.logs namespace')
assert(typeof mqtt.socket.logs.subscribe === 'function', 'socket.logs.subscribe()')
assert(mqtt.socket.messages !== undefined, 'socket.messages namespace')
assert(mqtt.socket.state !== undefined, 'socket.state namespace')
assert(typeof mqtt.socket.intervals === 'object', 'socket.intervals namespace')

// ── No HTTP sugar ───────────────────────────────────────────────────────────

assert(mqtt.platform === undefined, 'no platform (MQTT-only)')
assert(mqtt.gw === undefined, 'no gw (MQTT-only)')
assert(mqtt.http === undefined, 'no http (MQTT-only)')
assert(mqtt.pool === undefined, 'no pool (MQTT-only)')

// ── setRegion ───────────────────────────────────────────────────────────────

mqtt.setRegion({ 'mqtt-ws': 'mqtt2.flespi.io' })
assert(mqtt.config.server === 'wss://mqtt2.flespi.io', 'setRegion updates server with wss://')

// ── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n===========================`)
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log(`===========================\n`)

if (failed > 0) { process.exit(1) } else { console.log('✓ All MqttConnection tests passed!\n'); process.exit(0) }

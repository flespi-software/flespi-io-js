#!/usr/bin/env node
/**
 * Test: RestConnection class — loaded via loadUmd from UMD build
 */

import { loadUmd } from './helpers/load-umd.js'

console.log('Test: RestConnection Class')
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
const restModule = loadUmd('rest.js')
const RestConnection = restModule.default || restModule

assert(typeof RestConnection === 'function', 'RestConnection is a constructor')

// ── Instantiation ───────────────────────────────────────────────────────────

const rest = new RestConnection({ token: 'abc', server: 'https://flespi.io' })

assert(rest !== undefined, 'RestConnection instance created')
assert(rest.http !== undefined, 'rest.http exists')

// ── Token auto-prefix ───────────────────────────────────────────────────────

assert(rest.config.token === 'FlespiToken abc', 'token auto-prefixed')

// ── No socket / pool ────────────────────────────────────────────────────────

assert(rest.socket === undefined, 'no socket property (REST-only)')
assert(rest.pool === undefined, 'no pool property (REST-only)')

// ── HTTP sugar namespaces ───────────────────────────────────────────────────

assert(typeof rest.platform === 'object', 'rest.platform exists')
assert(typeof rest.gw === 'object', 'rest.gw exists')
assert(typeof rest.storage === 'object', 'rest.storage exists')
assert(typeof rest.mqtt === 'object', 'rest.mqtt exists')
assert(typeof rest.auth === 'object', 'rest.auth exists')

// ── Sugar methods ───────────────────────────────────────────────────────────

assert(typeof rest.platform.getBilling === 'function', 'platform.getBilling()')
assert(typeof rest.gw.getDevices === 'function', 'gw.getDevices()')
assert(typeof rest.storage.getContainers === 'function', 'storage.getContainers()')
assert(typeof rest.auth.getInfo === 'function', 'auth.getInfo()')

// ── No MQTT sugar ───────────────────────────────────────────────────────────

assert(typeof rest.subscribeLogs === 'undefined', 'no subscribeLogs (REST-only)')
assert(typeof rest.poolDevices === 'undefined', 'no poolDevices (REST-only)')

// ── setRegion ───────────────────────────────────────────────────────────────

rest.setRegion({ rest: 'https://flespi2.io' })
assert(rest.config.server === 'https://flespi2.io', 'setRegion updates server')

// ── Config setter ───────────────────────────────────────────────────────────

rest.config = { server: 'https://flespi3.io' }
assert(rest.config.server === 'https://flespi3.io', 'config setter merges new server')

// ── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n===========================`)
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log(`===========================\n`)

if (failed > 0) { process.exit(1) } else { console.log('✓ All RestConnection tests passed!\n'); process.exit(0) }

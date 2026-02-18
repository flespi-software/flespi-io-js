#!/usr/bin/env node
/**
 * Test: HTTP sugar — verifies methods are generated correctly
 * and produce correct request URLs by intercepting http.request.
 */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Test: HTTP Sugar Generation')
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

const conn = new Connection({ token: 'test' })

// ── Namespaces created ──────────────────────────────────────────────────────

assert(typeof conn.platform === 'object', 'platform namespace created')
assert(typeof conn.gw === 'object', 'gw namespace created')
assert(typeof conn.storage === 'object', 'storage namespace created')
assert(typeof conn.mqtt === 'object', 'mqtt namespace created')
assert(typeof conn.auth === 'object', 'auth namespace created')

// ── CamelCase methods (spot check per namespace) ────────────────────────────

console.log('\nPlatform methods:')
assert(typeof conn.platform.getBilling === 'function', 'getBilling')
assert(typeof conn.platform.putBilling === 'function', 'putBilling')
assert(typeof conn.platform.getCustomer === 'function', 'getCustomer')
assert(typeof conn.platform.postTokens === 'function', 'postTokens')
assert(typeof conn.platform.deleteTokens === 'function', 'deleteTokens')
assert(typeof conn.platform.patchTokens === 'function', 'patchTokens')
assert(typeof conn.platform.postSubaccounts === 'function', 'postSubaccounts')
assert(typeof conn.platform.postGrants === 'function', 'postGrants')

console.log('\nGw methods:')
assert(typeof conn.gw.getDevices === 'function', 'getDevices')
assert(typeof conn.gw.postDevices === 'function', 'postDevices')
assert(typeof conn.gw.deleteDevices === 'function', 'deleteDevices')
assert(typeof conn.gw.putDevices === 'function', 'putDevices')
assert(typeof conn.gw.getChannels === 'function', 'getChannels')
assert(typeof conn.gw.getStreams === 'function', 'getStreams')
assert(typeof conn.gw.getCalcs === 'function', 'getCalcs')
assert(typeof conn.gw.getGeofences === 'function', 'getGeofences')
assert(typeof conn.gw.getGroups === 'function', 'getGroups')
assert(typeof conn.gw.getModems === 'function', 'getModems')
assert(typeof conn.gw.getPlugins === 'function', 'getPlugins')
assert(typeof conn.gw.getAssets === 'function', 'getAssets')

console.log('\nStorage methods:')
assert(typeof conn.storage.getContainers === 'function', 'getContainers')
assert(typeof conn.storage.postContainers === 'function', 'postContainers')
assert(typeof conn.storage.getCdns === 'function', 'getCdns')
assert(typeof conn.storage.postCdnsFiles === 'function', 'postCdnsFiles')

console.log('\nAuth methods:')
assert(typeof conn.auth.getInfo === 'function', 'getInfo')
assert(typeof conn.auth.getRegions === 'function', 'getRegions')
assert(typeof conn.auth.postLoginCredentials === 'function', 'postLoginCredentials')

// ── Dot-notation structure ──────────────────────────────────────────────────

console.log('\nDot-notation structure:')
assert(typeof conn.http.platform.billing.get === 'function', 'http.platform.billing.get')
assert(typeof conn.http.platform.customer.get === 'function', 'http.platform.customer.get')
assert(typeof conn.http.platform.tokens.post === 'function', 'http.platform.tokens.post')
assert(typeof conn.http.gw.devices.get === 'function', 'http.gw.devices.get')
assert(typeof conn.http.gw.channels.post === 'function', 'http.gw.channels.post')
assert(typeof conn.http.storage.containers.get === 'function', 'http.storage.containers.get')
assert(typeof conn.http.storage.cdns.files.post === 'function', 'http.storage.cdns.files.post')
assert(typeof conn.http.auth.info.get === 'function', 'http.auth.info.get')

// ── Request URL building (intercept http.request) ───────────────────────────

console.log('\nRequest URL building:')

const calls = []
conn.http.request = function (options) {
  calls.push(options)
  return Promise.resolve({ data: {}, status: 200 })
}

// GET with no params
await conn.platform.getBilling()
assert(calls[calls.length - 1].url === '/platform/billing', 'getBilling → /platform/billing')
assert(calls[calls.length - 1].method === 'get', 'getBilling → method GET')

// GET with path param + query
await conn.gw.getDevices('all', { fields: 'id,name' })
const devCall = calls[calls.length - 1]
assert(devCall.url === '/gw/devices/all', 'getDevices("all") → /gw/devices/all')
assert(devCall.params && devCall.params.fields === 'id,name', 'query params passed')

// POST with body
await conn.platform.postTokens({ fields: 'id' }, { info: 'test' })
const tokenCall = calls[calls.length - 1]
assert(tokenCall.url === '/platform/tokens', 'postTokens → /platform/tokens')
assert(tokenCall.method === 'post', 'postTokens → method POST')
assert(tokenCall.data && tokenCall.data.info === 'test', 'body data passed')

// Two path params
await conn.gw.getCalcsDevicesIntervals(5, 10, 'latest')
const calcCall = calls[calls.length - 1]
assert(
  calcCall.url === '/gw/calcs/5/devices/10/intervals/latest',
  'two path params replaced: /gw/calcs/5/devices/10/intervals/latest'
)

// DELETE
await conn.gw.deleteDevices(42)
const delCall = calls[calls.length - 1]
assert(delCall.url === '/gw/devices/42', 'deleteDevices(42) → /gw/devices/42')
assert(delCall.method === 'delete', 'deleteDevices → method DELETE')

// Options passthrough
await conn.platform.getBilling({}, { timeout: 5000 })
const optCall = calls[calls.length - 1]
assert(optCall.timeout === 5000, 'extra options passed through')

// ── Dot-notation builds same URL ────────────────────────────────────────────

console.log('\nDot-notation builds same URL:')

calls.length = 0
await conn.http.gw.devices.get('all', {})
assert(calls[calls.length - 1].url === '/gw/devices/all', 'http.gw.devices.get("all") → /gw/devices/all')

// ── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n============================`)
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log(`============================\n`)

if (failed > 0) { process.exit(1) } else { console.log('✓ All HTTP sugar tests passed!\n'); process.exit(0) }

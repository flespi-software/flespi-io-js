#!/usr/bin/env node
/**
 * Test: HTTP class — instantiation, config, update, methods
 * Uses dist/node.mjs and accesses HTTP through Connection.http
 */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Test: HTTP Class')
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

const conn = new Connection({ token: 'abc' })
const http = conn.http

// ── Instantiation ───────────────────────────────────────────────────────────

assert(http !== undefined, 'HTTP instance accessible via conn.http')
assert(http.config !== undefined, 'http.config exists')
assert(http.config.baseURL === 'https://flespi.io', 'baseURL set from default server')
assert(http.config.headers.Authorization === 'FlespiToken abc', 'Authorization header set')

// ── update('token') ─────────────────────────────────────────────────────────

http.update('token', 'FlespiToken xyz')
assert(http.config.token === 'FlespiToken xyz', 'update token — config.token updated')
assert(http.config.headers.Authorization === 'FlespiToken xyz', 'update token — Authorization updated')

// ── update('config') ────────────────────────────────────────────────────────

http.update('config', { server: 'https://new.flespi.io', token: 'FlespiToken new' })
assert(http.config.baseURL === 'https://new.flespi.io', 'update config — baseURL updated')
assert(http.config.headers.Authorization === 'FlespiToken new', 'update config — token updated via config')

// ── update('config') flespiApp ──────────────────────────────────────────────

http.update('config', { flespiApp: 'myApp' })
assert(http.config.headers['x-flespi-app'] === 'myApp', 'update config — flespiApp added')

http.update('config', { flespiApp: undefined })
assert(!http.config.headers['x-flespi-app'], 'update config — flespiApp removed')

// ── Methods exist ───────────────────────────────────────────────────────────

assert(typeof http.get === 'function', 'get method exists')
assert(typeof http.post === 'function', 'post method exists')
assert(typeof http.put === 'function', 'put method exists')
assert(typeof http.patch === 'function', 'patch method exists')
assert(typeof http.delete === 'function', 'delete method exists')
assert(typeof http.request === 'function', 'request method exists')

// ── external is axios ───────────────────────────────────────────────────────

assert(typeof http.external === 'function', 'external (axios) is a function')
assert(typeof http.external.get === 'function', 'external.get exists')
assert(typeof http.external.post === 'function', 'external.post exists')

// ── Separate instance with flespiApp ────────────────────────────────────────

const conn2 = new Connection({
  token: 'test',
  httpConfig: { server: 'https://flespi.io', flespiApp: 'testApp' }
})
assert(conn2.http.config.headers['x-flespi-app'] === 'testApp', 'flespiApp header set from constructor')

// ── Separate instance with port ─────────────────────────────────────────────

const conn3 = new Connection({
  token: 'test',
  httpConfig: { server: 'https://flespi.io', port: 8080 }
})
assert(conn3.http.config.baseURL === 'https://flespi.io:8080', 'baseURL includes port')

// ── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n=================`)
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log(`=================\n`)

if (failed > 0) { process.exit(1) } else { console.log('✓ All HTTP class tests passed!\n'); process.exit(0) }

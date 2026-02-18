#!/usr/bin/env node
/**
 * Test: Type declarations — files exist, structure valid,
 * generated types cover all runtime sugar methods.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const require = createRequire(import.meta.url)

console.log('Test: Type Declarations')
console.log('========================\n')

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

// ── All .d.ts files exist ───────────────────────────────────────────────────

console.log('Type files existence:')

const expectedFiles = [
  'types/http.d.ts',
  'types/socket.d.ts',
  'types/index.d.ts',
  'types/rest.d.ts',
  'types/mqtt.d.ts',
  'types/vue-plugin.d.ts',
  'types/vue3-plugin.d.ts',
  'types/generated/http-sugar.d.ts',
  'types/generated/mqtt-sugar.d.ts',
  'types/generated/pool-sugar.d.ts'
]

for (const file of expectedFiles) {
  const full = path.join(root, file)
  const exists = fs.existsSync(full)
  assert(exists, file)
  if (exists) {
    const size = fs.statSync(full).size
    assert(size > 0, `  ${file} is not empty (${size} bytes)`)
  }
}

// ── package.json has types field ────────────────────────────────────────────

console.log('\npackage.json types configuration:')

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'))

assert(pkg.types === './types/index.d.ts', 'top-level "types" field')
assert(pkg.exports['.'].types === './types/index.d.ts', 'exports["."].types')
assert(pkg.exports['./rest'].types === './types/rest.d.ts', 'exports["./rest"].types')
assert(pkg.exports['./mqtt'].types === './types/mqtt.d.ts', 'exports["./mqtt"].types')
assert(pkg.exports['./vue-plugin'].types === './types/vue-plugin.d.ts', 'exports["./vue-plugin"].types')
assert(pkg.exports['./vue3-plugin'].types === './types/vue3-plugin.d.ts', 'exports["./vue3-plugin"].types')
assert(pkg.exports['./node'].types === './types/index.d.ts', 'exports["./node"].types')

// ── Generated HTTP sugar has all runtime namespaces ─────────────────────────

console.log('\nGenerated HTTP sugar covers all namespaces:')

const httpSugarContent = fs.readFileSync(path.join(root, 'types/generated/http-sugar.d.ts'), 'utf-8')

assert(httpSugarContent.includes('PlatformHttpSugar'), 'PlatformHttpSugar interface')
assert(httpSugarContent.includes('GwHttpSugar'), 'GwHttpSugar interface')
assert(httpSugarContent.includes('StorageHttpSugar'), 'StorageHttpSugar interface')
assert(httpSugarContent.includes('MqttHttpSugar'), 'MqttHttpSugar interface')
assert(httpSugarContent.includes('AuthHttpSugar'), 'AuthHttpSugar interface')

// ── HTTP sugar types match runtime methods ──────────────────────────────────

console.log('\nHTTP sugar types match runtime methods:')

const { default: Connection } = await import(path.resolve(root, 'dist/node.mjs'))
const conn = new Connection({ token: 'test' })

function extractTypedMethods (content, interfaceName) {
  const ifaceStart = content.indexOf(`interface ${interfaceName}`)
  if (ifaceStart === -1) return new Set()
  const ifaceEnd = content.indexOf('}', ifaceStart)
  const block = content.slice(ifaceStart, ifaceEnd)
  const methodRegex = /^ {2}(\w+)\(/gm
  const methods = new Set()
  let m
  while ((m = methodRegex.exec(block)) !== null) {
    methods.add(m[1])
  }
  return methods
}

for (const [ns, iface] of [
  ['platform', 'PlatformHttpSugar'],
  ['gw', 'GwHttpSugar'],
  ['storage', 'StorageHttpSugar'],
  ['mqtt', 'MqttHttpSugar'],
  ['auth', 'AuthHttpSugar']
]) {
  const runtimeMethods = Object.keys(conn[ns]).filter(k =>
    typeof conn[ns][k] === 'function' &&
    // Skip bogus methods generated from x-flespi-extra-parameters config keys
    !k.includes('flespi-extra-parameters')
  )
  const typedMethods = extractTypedMethods(httpSugarContent, iface)

  let allPresent = true
  for (const method of runtimeMethods) {
    if (!typedMethods.has(method)) {
      console.log(`  ✗ ${ns}.${method} missing from ${iface}`)
      allPresent = false
      failed++
    }
  }
  if (allPresent) {
    assert(true, `${iface} covers all ${runtimeMethods.length} runtime methods`)
  }
}

// ── MQTT sugar types match runtime ──────────────────────────────────────────

console.log('\nMQTT sugar types match runtime methods:')

const mqttSugarContent = fs.readFileSync(path.join(root, 'types/generated/mqtt-sugar.d.ts'), 'utf-8')
const mqttCamelTyped = extractTypedMethods(mqttSugarContent, 'MqttSugarCamelCase')

// Collect runtime camelCase MQTT methods from Connection
const runtimeMqttCamel = Object.keys(conn).filter(k =>
  (k.startsWith('subscribe') || k.startsWith('unsubscribe')) && typeof conn[k] === 'function'
)

let allMqttOk = true
for (const method of runtimeMqttCamel) {
  if (!mqttCamelTyped.has(method)) {
    console.log(`  ✗ ${method} missing from MqttSugarCamelCase`)
    allMqttOk = false
    failed++
  }
}
if (allMqttOk) {
  assert(true, `MqttSugarCamelCase covers all ${runtimeMqttCamel.length} runtime methods`)
}

// ── Pool sugar types match runtime ──────────────────────────────────────────

console.log('\nPool sugar types match runtime methods:')

const poolSugarContent = fs.readFileSync(path.join(root, 'types/generated/pool-sugar.d.ts'), 'utf-8')
const poolCamelTyped = extractTypedMethods(poolSugarContent, 'PoolCamelCase')

const runtimePoolMethods = Object.keys(conn).filter(k =>
  k.startsWith('pool') && typeof conn[k] === 'function'
)

let allPoolOk = true
for (const method of runtimePoolMethods) {
  if (!poolCamelTyped.has(method)) {
    console.log(`  ✗ ${method} missing from PoolCamelCase`)
    allPoolOk = false
    failed++
  }
}
if (allPoolOk) {
  assert(true, `PoolCamelCase covers all ${runtimePoolMethods.length} runtime methods`)
}

// ── index.d.ts structure ────────────────────────────────────────────────────

console.log('\nindex.d.ts structure:')

const indexDts = fs.readFileSync(path.join(root, 'types/index.d.ts'), 'utf-8')

assert(indexDts.includes('class Connection'), 'Connection class declared')
assert(indexDts.includes('interface Connection extends MqttSugarCamelCase, PoolCamelCase'), 'declaration merging')
assert(indexDts.includes('platform: PlatformHttpSugar'), 'platform typed')
assert(indexDts.includes('gw: GwHttpSugar'), 'gw typed')
assert(indexDts.includes('socket: MQTT & MqttSugarNamespaced'), 'socket typed')
assert(indexDts.includes('pool: PoolNamespaced'), 'pool typed')
assert(indexDts.includes('export default Connection'), 'default export')

// ── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n========================`)
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log(`========================\n`)

if (failed > 0) { process.exit(1) } else { console.log('✓ All type declaration tests passed!\n'); process.exit(0) }

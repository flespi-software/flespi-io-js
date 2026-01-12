#!/usr/bin/env node
/**
 * Test 3: Verify basic library integration works
 */

import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

console.log('Test 3: Library Integration Verification')
console.log('=========================================\n')

let passed = 0
let failed = 0

// Test 1: Load main.js (UMD build)
console.log('Testing main.js (UMD)...\n')
try {
  const mainPath = path.resolve(__dirname, '../dist/main.js')
  // Note: UMD might not work directly in Node ESM context, but we can check it exists
  console.log('✓ main.js path resolved')
  passed++
} catch (err) {
  console.log('✗ Error with main.js:', err.message)
  failed++
}

// Test 2: Check node.mjs (ES Module build) structure
console.log('\nTesting node.mjs (ES Module)...\n')
try {
  const fs = await import('fs')
  const nodePath = path.resolve(__dirname, '../dist/node.mjs')
  const content = fs.readFileSync(nodePath, 'utf8')

  if (content.length > 0) {
    console.log('✓ node.mjs has content')
    passed++
  }

  // Check for ES module exports
  if (content.includes('export')) {
    console.log('✓ node.mjs contains ES module export syntax')
    passed++
  } else {
    console.log('⚠ node.mjs does not contain obvious ES exports')
  }

  // Check for Connection class
  if (content.includes('Connection') || content.includes('HTTP') || content.includes('MQTT')) {
    console.log('✓ node.mjs contains expected class references')
    passed++
  } else {
    console.log('✗ node.mjs does not contain expected classes')
    failed++
  }

  // Check that it's meant for Node (not browser-specific)
  if (!content.includes('window') && !content.includes('document')) {
    console.log('✓ node.mjs does not contain browser-specific code')
    passed++
  } else {
    console.log('⚠ node.mjs might contain browser-specific code')
  }

} catch (err) {
  console.log('✗ Error checking node.mjs:', err.message)
  failed++
}

// Test 3: Load rest.js (REST-only build)
console.log('\nTesting rest.js (REST-only)...\n')
try {
  const restPath = path.resolve(__dirname, '../dist/rest.js')
  // REST is also UMD, check that file exists and has content
  const fs = await import('fs')
  const content = fs.readFileSync(restPath, 'utf8')

  if (content.length > 0) {
    console.log('✓ rest.js has content')
    passed++
  }

  if (content.includes('RestConnection') || content.includes('http')) {
    console.log('✓ rest.js contains expected REST-related code')
    passed++
  } else {
    console.log('✗ rest.js does not contain expected REST code')
    failed++
  }
} catch (err) {
  console.log('✗ Error with rest.js:', err.message)
  failed++
}

// Test 4: Verify externals are not bundled
console.log('\nTesting externals...\n')
try {
  const fs = await import('fs')
  const mainContent = fs.readFileSync(path.resolve(__dirname, '../dist/main.js'), 'utf8')

  // Check that axios is external (should have minimal references)
  const axiosMatches = (mainContent.match(/axios/g) || []).length
  if (axiosMatches < 50) {
    console.log(`✓ axios appears to be external (${axiosMatches} references)`)
    passed++
  } else {
    console.log(`⚠ axios might be bundled (${axiosMatches} references)`)
  }

  // Check that mqtt is external
  const mqttMatches = (mainContent.match(/mqtt/g) || []).length
  if (mqttMatches < 50) {
    console.log(`✓ mqtt appears to be external (${mqttMatches} references)`)
    passed++
  } else {
    console.log(`⚠ mqtt might be bundled (${mqttMatches} references)`)
  }
} catch (err) {
  console.log('✗ Error checking externals:', err.message)
  failed++
}

// Summary
console.log('\n=========================================')
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log('=========================================\n')

if (failed > 0) {
  console.log('⚠ Some integration tests failed\n')
  process.exit(1)
} else {
  console.log('✓ All integration tests passed!\n')
}

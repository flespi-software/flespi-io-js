#!/usr/bin/env node
/**
 * Test Runner - Runs all tests in sequence
 */

import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tests = [
  'test-build-outputs.js',
  'test-config-generation.js',
  'test-library-integration.js',
  'test-http-class.js',
  'test-mqtt-class.js',
  'test-connection-class.js',
  'test-rest-connection.js',
  'test-mqtt-connection.js',
  'test-http-sugar.js',
  'test-mqtt-sugar.js',
  'test-vue-plugins.js',
  'test-type-declarations.js'
]

console.log('Running All Tests')
console.log('=================\n')

let totalPassed = 0
let totalFailed = 0

tests.forEach((test, index) => {
  console.log(`\n[${index + 1}/${tests.length}] Running ${test}...\n`)

  try {
    execSync(`node ${path.join(__dirname, test)}`, {
      stdio: 'inherit',
      cwd: __dirname
    })
    totalPassed++
  } catch (err) {
    totalFailed++
    console.log(`\n✗ ${test} failed\n`)
  }
})

console.log('\n=================================')
console.log('Test Suite Summary')
console.log('=================================')
console.log(`Total test files: ${tests.length}`)
console.log(`Passed: ${totalPassed}`)
console.log(`Failed: ${totalFailed}`)
console.log('=================================\n')

if (totalFailed > 0) {
  process.exit(1)
} else {
  console.log('✓ All test suites passed!\n')
}

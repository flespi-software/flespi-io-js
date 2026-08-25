#!/usr/bin/env node
/**
 * Test 2: Verify API config generation works correctly
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Test 2: Config Generation Verification')
console.log('=======================================\n')

const configPath = path.resolve(__dirname, '../src/configs.json')

let passed = 0
let failed = 0

// Check if configs.json exists
console.log('Checking configs.json...\n')

if (!fs.existsSync(configPath)) {
  console.log('✗ configs.json does not exist')
  console.log('  Run: npm run fetch-configs\n')
  process.exit(1)
}

console.log('✓ configs.json exists')
passed++

// Parse and validate configs.json
try {
  const configContent = fs.readFileSync(configPath, 'utf8')
  const configs = JSON.parse(configContent)

  console.log('✓ configs.json is valid JSON')
  passed++

  // Should be an array of 6 API configs
  if (Array.isArray(configs)) {
    console.log(`✓ configs is an array (${configs.length} items)`)
    passed++

    if (configs.length === 6) {
      console.log('✓ Contains 6 API configurations (platform, gw, storage, mqtt, auth, ai)')
      passed++
    } else {
      console.log(`✗ Expected 6 configs, got ${configs.length}`)
      failed++
    }
  } else {
    console.log('✗ configs is not an array')
    failed++
  }

  // Check structure of first config
  if (configs.length > 0) {
    const firstConfig = configs[0]

    if (firstConfig.basePath) {
      console.log(`✓ First config has basePath: ${firstConfig.basePath}`)
      passed++
    } else {
      console.log('✗ First config missing basePath')
      failed++
    }

    if (firstConfig.paths && typeof firstConfig.paths === 'object') {
      const pathCount = Object.keys(firstConfig.paths).length
      console.log(`✓ First config has paths object (${pathCount} endpoints)`)
      passed++
    } else {
      console.log('✗ First config missing paths object')
      failed++
    }
  }

  // Check if configs contain expected API namespaces
  const basePaths = configs.map(c => c.basePath)
  const expectedPaths = ['/platform', '/gw', '/storage', '/mqtt', '/auth', '/ai']

  console.log('\nChecking API namespaces...\n')
  expectedPaths.forEach(expected => {
    if (basePaths.includes(expected)) {
      console.log(`✓ Found ${expected} API`)
      passed++
    } else {
      console.log(`✗ Missing ${expected} API`)
      failed++
    }
  })

} catch (err) {
  console.log('✗ Error parsing configs.json:', err.message)
  failed++
}

// Summary
console.log('\n=======================================')
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log('=======================================\n')

if (failed > 0) {
  process.exit(1)
} else {
  console.log('✓ All config generation tests passed!\n')
}

#!/usr/bin/env node
/**
 * Test 1: Verify all build outputs exist and have correct format
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Test 1: Build Outputs Verification')
console.log('====================================\n')

const distDir = path.resolve(__dirname, '../dist')
const expectedFiles = [
  'main.js',
  'module.js',
  'vue-plugin.js',
  'vue3-plugin.js',
  'node.mjs',
  'rest.js',
  'mqtt.js'
]

let passed = 0
let failed = 0

// Check if all expected files exist
console.log('Checking build outputs...\n')

expectedFiles.forEach(file => {
  const filePath = path.join(distDir, file)
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath)
    const sizeKB = (stats.size / 1024).toFixed(2)
    console.log(`✓ ${file} exists (${sizeKB} KB)`)
    passed++

    // Verify file is not empty
    if (stats.size === 0) {
      console.log(`  ✗ WARNING: ${file} is empty!`)
      failed++
    }
  } else {
    console.log(`✗ ${file} NOT FOUND`)
    failed++
  }
})

// Check UMD format in main.js
console.log('\nChecking UMD format...\n')
try {
  const mainContent = fs.readFileSync(path.join(distDir, 'main.js'), 'utf8')
  if (mainContent.includes('flespiIO') || mainContent.includes('exports')) {
    console.log('✓ main.js contains expected library exports')
    passed++
  } else {
    console.log('✗ main.js does not contain expected exports')
    failed++
  }
} catch (err) {
  console.log('✗ Could not read main.js:', err.message)
  failed++
}

// Check ESM format in vue3-plugin.js
console.log('\nChecking ESM format...\n')
try {
  const vue3Content = fs.readFileSync(path.join(distDir, 'vue3-plugin.js'), 'utf8')
  if (vue3Content.includes('export') || vue3Content.includes('import')) {
    console.log('✓ vue3-plugin.js contains ESM syntax')
    passed++
  } else {
    console.log('✗ vue3-plugin.js does not contain ESM syntax')
    failed++
  }
} catch (err) {
  console.log('✗ Could not read vue3-plugin.js:', err.message)
  failed++
}

// Summary
console.log('\n====================================')
console.log(`Tests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)
console.log('====================================\n')

if (failed > 0) {
  process.exit(1)
} else {
  console.log('✓ All build output tests passed!\n')
}

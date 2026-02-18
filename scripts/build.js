import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Step 1: Fetch configs
console.log('============================================')
console.log('Fetching API configurations...')
console.log('============================================\n')

try {
  execSync('node scripts/fetch-configs.js', { stdio: 'inherit', cwd: path.resolve(__dirname, '..') })
} catch (error) {
  console.error('\n✗ Failed to fetch configs')
  process.exit(1)
}

// Step 2: Generate type declarations
console.log('\n============================================')
console.log('Generating type declarations...')
console.log('============================================\n')

try {
  execSync('node scripts/generate-types.js', { stdio: 'inherit', cwd: path.resolve(__dirname, '..') })
  console.log('✓ Type declarations generated successfully\n')
} catch (error) {
  console.error('\n✗ Failed to generate type declarations')
  process.exit(1)
}

// Step 3: Build all targets
const targets = [
  'main',
  'module',
  'vue',
  'vue3',
  'node',
  'rest',
  'mqtt',
  'mqtt-worker'
]

console.log('\n============================================')
console.log('Building all targets...')
console.log('============================================\n')

let buildErrors = []

targets.forEach((target, index) => {
  console.log(`[${index + 1}/${targets.length}] Building ${target}...`)
  try {
    execSync(
      `vite build --config vite.config.${target}.js`,
      { stdio: 'inherit', cwd: path.resolve(__dirname, '..') }
    )
    console.log(`✓ ${target} built successfully\n`)
  } catch (error) {
    console.error(`✗ Failed to build ${target}\n`)
    buildErrors.push(target)
  }
})

console.log('============================================')
if (buildErrors.length === 0) {
  console.log('✓ All builds completed successfully!')
} else {
  console.log(`✗ ${buildErrors.length} build(s) failed: ${buildErrors.join(', ')}`)
  process.exit(1)
}
console.log('============================================')

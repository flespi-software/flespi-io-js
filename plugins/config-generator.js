import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function configGenerator() {
  return {
    name: 'config-generator',
    async buildStart() {
      const configPath = path.resolve(__dirname, '../src/configs.json')
      if (!fs.existsSync(configPath)) {
        console.log('\n⚠ configs.json not found, fetching API configs...\n')
        try {
          execSync('node scripts/fetch-configs.js', {
            stdio: 'inherit',
            cwd: path.resolve(__dirname, '..')
          })
        } catch (error) {
          console.error('\n✗ Failed to fetch configs during dev server startup')
          throw error
        }
      }
    }
  }
}

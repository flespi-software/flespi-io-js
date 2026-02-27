import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* getting configs from server with retry logic */
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, { timeout: 10000 })
      return response.data
    } catch (err) {
      if (i === retries - 1) throw err
      console.log(`Retry ${i + 1}/${retries} for ${url}`)
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))
    }
  }
}

async function getConfigs() {
  console.log('Fetching API configurations from flespi.io...')
  return Promise.all([
    fetchWithRetry('https://flespi.io/platform/api.json').then(data => { console.log('✓ Platform API'); return data }),
    fetchWithRetry('https://flespi.io/gw/api.json').then(data => { console.log('✓ Gateway API'); return data }),
    fetchWithRetry('https://flespi.io/storage/api.json').then(data => { console.log('✓ Storage API'); return data }),
    fetchWithRetry('https://flespi.io/mqtt/api.json').then(data => { console.log('✓ MQTT API'); return data }),
    fetchWithRetry('https://flespi.io/auth/api.json').then(data => { console.log('✓ Auth API'); return data }),
    fetchWithRetry('https://flespi.io/ai/api.json').then(data => { console.log('✓ AI API'); return data })
  ])
}

/* generate config by config from flespi */
function generate(config) {
  /* recursive resolve references by config */
  function refResolver(ref) {
    const parts = ref.split('/').slice(1)
    const result = parts.reduce((result, part) => { return result[part] }, config)
    if (result.$ref) { refResolver(result.$ref) } else { return result }
  }
  /* getting modified parameters by array of parameters from config */
  function getParams(parameters) {
    return parameters
      ? parameters.reduce((result, param) => {
        if (param.$ref) {
          const resolved = refResolver(param.$ref)
          result.push({ name: resolved.name, in: resolved.in })
        } else {
          result.push({ name: param.name, in: param.in })
        }
        return result
      }, [])
      : []
  }

  var result = { basePath: config.basePath, paths: {} }

  Object.keys(config.paths).forEach((path) => {
    var configByPath = config.paths[path],
      methods = Object.keys(configByPath).filter((method) => method !== 'parameters')

    result.paths[path] = {}
    if (configByPath.parameters) {
      result.paths[path].parameters = getParams(configByPath.parameters)
    }
    methods.forEach((method) => {
      result.paths[path][method] = {}
      if (config.paths[path][method].parameters) {
        result.paths[path][method].parameters = getParams(config.paths[path][method].parameters)
      }
    })
  })

  return result
}

async function main() {
  try {
    const configs = await getConfigs()
    const processedConfigs = configs.map(config => generate(config))

    const outputPath = path.resolve(__dirname, '../src/configs.json')
    fs.writeFileSync(outputPath, JSON.stringify(processedConfigs), 'utf8')

    console.log('\n✓ API configs generated successfully')
    console.log(`  Output: ${outputPath}`)
  } catch (error) {
    console.error('\n✗ Failed to fetch API configs:', error.message)
    process.exit(1)
  }
}

main()

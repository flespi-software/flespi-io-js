import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const srcDir = path.resolve(__dirname, '..', 'src')
const outDir = path.resolve(__dirname, '..', 'types', 'generated')

// ─── HTTP sugar ───────────────────────────────────────────────────────────────

function generateHttpSugar () {
  const configsPath = path.join(srcDir, 'configs.json')
  if (!existsSync(configsPath)) {
    console.warn('configs.json not found – skipping HTTP sugar generation')
    return
  }
  const configs = JSON.parse(readFileSync(configsPath, 'utf-8'))

  const interfaceNames = {
    platform: 'PlatformHttpSugar',
    gw: 'GwHttpSugar',
    storage: 'StorageHttpSugar',
    mqtt: 'MqttHttpSugar',
    auth: 'AuthHttpSugar',
    ai: 'AiHttpSugar'
  }

  const lines = [
    "import { AxiosResponse, AxiosRequestConfig } from 'axios'",
    ''
  ]

  // camelCase interfaces (the namespaced ones used as conn.platform.getXxx)
  const camelCaseInterfaces = {}

  for (const config of configs) {
    const baseName = config.basePath.slice(1) // e.g. "platform"
    const ifName = interfaceNames[baseName] || `${baseName[0].toUpperCase() + baseName.slice(1)}HttpSugar`
    const methods = []

    for (const [urlPath, pathDef] of Object.entries(config.paths)) {
      const httpMethods = Object.keys(pathDef).filter(m => m !== 'parameters' && m !== 'x-flespi-extra-parameters')
      // Parse path into params and parts (same algorithm as flespi-http-io/index.js:21-29)
      const parsedPath = urlPath.split('/').reduce((result, part) => {
        if (part.match(/{([\w.-]+)}/g)) {
          result.params.push(part)
        } else if (part) {
          result.parts.push(part.replace(/[.-]\w/g, (match) => match[1].toUpperCase()))
        }
        return result
      }, { params: [], parts: [] })

      for (const method of httpMethods) {
        const methodDef = pathDef[method]
        // Merge path-level and method-level parameters
        const allParams = [
          ...(pathDef.parameters || []),
          ...(methodDef.parameters || [])
        ]

        // Resolve parameter locations (skip header params, collect path/query/body/formData)
        const paramsByMethod = {}
        for (const param of allParams) {
          if (param.$ref) continue // skip refs in type gen
          if (param.in === 'header') continue // headers are not positional args
          paramsByMethod[param.name] = param.in
        }

        // Build ordered local params list (same as runtime: path params, query, body, formData_*)
        const localParams = [...parsedPath.params]
        if (Object.values(paramsByMethod).includes('query')) localParams.push('query')
        if (Object.values(paramsByMethod).includes('body')) localParams.push('body')
        if (Object.values(paramsByMethod).includes('formData')) {
          const formDataParams = Object.keys(paramsByMethod).filter(n => paramsByMethod[n] === 'formData')
          formDataParams.forEach(n => localParams.push(`formData_${n}`))
        }

        // Build TypeScript argument list
        const tsArgs = localParams.map(p => {
          if (p.match(/{([\w.-]+)}/)) return `${sanitizeParamName(p)}: string | number`
          if (p === 'query') return 'query?: Record<string, any>'
          if (p === 'body') return 'data?: any'
          if (p.startsWith('formData_')) return `${sanitizeParamName(p)}?: any`
          return `${sanitizeParamName(p)}: string | number`
        })
        tsArgs.push('options?: AxiosRequestConfig')

        // Method name: same algorithm as flespi-http-io/index.js:103-106
        const nameOfMethod = parsedPath.parts.reduce((result, part) => {
          result += part[0].toUpperCase() + part.slice(1).replace(/-\w/g, (match) => match[1].toUpperCase())
          return result
        }, `${method}`)

        methods.push(`  ${nameOfMethod}(${tsArgs.join(', ')}): Promise<AxiosResponse>`)
      }
    }

    camelCaseInterfaces[baseName] = { ifName, methods }
  }

  // Emit interfaces
  for (const [, { ifName, methods }] of Object.entries(camelCaseInterfaces)) {
    lines.push(`export interface ${ifName} {`)
    // deduplicate method names (keep all overloads)
    methods.forEach(m => lines.push(m))
    lines.push('}')
    lines.push('')
  }

  writeFileSync(path.join(outDir, 'http-sugar.d.ts'), lines.join('\n'))
  console.log('Generated types/generated/http-sugar.d.ts')
}

function sanitizeParamName (name) {
  // strip braces, replace dots/dashes with camelCase
  let clean = name.replace(/[{}]/g, '')
  clean = clean.replace(/[.-]\w/g, (match) => match[1].toUpperCase())
  // if starts with a digit, prefix
  if (/^\d/.test(clean)) clean = `_${clean}`
  return clean
}

// ─── MQTT sugar ───────────────────────────────────────────────────────────────

function generateMqttSugar () {
  const configPath = path.join(srcDir, 'flespi-mqtt-io', 'config.json')
  if (!existsSync(configPath)) {
    console.warn('flespi-mqtt-io/config.json not found – skipping MQTT sugar generation')
    return
  }
  const config = JSON.parse(readFileSync(configPath, 'utf-8'))

  const lines = [
    "import { MqttMessageHandler, SubscribeOptions } from '../socket'",
    ''
  ]

  // ── Namespaced interface (recursive) ──
  lines.push('export interface MqttSugarNamespaced {')
  emitNamespacedMqtt(config, lines, 1)
  lines.push('}')
  lines.push('')

  // ── CamelCase interface ──
  lines.push('export interface MqttSugarCamelCase {')
  const camelMethods = []
  collectCamelCaseMqtt(config, '', camelMethods)
  camelMethods.forEach(m => lines.push(m))
  lines.push('}')
  lines.push('')

  writeFileSync(path.join(outDir, 'mqtt-sugar.d.ts'), lines.join('\n'))
  console.log('Generated types/generated/mqtt-sugar.d.ts')
}

function emitNamespacedMqtt (config, lines, depth) {
  const indent = '  '.repeat(depth)
  for (const [entity, entityConfig] of Object.entries(config)) {
    lines.push(`${indent}${entity}: {`)
    if (entityConfig.methods && entityConfig.methods.length) {
      for (const method of entityConfig.methods) {
        const params = method.params || []
        if (method.name === 'subscribe') {
          const tsArgs = params.map(p => `${sanitizeParamName(p)}: string | number`)
          tsArgs.push('handler: MqttMessageHandler')
          tsArgs.push('options?: SubscribeOptions')
          lines.push(`${indent}  subscribe(${tsArgs.join(', ')}): Promise<Record<number, any>>`)
        } else if (method.name === 'unsubscribe') {
          const tsArgs = params.map(p => `${sanitizeParamName(p)}: string | number`)
          tsArgs.push('subscriptionId: number')
          tsArgs.push('options?: any')
          lines.push(`${indent}  unsubscribe(${tsArgs.join(', ')}): Promise<any>`)
        }
      }
    }
    if (entityConfig.children) {
      emitNamespacedMqtt(entityConfig.children, lines, depth + 1)
    }
    lines.push(`${indent}}`)
  }
}

function collectCamelCaseMqtt (config, parentPrefix, result) {
  for (const [entity, entityConfig] of Object.entries(config)) {
    const capitalEntity = entity[0].toUpperCase() + entity.slice(1)
    if (entityConfig.methods && entityConfig.methods.length) {
      for (const method of entityConfig.methods) {
        const methodName = `${method.name}${parentPrefix}${capitalEntity}`
        const params = method.params || []
        if (method.name === 'subscribe') {
          const tsArgs = params.map(p => `${sanitizeParamName(p)}: string | number`)
          tsArgs.push('handler: MqttMessageHandler')
          tsArgs.push('options?: SubscribeOptions')
          result.push(`  ${methodName}(${tsArgs.join(', ')}): Promise<Record<number, any>>`)
        } else if (method.name === 'unsubscribe') {
          const tsArgs = params.map(p => `${sanitizeParamName(p)}: string | number`)
          tsArgs.push('subscriptionId: number')
          tsArgs.push('options?: any')
          result.push(`  ${methodName}(${tsArgs.join(', ')}): Promise<any>`)
        }
      }
    }
    if (entityConfig.children) {
      collectCamelCaseMqtt(entityConfig.children, `${parentPrefix}${capitalEntity}`, result)
    }
  }
}

// ─── Pool sugar ───────────────────────────────────────────────────────────────

function generatePoolSugar () {
  const configPath = path.join(srcDir, 'flespi-pool-io', 'config.json')
  if (!existsSync(configPath)) {
    console.warn('flespi-pool-io/config.json not found – skipping Pool sugar generation')
    return
  }
  const config = JSON.parse(readFileSync(configPath, 'utf-8'))

  const lines = [
    "import { AxiosResponse } from 'axios'",
    '',
    'export type PoolGetHandler = (entities: AxiosResponse) => void',
    "export type PoolUpdateHandler = (eventType: 'created' | 'updated' | 'deleted', entity: any) => void",
    ''
  ]

  // ── Namespaced interface ──
  lines.push('export interface PoolNamespaced {')
  emitNamespacedPool(config, lines, 1)
  lines.push('}')
  lines.push('')

  // ── CamelCase interface ──
  lines.push('export interface PoolCamelCase {')
  const camelMethods = []
  collectCamelCasePool(config, '', camelMethods)
  camelMethods.forEach(m => lines.push(m))
  lines.push('}')
  lines.push('')

  writeFileSync(path.join(outDir, 'pool-sugar.d.ts'), lines.join('\n'))
  console.log('Generated types/generated/pool-sugar.d.ts')
}

function emitNamespacedPool (config, lines, depth) {
  const indent = '  '.repeat(depth)
  for (const [name, entityConfig] of Object.entries(config)) {
    if (entityConfig.origin) {
      lines.push(`${indent}${name}: {`)
      lines.push(`${indent}  (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>`)
      lines.push(`${indent}  stop(ids: string[]): void`)
      if (entityConfig.children) {
        emitNamespacedPool(entityConfig.children, lines, depth + 1)
      }
      lines.push(`${indent}}`)
    } else {
      lines.push(`${indent}${name}: {`)
      if (entityConfig.children) {
        emitNamespacedPool(entityConfig.children, lines, depth + 1)
      }
      lines.push(`${indent}}`)
    }
  }
}

function collectCamelCasePool (config, parentPrefix, result) {
  for (const [entity, entityConfig] of Object.entries(config)) {
    const capitalEntity = entity[0].toUpperCase() + entity.slice(1)
    if (entityConfig.origin) {
      const poolName = `pool${parentPrefix}${capitalEntity}`
      result.push(`  ${poolName}(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>`)
      result.push(`  ${poolName}Stop(ids: string[]): void`)
    }
    if (entityConfig.children) {
      collectCamelCasePool(entityConfig.children, `${parentPrefix}${capitalEntity}`, result)
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

generateHttpSugar()
generateMqttSugar()
generatePoolSugar()

/**
 * Helper to load UMD dist files in a "type":"module" project.
 * createRequire doesn't work because Node treats .js as ESM.
 * We evaluate the UMD code in an explicit CJS context.
 */

import { readFileSync } from 'fs'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cjsRequire = createRequire(path.resolve(__dirname, '../../package.json'))

export function loadUmd (distFile) {
  const absPath = path.resolve(__dirname, '../../dist', distFile)
  const code = readFileSync(absPath, 'utf-8')
  const mod = { exports: {} }
  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', code)
  fn(mod.exports, cjsRequire, mod, absPath, path.dirname(absPath))
  return mod.exports
}

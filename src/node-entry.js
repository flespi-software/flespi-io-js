// Node.js entry point with environment shims
// This file sets up browser-compatible globals for Node.js environment

// Shim browser globals that libraries might expect
if (typeof globalThis.navigator === 'undefined') {
  globalThis.navigator = { userAgent: 'node.js' }
}

if (typeof globalThis.window === 'undefined') {
  globalThis.window = globalThis
}

if (typeof globalThis.document === 'undefined') {
  globalThis.document = {}
}

// Import and export the main library
import Connection from './index.js'
export default Connection

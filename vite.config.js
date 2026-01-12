import { defineConfig } from 'vite'
import { resolve } from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import configGenerator from './plugins/config-generator.js'

// Dev server configuration
export default defineConfig({
  plugins: [
    configGenerator(), // Ensures configs.json exists
    nodePolyfills({
      include: ['buffer', 'process'],
      globals: {
        Buffer: true,
        process: true
      }
    })
  ],
  root: 'example/browser',
  server: {
    port: 8080,
    open: true
  },
  preview: {
    port: 4173,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'flespi-io-js': resolve(__dirname, 'dist/main.js')
    }
  },
  optimizeDeps: {
    include: ['mqtt']
  },
  build: {
    outDir: '../../dist-preview',
    emptyOutDir: true
  }
})

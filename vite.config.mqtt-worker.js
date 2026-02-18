import { defineConfig } from 'vite'
import { resolve } from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['buffer', 'process'],
      globals: {
        Buffer: true,
        process: true
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/mqtt-worker.js'),
      name: 'mqttWorker',
      formats: ['iife'],
      fileName: () => 'mqtt-worker.js'
    },
    rollupOptions: {
      /* No externals — everything must be bundled into the worker */
    },
    minify: 'terser',
    outDir: 'dist',
    emptyOutDir: false
  }
})

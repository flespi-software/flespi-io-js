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
      entry: resolve(__dirname, 'src/mqtt.js'),
      name: 'flespiIO',
      formats: ['umd'],
      fileName: () => 'mqtt.js'
    },
    rollupOptions: {
      external: ['mqtt', /^lodash/],
      output: {
        globals: {
          mqtt: 'mqtt',
          'lodash-es/merge': 'lodash-es/merge',
          'lodash-es/uniqueId': 'lodash-es/uniqueId'
        }
      }
    },
    minify: 'terser',
    outDir: 'dist',
    emptyOutDir: false
  }
})

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
      entry: resolve(__dirname, 'src/vue-plugin.js'),
      name: 'flespiIO',
      formats: ['umd'],
      fileName: () => 'vue-plugin.js'
    },
    rollupOptions: {
      external: ['axios', 'mqtt', 'form-data', /^lodash/],
      output: {
        globals: {
          axios: 'axios',
          mqtt: 'mqtt',
          'form-data': 'form-data',
          'lodash/merge': 'lodash/merge',
          'lodash/uniqueId': 'lodash/uniqueId'
        }
      }
    },
    minify: 'terser',
    outDir: 'dist',
    emptyOutDir: false
  }
})

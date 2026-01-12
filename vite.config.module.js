import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'flespiIO',
      formats: ['umd'],
      fileName: () => 'module.js'
    },
    rollupOptions: {
      external: ['axios', 'mqtt', 'form-data', /^lodash/],
      output: {
        globals: {
          axios: 'axios',
          mqtt: 'mqtt',
          'form-data': 'form-data',
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

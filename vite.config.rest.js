import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/rest.js'),
      name: 'flespiIO',
      formats: ['umd'],
      fileName: () => 'rest.js'
    },
    rollupOptions: {
      external: ['axios', 'form-data', /^lodash/],
      output: {
        globals: {
          axios: 'axios',
          'form-data': 'form-data',
          'lodash-es/merge': 'lodash-es/merge'
        }
      }
    },
    minify: 'terser',
    outDir: 'dist',
    emptyOutDir: false
  }
})

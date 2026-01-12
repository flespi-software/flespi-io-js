import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/vue3-plugin.js'),
      formats: ['es'],
      fileName: () => 'vue3-plugin.js'
    },
    rollupOptions: {
      external: ['axios', 'mqtt', 'form-data', /^lodash/],
      output: {
        preserveModules: false
      }
    },
    minify: 'terser',
    outDir: 'dist',
    emptyOutDir: false
  }
})

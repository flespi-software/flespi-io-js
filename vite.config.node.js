import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/node-entry.js'),
      name: 'flespiIO',
      formats: ['es'],
      fileName: () => 'node.mjs'
    },
    rollupOptions: {
      external: ['axios', 'mqtt', 'form-data'],
      output: {
        preserveModules: false
      }
    },
    minify: 'terser',
    outDir: 'dist',
    emptyOutDir: false,
    target: 'node14'
  }
})

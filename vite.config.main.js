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
      entry: resolve(__dirname, 'src/index.js'),
      name: 'flespiIO',
      formats: ['umd'],
      fileName: () => 'main.js'
    },
    rollupOptions: {
      external: ['axios', 'mqtt', /^lodash/],
      output: {
        globals: {
          axios: 'axios',
          mqtt: 'mqtt',
          'lodash/merge': 'lodash/merge',
          'lodash/uniqueId': 'lodash/uniqueId'
        },
        exports: 'default'
      }
    },
    minify: 'terser',
    outDir: 'dist',
    emptyOutDir: true
  }
})

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url))
    }
  },
  base: './',
  build: {
    assetsDir: 'assets',
    cssCodeSplit: true,
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'js/app.c533aa25.js',
        chunkFileNames: 'js/chunk-vendors.59af3576.js',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names ? assetInfo.names[0] : undefined;
          if (name && name.endsWith('.css')) {
            if (name.includes('vendor') || name.includes('node_modules')) {
              return 'css/chunk-vendors.58637379[extname]';
            }
            return 'css/app.df7ca14c[extname]';
          }
          return 'assets/[name][extname]';
        },
      }
    },
    minify: 'terser',
    terserOptions: {
      mangle: {
        reserved: ['app'],
      },
    }
  }
})

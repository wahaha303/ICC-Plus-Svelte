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
    outDir: 'dist/desktop',
    cssCodeSplit: true,
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'js/app.d3103a3b.js',
        chunkFileNames: 'js/chunk-vendors.ae283b72.js',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names ? assetInfo.names[0] : undefined;
          if (name && name.endsWith('.css')) {
            if (name.includes('vendor') || name.includes('node_modules')) {
              return 'css/chunk-vendors.ebaa52b5[extname]';
            }
            return 'css/app.e7eb167a[extname]';
          }
          return 'assets/[name][extname]';
        },
      }
    },
    minify: 'terser',
    terserOptions: {
      mangle:{
        reserved: ['app'],
      }
    }
  }
})

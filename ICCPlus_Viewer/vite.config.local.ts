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
  base: '',
  build: {
    assetsDir: 'assets',
    outDir: 'dist/local',
    emptyOutDir: false,
    cssCodeSplit: true,
    rollupOptions: {
      input: 'index.html',
      output: {
        format: 'iife',
        name: 'ICCPlus',
        entryFileNames: 'js/app.js',
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

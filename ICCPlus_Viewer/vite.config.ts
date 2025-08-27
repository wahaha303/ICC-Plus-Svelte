import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    legacy({
      targets: [
        'chrome >= 49',
        'firefox >= 45',
        'safari >= 10',
        'ios_saf >= 10',
        'edge >= 15',
        'android >= 7',
      ],
      additionalLegacyPolyfills: ['core-js/features/dom-collections'],
      modernTargets: [
        'chrome >= 64',
        'firefox >= 67',
        'safari >= 12',
        'ios_saf >= 12',
        'edge >= 79',
        'android >= 64'
      ],
      modernPolyfills: true,
    }),
  ],
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url))
    }
  },
  base: './',
  build: {
    assetsDir: 'assets',
    cssCodeSplit: true,
    manifest: true,
    rollupOptions: {
      input: fileURLToPath(new URL('./index.html', import.meta.url)),
      output: {
        entryFileNames: `js/app.[hash].js`,
        chunkFileNames: `js/chunk-vendors.[hash].js`,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names ? assetInfo.names[0] : undefined;
          if (name && name.endsWith('.css')) {
            if (name.includes('vendor') || name.includes('node_modules')) {
              return 'css/chunk-vendors.[hash][extname]';
            }
            return 'css/app.[hash][extname]';
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

import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true // Which could also be false if you want to force the Svelte 4 compiler/syntax
  },
}

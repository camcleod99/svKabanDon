import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess({
    typescript: {
      tsconfigFile: './tsconfig.json',
    },
  }),
}

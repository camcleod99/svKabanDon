import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // @ts-ignore: I don't even know what it's complaining about here
  preprocess: vitePreprocess({
    typescript: {
      tsconfigFile: './tsconfig.json',
    },
  }),
}

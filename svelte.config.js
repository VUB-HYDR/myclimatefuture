import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $config: 'src/config.ts',
      $store: 'src/store.ts',
      $utils: 'src/utils.ts',
      $styles: 'src/styles',
    },
    version: {
      name: process.env.npm_package_version,
    },
  },
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
};
export default config;

import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind(), vue()],
  buildOptions: {
    site: 'https://example.com/'
  }
});
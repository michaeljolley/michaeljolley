import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import tailwind from "@astrojs/tailwind";
import astroImagePlugin from "astro-imagetools/plugin";

// https://astro.build/config
export default defineConfig({
	integrations: [preact(), tailwind()],
	buildOptions: {
		site: 'https://example.com/'
	},
	vite: {
		plugins: [astroImagePlugin],
	},
});

import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from "@astrojs/tailwind";

import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkPrism from 'remark-prism';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	integrations: [preact(), sitemap(), tailwind({
		config: {
			applyAstroPreset: false
		}
	})],
	outDir: './dist/public',
	site: 'https://baldbeardedbuilder.com/',
	trailingSlash: 'always',
	markdown: {
		remarkPlugins: [
			remarkGfm, remarkSmartypants, remarkPrism
		],
		syntaxHighlight: 'prism'
	}
});

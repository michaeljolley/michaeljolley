import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkPrism from 'remark-prism';

export default defineConfig({
	integrations: [preact(), tailwind({
		config: {
			applyAstroPreset: false
		}
	}), sitemap()],
	site: 'https://baldbeardedbuilder.com/',
	trailingSlash: 'always',
	markdown: {
		remarkPlugins: [
			remarkGfm, remarkSmartypants, remarkPrism
		],
		syntaxHighlight: 'prism'
	}
});

import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
	site: 'https://baldbeardedbuilder.com',
	output: 'server',
	integrations: [preact(), tailwind({
		config: {
			applyAstroPreset: false
		}
	}), sitemap({
		changefreq: 'weekly',
		priority: 0.7,
		lastmod: new Date(),
		filter: page => page !== "https://baldbeardedbuilder.com/thanks"
	})],
	trailingSlash: 'always',
	markdown: {
		rehypePlugins: [rehypePrismPlus],
		remarkPlugins: [remarkGfm],
		syntaxHighlight: 'prism'
	},
	adapter: netlify()
});
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: 'https://baldbeardedbuilder.com',
  trailingSlash: "always",
  integrations: [
    preact(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => page !== "https://baldbeardedbuilder.com/thanks",
    }),
    tailwind()
  ],
});
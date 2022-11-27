import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";

export default defineConfig({
  site: process.env.DEPLOY_URL,
  integrations: [
    preact(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => page !== "https://baldbeardedbuilder.com/thanks",
    }),
    tailwind({
      config: {
        applyAstroPreset: false,
      },
    }),
  ],
  trailingSlash: "always",
});

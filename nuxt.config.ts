import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({

  buildModules: [
    "@nuxtjs/tailwindcss"
  ],

  modules: [
    "@nuxtjs/color-mode"
  ],

  colorMode: {
    classSuffix: "",
    fallback: "dark",
    storageKey: "bbb-color-mode",
  },
  tailwindcss: {
    cssPath: '~/assets/scss/main.scss',
    configPath: 'tailwind.config.cjs',
    jit: true,
    exposeConfig: true,
  }
});
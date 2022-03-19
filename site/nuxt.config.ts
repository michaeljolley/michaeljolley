import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({

  privateRuntimeConfig: {
    sanity: {
      token: process.env.SANITY_TOKEN,
    },
  },


  buildModules: [
    "@nuxtjs/tailwindcss"
  ],

  modules: [
    "@nuxtjs/color-mode",
    '@nuxtjs/sanity'
  ],

  colorMode: {
    classSuffix: "",
    fallback: "dark",
    storageKey: "bbb-color-mode",
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT,
    dataset: 'production',
  },
  tailwindcss: {
    cssPath: '~/assets/scss/main.scss',
    configPath: 'tailwind.config.cjs',
    jit: true,
    exposeConfig: true,
  }
});
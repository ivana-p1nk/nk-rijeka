import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-swiper'
  ],
  app: {
    head: {
      title: 'NK Rijeka',
      meta: [
        { name: 'description', content: 'Test' }
      ],
    }
  },
  css: ['~/assets/icomoon/style.css'] 
})
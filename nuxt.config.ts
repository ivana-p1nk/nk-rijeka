import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'NK Rijeka',
      meta: [
        { name: 'description', content: 'Test' }
      ],
    }
  },

  vite: {
    server: {
      allowedHosts: ['web.nkrijeka-app.test'],
      strictPort: false
    }
  },

  devServer: {
    //host: 'web.nkrijeka-app.test',
    host: 'localhost',
    port: 3000,
  },

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://backend.newshop.shop.nk-rijeka.hr/',
      url: process.env.API_URL || 'http://backend.newshop.shop.nk-rijeka.hr/api/v1',
    }
  },

  colorMode: {
    preference: 'light'
  },

  css: ['~/assets/icomoon/style.css'],

  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-swiper',
    '@pinia/nuxt',
    'nuxt-auth-sanctum',
  ],

  sanctum: {
    baseUrl: process.env.BASE_URL || 'http://backend.newshop.shop.nk-rijeka.hr/',
    redirect: {
      onAuthOnly: '/login',
      onLogin: '/profile'
    }
  },

  ssr: false,

  compatibilityDate: '2024-11-01',
})
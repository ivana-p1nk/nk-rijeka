import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'NK Rijeka',
            meta: [{ name: 'description', content: 'Test' }],
        },
    },

    devtools: { enabled: true },

    vite: {
        server: {
            allowedHosts: ['web.nkrijeka-app.test'],
            strictPort: false,
        },
    },
/*
    devServer: {
        host: 'web.nkrijeka-app.test',
        port: 3000,
    },
*/
    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL || 'https://backend.newshop.shop.nk-rijeka.hr',
            url: process.env.API_URL || 'https://backend.newshop.shop.nk-rijeka.hr/api/v1',
            siteUrl: 'https://newshop.shop.nk-rijeka.hr/',
            token: 'qwertyuiopasdfghjklzxcvbnm123456'
        },
    },

    colorMode: {
        preference: 'light',
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
        '@nuxt/devtools',
    ],

    sanctum: {
        baseUrl: process.env.BASE_URL || 'https://backend.newshop.shop.nk-rijeka.hr',
        redirect: {
            onAuthOnly: '/login',
            onLogin: '/profile',
        },
    },

    ssr: false,

    compatibilityDate: '2024-11-01',
})

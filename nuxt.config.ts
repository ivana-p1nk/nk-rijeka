import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'NK Rijeka',
            meta: [{ name: 'description', content: 'Test' }],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
            script: [
                {
                children: `(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "s5ywisqnf3");`,
                type: 'text/javascript'
                }
            ]
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
            baseUrl: process.env.BASE_URL || 'https://backend.newshop.shop.nk-rijeka.hr/',
            url: process.env.API_URL || 'https://backend.newshop.shop.nk-rijeka.hr/api/v1',
            siteUrl: 'https://newshop.shop.nk-rijeka.hr/',
            token: process.env.TOKEN || 'qwertyuiopasdfghjklzxcvbnm123456',
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
        baseUrl: process.env.BASE_URL || 'https://backend.newshop.shop.nk-rijeka.hr/',
        redirect: {
            onAuthOnly: '/login',
            onLogin: '/profile',
        },
    },

    ssr: false,

    compatibilityDate: '2024-11-01',
})

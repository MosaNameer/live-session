// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    modules: [
        '@enab/components',
        '@unocss/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/color-mode',
        'nuxt-monaco-editor',
        '@nuxt/content',
    ],

    colorMode: {
        // preference: 'dark',
        // fallback: 'dark'
        
        preference: 'system',
        fallback: 'light'
    },

    runtimeConfig: {
        public: {
            socketUrl: process.env.SOCKET_URL,
        }
    },

    nitro: {
        preset: 'node',
        storage: {
            'db': {
                driver: 'fs',
                base: './data/db'
            }
        }
    },

    content: {
        documentDriven: true
    }
})

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    modules: [
        '@enab/components',
        '@unocss/nuxt',
        '@vueuse/nuxt',
        'nuxt-monaco-editor',
        ['@pinia/nuxt', {
            autoImports: [
                'defineStore'
            ]
        }],
        '@nuxtjs/color-mode',
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
                base: './data'
            }
        }
    },

    content: {
        documentDriven: true
    }
})

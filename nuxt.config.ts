// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    ssr: false,

    modules: [
        'nuxt-icon',
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
        fallback: 'dark'
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
    },
    unocss: {
        autoImport: true,
        uno: true,
        attributify: {
            ignoreAttributes: ["label"]
        },
        typography: true,
        webFonts: {
            provider: "google",
            fonts: {
            sansSerif: ["Tajawal:300,400,500,700"]
            }
        },
    
        shortcuts: [],
        rules: [],

        preflights: [
            {
              getCSS: ({ theme }) => `
                    * {
                      padding: 0;
                      margin: 0;
                      font-family: ${theme["fontFamily"]["sansSerif"]};
                    }
                    body {
                        overflow: hidden;
                    }
                  `
            }
          ],
        theme: {
            colors: {
                "whitesec": {
                    "DEFAULT": "#d4b2f7"
                },
                "primary": {
                    "DEFAULT": "#0F0E17"
                },
                "primaryOp": {
                    "DEFAULT": "#0F0E17"
                },
                "secondary": {
                    "DEFAULT": "#2C2657"
                },
                "secondaryOp": {
                    "DEFAULT": "#2C2657"
                },
                "tertiary": {
                    "DEFAULT": "#120B16"
                },
                "tertiaryOp": {
                    "DEFAULT": "#120B16"
                },
                "success": {
                    "DEFAULT": "#43F580"
                },
                "successOp": {
                    "DEFAULT": "#43F580"
                },
                "error": {
                    "DEFAULT": "#E94B41"
                },
                "errorOp": {
                    "DEFAULT": "#E85147"
                },
                "warning": {
                    "DEFAULT": "#EFBB34"
                },
                "warningOp": {
                    "DEFAULT": "#FFD155"
                },
                "info": {
                    "DEFAULT": "#298DFE"
                },
                "infoOp": {
                    "DEFAULT": "#3393FF"
                }
            },
          }
      },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', 'nuxt-maplibre'],

  ssr: false,

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-15',

  nitro: {
    preset: 'cloudflare-pages',
    experimental: {
      database: true
    },
    database: {
      default: {
        connector: 'cloudflare-d1',
        options: {
          bindingName: 'DB'
        }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})

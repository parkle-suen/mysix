// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@nuxt/ui', 'nuxt-swiper'],

  ssr: true,

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    turso: {
      databaseUrl: '',
      authToken: ''
    }
  },
  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }

})

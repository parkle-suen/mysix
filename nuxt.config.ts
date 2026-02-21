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

  // 針對 SSR 的開發伺服器配置 (確保內網穿透請求能順利抵達 Nuxt)
  devServer: {
    host: '0.0.0.0' // 允許所有來源連線

  },

  compatibilityDate: '2026-01-15',

  vite: {
    server: {
      // 解決你看到的 Vite Host 攔截錯誤
      allowedHosts: ['recallable-candy-brashly.ngrok-free.dev', '.ngrok-free.dev', '.ngrok-free.app']
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

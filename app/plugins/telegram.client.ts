import { defineNuxtPlugin } from '#app'
import { init, miniApp, viewport } from '@tma.js/sdk-vue'

export default defineNuxtPlugin(async (nuxtApp) => {
  // 1. 嚴格限制環境，SSR 直接跳過
  if (!import.meta.client) return

  try {
    // 2. 初始化核心 (同步)
    init()

    // 3. 處理必要組件掛載 (異步)
    if (miniApp.mount.isAvailable()) {
      miniApp.mount()
      miniApp.ready()
    }

    if (viewport.mount.isAvailable()) {
      // 這裡必須 await 確保數據準備好
      await viewport.mount()
      viewport.expand()
    }

    // 4. 使用 provide 注入，這會自動處理類型擴展
    // 在組件中透過 useNuxtApp().$tg 訪問
    nuxtApp.provide('tg', {
      miniApp,
      viewport
    })
  } catch (e) {
    console.error('TMA Init Error:', e)
    // 即使失敗也注入 null，避免組件調用崩潰
    nuxtApp.provide('tg', null)
  }
})

import { betterAuth } from 'better-auth'
import { telegram } from 'better-auth-telegram'

export const auth = betterAuth({
  plugins: [
    telegram({
      botToken: useRuntimeConfig().telegram.botToken,
      botUsername: 'BigMoney888bot'
    })
  ]
  // 其他配置...
})

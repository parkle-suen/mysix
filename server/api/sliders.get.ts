import { querySQL } from '../utils/query'

export default defineEventHandler(async (/* event */) => {
  // 直接一行搞定，不需要管客戶端實例化

  const sliders = await querySQL(`
      SELECT id, title, image_url , target_url, active, order_id
      FROM sliders
      WHERE active = 1
      ORDER BY order_id ASC`)
  return { sliders }
})

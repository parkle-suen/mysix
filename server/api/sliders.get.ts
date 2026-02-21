import { querySQL } from '../utils/query'

export default defineEventHandler(async (/* event */) => {
  try {
    const sliders = await querySQL(`
      SELECT id, title, image_url, target_url, active, order_id
      FROM sliders
      WHERE active = 1
      ORDER BY order_id ASC
    `)

    // 添加调试日志
    console.log('Fetched sliders from database:', sliders)

    // 直接返回数组
    return sliders
  } catch (error) {
    console.error('Error fetching sliders from database:', error)

    // 返回空数组而不是对象
    return []
  }
})

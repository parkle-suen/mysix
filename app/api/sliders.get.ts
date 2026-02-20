export default defineEventHandler(async () => {
  // 从运行时配置获取Turso数据库配置
  const config = useRuntimeConfig()

  if (!config.turso.databaseUrl || !config.turso.authToken) {
    throw createError({
      statusCode: 500,
      message: 'Turso database URL or auth token is not set'
    })
  }

  try {
    // 动态导入 @libsql/client，因为可能未安装
    const { createClient } = await import('@libsql/client')

    // 创建数据库连接
    const db = createClient({
      url: config.turso.databaseUrl,
      authToken: config.turso.authToken
    })

    // 查询sliders表的数据，只获取激活状态的轮播图
    const result = await db.execute(`
      SELECT id, title, image_url , target_url, active, order_id
      FROM sliders
      WHERE active = 1
      ORDER BY order_id ASC
    `)

    // 返回查询结果
    return result.rows
  } catch (error) {
    console.error('Database query error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch slider data'
    })
  }
})

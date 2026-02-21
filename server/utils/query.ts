import type { InStatement } from '@libsql/client'

// 通用的執行 SQL 函數 (適用於 SELECT)
export const querySQL = async <T = unknown>(sql: InStatement) => {
  const client = useTurso()
  const { rows } = await client.execute(sql)
  return rows as T[]
}

// 通用的執行 SQL 函數 (適用於 INSERT/UPDATE/DELETE)
export const execSQL = async (sql: InStatement) => {
  const client = useTurso()
  return await client.execute(sql)
}

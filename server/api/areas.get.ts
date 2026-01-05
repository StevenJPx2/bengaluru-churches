import { churches } from '../database/schema'
import { useDrizzle } from '../utils/db'

export default defineEventHandler(async () => {
  const db = useDrizzle()
  const result = await db
    .selectDistinct({ area: churches.area })
    .from(churches)
    .orderBy(churches.area)

  return ['All', ...result.map(r => r.area)]
})

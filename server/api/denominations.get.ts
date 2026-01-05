import { churches } from '../database/schema'
import { useDrizzle } from '../utils/db'

export default defineEventHandler(async () => {
  const db = useDrizzle()
  const result = await db
    .selectDistinct({ denomination: churches.denomination })
    .from(churches)
    .orderBy(churches.denomination)

  return ['All', ...result.map(r => r.denomination)]
})

import { churches, type Church } from '../database/schema'
import { useDrizzle } from '../utils/db'

export default defineEventHandler(async () => {
  const db = useDrizzle()
  const result = await db.select().from(churches)

  return result.map((church: Church) => ({
    ...church,
    coordinates: [church.longitude, church.latitude] as [number, number],
    services: church.services ? JSON.parse(church.services) : undefined
  }))
})

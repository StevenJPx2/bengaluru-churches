import { churches } from '../database/schema'
import { useDrizzle } from '../utils/db'
import type { Church } from '~~/shared/types/church'

export default defineEventHandler(async (): Promise<Church[]> => {
  const db = useDrizzle()
  const result = await db.select().from(churches)

  return result.map(row => ({
    id: row.id,
    name: row.name,
    denomination: row.denomination,
    address: row.address,
    area: row.area,
    coordinates: [row.longitude, row.latitude] as [number, number],
    established: row.established,
    services: row.services ? JSON.parse(row.services) : null,
    phone: row.phone,
    website: row.website
  }))
})

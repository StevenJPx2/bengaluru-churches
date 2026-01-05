import { drizzle } from 'db0/integrations/drizzle'
import * as schema from '../database/schema'

export { schema }

export function useDrizzle() {
  return drizzle(useDatabase())
}

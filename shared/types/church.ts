import type { Church as DbChurch } from '~~/server/database/schema'

export type Church = Omit<DbChurch, 'longitude' | 'latitude'> & {
  coordinates: [number, number]
  services: string[] | null
}

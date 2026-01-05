import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const churches = sqliteTable('churches', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  denomination: text('denomination').notNull(),
  address: text('address').notNull(),
  area: text('area').notNull(),
  longitude: real('longitude').notNull(),
  latitude: real('latitude').notNull(),
  established: integer('established'),
  services: text('services'),
  phone: text('phone'),
  website: text('website')
})

export type Church = typeof churches.$inferSelect
export type NewChurch = typeof churches.$inferInsert

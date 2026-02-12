import {
  pgTable,
  serial,
  varchar,
  doublePrecision,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const desserts = pgTable('desserts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: doublePrecision('price').notNull(),
  available: boolean('available').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

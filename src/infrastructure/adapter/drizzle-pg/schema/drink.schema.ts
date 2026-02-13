import {
  pgTable,
  serial,
  varchar,
  doublePrecision,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { DrinkSizeEnum } from '../../../../modules/drink/domain/enums/drink-size.enum';

export const drinks = pgTable('drinks', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: doublePrecision('price').notNull(),
  size: varchar('size', {
    length: 50,
    enum: Object.values(DrinkSizeEnum) as [string, ...string[]],
  }).notNull(),
  withAlcohol: boolean('with_alcohol').notNull().default(false),
  available: boolean('available').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

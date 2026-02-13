import {
  pgTable,
  serial,
  integer,
  doublePrecision,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  pizzas: integer('pizzas').array().notNull().default([]),
  drinks: integer('drinks').array().notNull().default([]),
  desserts: integer('desserts').array().notNull().default([]),
  totalPrice: doublePrecision('total_price').notNull(),
  discountAmount: doublePrecision('discount_amount').notNull().default(0),
  discountPercentage: doublePrecision('discount_percentage').notNull().default(0),
  processed: boolean('processed').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../../../infrastructure/port/database.port';
import type { DrizzleDB } from '../../../../infrastructure/port/database.port';
import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';
import { orders } from '../../../../infrastructure/adapter/drizzle-pg/schema/order.schema';

@Injectable()
export class OrderRepositoryDrizzlePg implements IOrderRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findAll(): Promise<OrderEntity[]> {
    const rows = await this.db.select().from(orders);
    return rows.map((row) => OrderEntity.create(row));
  }

  async findById(id: number): Promise<OrderEntity | null> {
    const [row] = await this.db
      .select()
      .from(orders)
      .where(eq(orders.id, id));
    return row ? OrderEntity.create(row) : null;
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    const data = order.toPersistence();
    const [row] = await this.db
      .insert(orders)
      .values({
        pizzas: data.pizzas,
        drinks: data.drinks,
        desserts: data.desserts,
        totalPrice: data.totalPrice,
        processed: data.processed,
      })
      .returning();
    return OrderEntity.create(row);
  }

  async update(order: OrderEntity): Promise<OrderEntity> {
    const data = order.toPersistence();
    const [row] = await this.db
      .update(orders)
      .set({
        pizzas: data.pizzas,
        drinks: data.drinks,
        desserts: data.desserts,
        totalPrice: data.totalPrice,
        processed: data.processed,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, data.id))
      .returning();
    return OrderEntity.create(row);
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(orders).where(eq(orders.id, id));
  }
}

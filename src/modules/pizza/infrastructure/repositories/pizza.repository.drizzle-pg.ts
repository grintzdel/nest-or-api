import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../../../infrastructure/port/database.port';
import type { DrizzleDB } from '../../../../infrastructure/port/database.port';
import { IPizzaRepository } from '../../domain/repositories/pizza.repository.interface';
import { PizzaEntity } from '../../domain/entities/pizza.entity';
import { pizzas } from '../../../../infrastructure/adapter/drizzle-pg/schema/pizza.schema';

@Injectable()
export class PizzaRepositoryDrizzlePg implements IPizzaRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findAll(): Promise<PizzaEntity[]> {
    const rows = await this.db.select().from(pizzas);
    return rows.map((row) => PizzaEntity.create(row));
  }

  async findById(id: number): Promise<PizzaEntity | null> {
    const [row] = await this.db.select().from(pizzas).where(eq(pizzas.id, id));
    return row ? PizzaEntity.create(row) : null;
  }

  async create(pizza: PizzaEntity): Promise<PizzaEntity> {
    const data = pizza.toPersistence();
    const [row] = await this.db
      .insert(pizzas)
      .values({
        name: data.name,
        price: data.price,
        ingredients: data.ingredients,
        available: data.available,
      })
      .returning();
    return PizzaEntity.create(row);
  }

  async update(pizza: PizzaEntity): Promise<PizzaEntity> {
    const data = pizza.toPersistence();
    const [row] = await this.db
      .update(pizzas)
      .set({
        name: data.name,
        price: data.price,
        ingredients: data.ingredients,
        available: data.available,
        updatedAt: new Date(),
      })
      .where(eq(pizzas.id, data.id))
      .returning();
    return PizzaEntity.create(row);
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(pizzas).where(eq(pizzas.id, id));
  }
}

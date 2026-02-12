import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../../../infrastructure/port/database.port';
import type { DrizzleDB } from '../../../../infrastructure/port/database.port';
import { IDessertRepository } from '../../domain/repositories/dessert.repository.interface';
import { DessertEntity } from '../../domain/entities/dessert.entity';
import { desserts } from '../../../../infrastructure/adapter/drizzle-pg/schema/dessert.schema';

@Injectable()
export class DessertRepositoryDrizzlePg implements IDessertRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findAll(): Promise<DessertEntity[]> {
    const rows = await this.db.select().from(desserts);
    return rows.map((row) => DessertEntity.create(row));
  }

  async findById(id: number): Promise<DessertEntity | null> {
    const [row] = await this.db
      .select()
      .from(desserts)
      .where(eq(desserts.id, id));
    return row ? DessertEntity.create(row) : null;
  }

  async create(dessert: DessertEntity): Promise<DessertEntity> {
    const data = dessert.toPersistence();
    const [row] = await this.db
      .insert(desserts)
      .values({
        name: data.name,
        price: data.price,
        available: data.available,
      })
      .returning();
    return DessertEntity.create(row);
  }

  async update(dessert: DessertEntity): Promise<DessertEntity> {
    const data = dessert.toPersistence();
    const [row] = await this.db
      .update(desserts)
      .set({
        name: data.name,
        price: data.price,
        available: data.available,
        updatedAt: new Date(),
      })
      .where(eq(desserts.id, data.id))
      .returning();
    return DessertEntity.create(row);
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(desserts).where(eq(desserts.id, id));
  }
}

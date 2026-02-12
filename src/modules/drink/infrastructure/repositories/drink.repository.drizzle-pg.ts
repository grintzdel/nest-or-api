import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../../../infrastructure/port/database.port';
import type { DrizzleDB } from '../../../../infrastructure/port/database.port';
import { IDrinkRepository } from '../../domain/repositories/drink.repository.interface';
import { DrinkEntity } from '../../domain/entities/drink.entity';
import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';
import { drinks } from '../../../../infrastructure/adapter/drizzle-pg/schema/drink.schema';

@Injectable()
export class DrinkRepositoryDrizzlePg implements IDrinkRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findAll(): Promise<DrinkEntity[]> {
    const rows = await this.db.select().from(drinks);
    return rows.map((row) =>
      DrinkEntity.create({ ...row, size: row.size as DrinkSizeEnum }),
    );
  }

  async findById(id: number): Promise<DrinkEntity | null> {
    const [row] = await this.db.select().from(drinks).where(eq(drinks.id, id));
    return row
      ? DrinkEntity.create({ ...row, size: row.size as DrinkSizeEnum })
      : null;
  }

  async create(drink: DrinkEntity): Promise<DrinkEntity> {
    const data = drink.toPersistence();
    const [row] = await this.db
      .insert(drinks)
      .values({
        name: data.name,
        price: data.price,
        size: data.size,
        withAlcohol: data.withAlcohol,
        available: data.available,
      })
      .returning();
    return DrinkEntity.create({ ...row, size: row.size as DrinkSizeEnum });
  }

  async update(drink: DrinkEntity): Promise<DrinkEntity> {
    const data = drink.toPersistence();
    const [row] = await this.db
      .update(drinks)
      .set({
        name: data.name,
        price: data.price,
        size: data.size,
        withAlcohol: data.withAlcohol,
        available: data.available,
        updatedAt: new Date(),
      })
      .where(eq(drinks.id, data.id))
      .returning();
    return DrinkEntity.create({ ...row, size: row.size as DrinkSizeEnum });
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(drinks).where(eq(drinks.id, id));
  }
}

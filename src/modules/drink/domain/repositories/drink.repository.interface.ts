import type { DrinkEntity } from '../entities/drink.entity';

export interface IDrinkRepository {
  findAll(): Promise<DrinkEntity[]>;
  findById(id: number): Promise<DrinkEntity | null>;
  create(drink: DrinkEntity): Promise<DrinkEntity>;
  update(drink: DrinkEntity): Promise<DrinkEntity>;
  delete(id: number): Promise<void>;
}

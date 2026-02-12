import type { DessertEntity } from '../entities/dessert.entity';

export interface IDessertRepository {
  findAll(): Promise<DessertEntity[]>;
  findById(id: number): Promise<DessertEntity | null>;
  create(dessert: DessertEntity): Promise<DessertEntity>;
  update(dessert: DessertEntity): Promise<DessertEntity>;
  delete(id: number): Promise<void>;
}

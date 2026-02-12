import type { PizzaEntity } from '../entities/pizza.entity';

export interface IPizzaRepository {
  findAll(): Promise<PizzaEntity[]>;
  findById(id: number): Promise<PizzaEntity | null>;
  create(pizza: PizzaEntity): Promise<PizzaEntity>;
  update(pizza: PizzaEntity): Promise<PizzaEntity>;
  delete(id: number): Promise<void>;
}

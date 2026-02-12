import { Injectable } from '@nestjs/common';
import type { IPizzaRepository } from '../../domain/repositories/pizza.repository.interface';
import { PizzaEntity } from '../../domain/entities/pizza.entity';

@Injectable()
export class PizzaRepositoryInMemory implements IPizzaRepository {
  private pizzas: PizzaEntity[] = [
    PizzaEntity.create({
      id: 1,
      name: 'Margherita',
      ingredients: ['tomate', 'mozzarella', 'basilic'],
      price: 8,
      available: true,
    }),
    PizzaEntity.create({
      id: 2,
      name: 'Reine',
      ingredients: ['tomate', 'mozzarella', 'jambon', 'champignons'],
      price: 10,
      available: true,
    }),
    PizzaEntity.create({
      id: 3,
      name: '4 Fromages',
      ingredients: ['mozzarella', 'gorgonzola', 'parmesan', 'chèvre'],
      price: 12,
      available: true,
    }),
    PizzaEntity.create({
      id: 4,
      name: 'Pepperoni',
      ingredients: ['tomate', 'mozzarella', 'pepperoni'],
      price: 11,
      available: true,
    }),
    PizzaEntity.create({
      id: 5,
      name: 'Végétarienne',
      ingredients: ['tomate', 'mozzarella', 'poivrons', 'oignons', 'olives'],
      price: 11,
      available: true,
    }),
    PizzaEntity.create({
      id: 6,
      name: 'Calzone',
      ingredients: ['tomate', 'mozzarella', 'jambon', 'oeuf'],
      price: 13,
      available: false,
    }),
  ];

  private nextId = 7;

  findAll(): Promise<PizzaEntity[]> {
    return Promise.resolve([...this.pizzas]);
  }

  findById(id: number): Promise<PizzaEntity | null> {
    return Promise.resolve(this.pizzas.find((p) => p.id === id) ?? null);
  }

  create(pizza: PizzaEntity): Promise<PizzaEntity> {
    const created = PizzaEntity.create({
      ...pizza.toPersistence(),
      id: this.nextId++,
    });
    this.pizzas.push(created);
    return Promise.resolve(created);
  }

  update(pizza: PizzaEntity): Promise<PizzaEntity> {
    const index = this.pizzas.findIndex((p) => p.id === pizza.id);
    if (index !== -1) {
      this.pizzas[index] = pizza;
    }
    return Promise.resolve(pizza);
  }

  delete(id: number): Promise<void> {
    this.pizzas = this.pizzas.filter((p) => p.id !== id);
    return Promise.resolve();
  }
}

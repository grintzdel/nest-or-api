import { Injectable } from '@nestjs/common';
import type { IDrinkRepository } from '../../domain/repositories/drink.repository.interface';
import { DrinkEntity } from '../../domain/entities/drink.entity';
import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';

@Injectable()
export class DrinkRepositoryInMemory implements IDrinkRepository {
  private drinks: DrinkEntity[] = [
    DrinkEntity.create({
      id: 1,
      name: 'Coca-Cola',
      price: 2.5,
      size: DrinkSizeEnum.LARGE,
      withAlcohol: false,
      available: true,
    }),
    DrinkEntity.create({
      id: 2,
      name: 'Orangina',
      price: 2.5,
      size: DrinkSizeEnum.LARGE,
      withAlcohol: false,
      available: true,
    }),
    DrinkEntity.create({
      id: 3,
      name: 'Eau minérale',
      price: 1.5,
      size: DrinkSizeEnum.EXTRA_LARGE,
      withAlcohol: false,
      available: true,
    }),
    DrinkEntity.create({
      id: 4,
      name: 'Bière blonde',
      price: 3.5,
      size: DrinkSizeEnum.MEDIUM,
      withAlcohol: true,
      available: true,
    }),
    DrinkEntity.create({
      id: 5,
      name: 'Vin rouge',
      price: 4,
      size: DrinkSizeEnum.SMALL,
      withAlcohol: true,
      available: true,
    }),
    DrinkEntity.create({
      id: 6,
      name: 'Limonade',
      price: 2,
      size: DrinkSizeEnum.LARGE,
      withAlcohol: false,
      available: false,
    }),
  ];

  private nextId = 7;

  findAll(): Promise<DrinkEntity[]> {
    return Promise.resolve([...this.drinks]);
  }

  findById(id: number): Promise<DrinkEntity | null> {
    return Promise.resolve(this.drinks.find((d) => d.id === id) ?? null);
  }

  create(drink: DrinkEntity): Promise<DrinkEntity> {
    const created = DrinkEntity.create({
      ...drink.toPersistence(),
      id: this.nextId++,
    });
    this.drinks.push(created);
    return Promise.resolve(created);
  }

  update(drink: DrinkEntity): Promise<DrinkEntity> {
    const index = this.drinks.findIndex((d) => d.id === drink.id);
    if (index !== -1) {
      this.drinks[index] = drink;
    }
    return Promise.resolve(drink);
  }

  delete(id: number): Promise<void> {
    this.drinks = this.drinks.filter((d) => d.id !== id);
    return Promise.resolve();
  }
}

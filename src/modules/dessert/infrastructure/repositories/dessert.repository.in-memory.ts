import { Injectable } from '@nestjs/common';
import type { IDessertRepository } from '../../domain/repositories/dessert.repository.interface';
import { DessertEntity } from '../../domain/entities/dessert.entity';

@Injectable()
export class DessertRepositoryInMemory implements IDessertRepository {
  private desserts: DessertEntity[] = [
    DessertEntity.create({
      id: 1,
      name: 'Tiramisu',
      price: 5,
      available: true,
    }),
    DessertEntity.create({
      id: 2,
      name: 'Panna Cotta',
      price: 4.5,
      available: true,
    }),
    DessertEntity.create({
      id: 3,
      name: 'Fondant au chocolat',
      price: 6,
      available: true,
    }),
    DessertEntity.create({
      id: 4,
      name: 'Salade de fruits',
      price: 4,
      available: false,
    }),
  ];

  private nextId = 5;

  findAll(): Promise<DessertEntity[]> {
    return Promise.resolve([...this.desserts]);
  }

  findById(id: number): Promise<DessertEntity | null> {
    return Promise.resolve(this.desserts.find((d) => d.id === id) ?? null);
  }

  create(dessert: DessertEntity): Promise<DessertEntity> {
    const created = DessertEntity.create({
      ...dessert.toPersistence(),
      id: this.nextId++,
    });
    this.desserts.push(created);
    return Promise.resolve(created);
  }

  update(dessert: DessertEntity): Promise<DessertEntity> {
    const index = this.desserts.findIndex((d) => d.id === dessert.id);
    if (index !== -1) {
      this.desserts[index] = dessert;
    }
    return Promise.resolve(dessert);
  }

  delete(id: number): Promise<void> {
    this.desserts = this.desserts.filter((d) => d.id !== id);
    return Promise.resolve();
  }
}

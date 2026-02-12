import { Injectable } from '@nestjs/common';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';

@Injectable()
export class OrderRepositoryInMemory implements IOrderRepository {
  private orders: OrderEntity[] = [
    OrderEntity.create({
      id: 1,
      pizzas: [1, 4],
      drinks: [1],
      desserts: [1],
      totalPrice: 22.95,
      processed: true,
    }),
    OrderEntity.create({
      id: 2,
      pizzas: [2],
      drinks: [3],
      desserts: [],
      totalPrice: 11.5,
      processed: false,
    }),
    OrderEntity.create({
      id: 3,
      pizzas: [3, 5],
      drinks: [2, 4],
      desserts: [2, 3],
      totalPrice: 36.55,
      processed: false,
    }),
  ];

  private nextId = 4;

  findAll(): Promise<OrderEntity[]> {
    return Promise.resolve([...this.orders]);
  }

  findById(id: number): Promise<OrderEntity | null> {
    return Promise.resolve(this.orders.find((o) => o.id === id) ?? null);
  }

  create(order: OrderEntity): Promise<OrderEntity> {
    const created = OrderEntity.create({
      ...order.toPersistence(),
      id: this.nextId++,
    });
    this.orders.push(created);
    return Promise.resolve(created);
  }

  update(order: OrderEntity): Promise<OrderEntity> {
    const index = this.orders.findIndex((o) => o.id === order.id);
    if (index !== -1) {
      this.orders[index] = order;
    }
    return Promise.resolve(order);
  }

  delete(id: number): Promise<void> {
    this.orders = this.orders.filter((o) => o.id !== id);
    return Promise.resolve();
  }
}

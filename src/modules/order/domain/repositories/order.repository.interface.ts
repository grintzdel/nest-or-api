import type { OrderEntity } from '../entities/order.entity';

export interface IOrderRepository {
  findAll(): Promise<OrderEntity[]>;
  findById(id: number): Promise<OrderEntity | null>;
  create(order: OrderEntity): Promise<OrderEntity>;
  update(order: OrderEntity): Promise<OrderEntity>;
  delete(id: number): Promise<void>;
}

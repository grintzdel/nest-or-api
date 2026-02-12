import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../domain/repositories/order.repository.token';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(data: {
    pizzas: number[];
    drinks: number[];
    desserts: number[];
    totalPrice: number;
  }): Promise<OrderEntity> {
    const order = OrderEntity.create(data);
    return await this.orderRepository.create(order);
  }
}

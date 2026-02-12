import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../domain/repositories/order.repository.token';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderNotFoundError } from '../../domain/errors/order-not-found.error';
import { OrderEntity } from '../../domain/entities/order.entity';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(
    id: number,
    data: {
      pizzas: number[];
      drinks: number[];
      desserts: number[];
      totalPrice: number;
    },
  ): Promise<OrderEntity> {
    const existing = await this.orderRepository.findById(id);
    if (!existing) {
      throw new OrderNotFoundError(id);
    }
    const updated = existing.update(data);
    return await this.orderRepository.update(updated);
  }
}

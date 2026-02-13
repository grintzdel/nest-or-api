import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../domain/repositories/order.repository.token';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderNotFoundError } from '../../domain/errors/order-not-found.error';
import { OrderEntity } from '../../domain/entities/order.entity';
import { ValidateOrderItemsUseCase } from './validate-order-items.use-case';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly validateOrderItemsUseCase: ValidateOrderItemsUseCase,
  ) {}

  async execute(
    id: number,
    data: {
      pizzas: number[];
      drinks: number[];
      desserts: number[];
    },
  ): Promise<OrderEntity> {
    const existing = await this.orderRepository.findById(id);
    if (!existing) {
      throw new OrderNotFoundError(id);
    }
    const validated = await this.validateOrderItemsUseCase.execute(data);
    const updated = existing.update(validated);
    return await this.orderRepository.update(updated);
  }
}

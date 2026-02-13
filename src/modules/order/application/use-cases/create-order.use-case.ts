import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../domain/repositories/order.repository.token';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';
import { ValidateOrderItemsUseCase } from './validate-order-items.use-case';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly validateOrderItemsUseCase: ValidateOrderItemsUseCase,
  ) {}

  async execute(data: {
    pizzas: number[];
    drinks: number[];
    desserts: number[];
  }): Promise<OrderEntity> {
    const validated = await this.validateOrderItemsUseCase.execute(data);
    const order = OrderEntity.create(validated);
    return await this.orderRepository.create(order);
  }
}

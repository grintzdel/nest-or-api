import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../domain/repositories/order.repository.token';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderNotFoundError } from '../../domain/errors/order-not-found.error';
import { OrderEntity } from '../../domain/entities/order.entity';

@Injectable()
export class GetOrderByIdUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new OrderNotFoundError(id);
    }
    return order;
  }
}

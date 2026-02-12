import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../domain/repositories/order.repository.token';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderNotFoundError } from '../../domain/errors/order-not-found.error';

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.orderRepository.findById(id);
    if (!existing) {
      throw new OrderNotFoundError(id);
    }
    await this.orderRepository.delete(id);
  }
}

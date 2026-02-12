import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../domain/repositories/order.repository.token';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';

export type OrderFilters = {
  processed?: boolean;
};

@Injectable()
export class FilterOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(filters: OrderFilters): Promise<OrderEntity[]> {
    const all = await this.orderRepository.findAll();

    return all.filter((order) => {
      if (
        filters.processed !== undefined &&
        order.processed !== filters.processed
      ) {
        return false;
      }

      return true;
    });
  }
}

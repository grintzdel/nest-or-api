import { Injectable } from '@nestjs/common';
import { ListOrdersUseCase } from '../use-cases/list-orders.use-case';
import { GetOrderByIdUseCase } from '../use-cases/get-order-by-id.use-case';
import { CreateOrderUseCase } from '../use-cases/create-order.use-case';
import { UpdateOrderUseCase } from '../use-cases/update-order.use-case';
import { DeleteOrderUseCase } from '../use-cases/delete-order.use-case';
import { UpdateOrderProcessedUseCase } from '../use-cases/update-order-processed.use-case';
import { FilterOrdersUseCase } from '../use-cases/filter-orders.use-case';
import type { OrderFilters } from '../use-cases/filter-orders.use-case';
import { OrderEntity } from '../../domain/entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly listOrdersUseCase: ListOrdersUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    private readonly updateOrderProcessedUseCase: UpdateOrderProcessedUseCase,
    private readonly filterOrdersUseCase: FilterOrdersUseCase,
  ) {}

  async listOrders(): Promise<OrderEntity[]> {
    return await this.listOrdersUseCase.execute();
  }

  async getOrderById(id: number): Promise<OrderEntity> {
    return await this.getOrderByIdUseCase.execute(id);
  }

  async createOrder(data: {
    pizzas: number[];
    drinks: number[];
    desserts: number[];
  }): Promise<OrderEntity> {
    return await this.createOrderUseCase.execute(data);
  }

  async updateOrder(
    id: number,
    data: { pizzas: number[]; drinks: number[]; desserts: number[] },
  ): Promise<OrderEntity> {
    return await this.updateOrderUseCase.execute(id, data);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.deleteOrderUseCase.execute(id);
  }

  async updateProcessed(id: number, processed: boolean): Promise<OrderEntity> {
    return await this.updateOrderProcessedUseCase.execute(id, processed);
  }

  async filterOrders(filters: OrderFilters): Promise<OrderEntity[]> {
    return await this.filterOrdersUseCase.execute(filters);
  }
}

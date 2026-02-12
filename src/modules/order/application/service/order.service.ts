import { BadRequestException, Injectable } from '@nestjs/common';
import { ListOrdersUseCase } from '../use-cases/list-orders.use-case';
import { GetOrderByIdUseCase } from '../use-cases/get-order-by-id.use-case';
import { CreateOrderUseCase } from '../use-cases/create-order.use-case';
import { UpdateOrderUseCase } from '../use-cases/update-order.use-case';
import { DeleteOrderUseCase } from '../use-cases/delete-order.use-case';
import { UpdateOrderProcessedUseCase } from '../use-cases/update-order-processed.use-case';
import {
  FilterOrdersUseCase,
  type OrderFilters,
} from '../use-cases/filter-orders.use-case';
import { PizzaService } from '../../../pizza/application/service/pizza.service';
import { DrinkService } from '../../../drink/application/service/drink.service';
import { DessertService } from '../../../dessert/application/service/dessert.service';
import { MenuService } from '../../../menu/application/service/menu.service';
import { OrderEntity } from '../../domain/entities/order.entity';
import type { PizzaEntity } from '../../../pizza/domain/entities/pizza.entity';
import type { DrinkEntity } from '../../../drink/domain/entities/drink.entity';
import type { DessertEntity } from '../../../dessert/domain/entities/dessert.entity';

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
    private readonly pizzaService: PizzaService,
    private readonly drinkService: DrinkService,
    private readonly dessertService: DessertService,
    private readonly menuService: MenuService,
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
    const { pizzaEntities, drinkEntities, dessertEntities } =
      await this.validateAndFetchItems(data);

    const totalPrice = this.menuService.calculateTotal(
      pizzaEntities,
      drinkEntities,
      dessertEntities,
    );

    return await this.createOrderUseCase.execute({
      pizzas: data.pizzas,
      drinks: data.drinks,
      desserts: data.desserts,
      totalPrice,
    });
  }

  async updateOrder(
    id: number,
    data: { pizzas: number[]; drinks: number[]; desserts: number[] },
  ): Promise<OrderEntity> {
    const { pizzaEntities, drinkEntities, dessertEntities } =
      await this.validateAndFetchItems(data);

    const totalPrice = this.menuService.calculateTotal(
      pizzaEntities,
      drinkEntities,
      dessertEntities,
    );

    return await this.updateOrderUseCase.execute(id, {
      pizzas: data.pizzas,
      drinks: data.drinks,
      desserts: data.desserts,
      totalPrice,
    });
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

  private async validateAndFetchItems(data: {
    pizzas: number[];
    drinks: number[];
    desserts: number[];
  }): Promise<{
    pizzaEntities: PizzaEntity[];
    drinkEntities: DrinkEntity[];
    dessertEntities: DessertEntity[];
  }> {
    const pizzaEntities = await Promise.all(
      data.pizzas.map((id) => this.pizzaService.getPizzaById(id)),
    );
    const drinkEntities = await Promise.all(
      data.drinks.map((id) => this.drinkService.getDrinkById(id)),
    );
    const dessertEntities = await Promise.all(
      data.desserts.map((id) => this.dessertService.getDessertById(id)),
    );

    const unavailable: string[] = [];

    for (const p of pizzaEntities) {
      if (!p.available) unavailable.push(`Pizza "${p.name}" (id ${p.id})`);
    }
    for (const d of drinkEntities) {
      if (!d.available) unavailable.push(`Drink "${d.name}" (id ${d.id})`);
    }
    for (const d of dessertEntities) {
      if (!d.available) unavailable.push(`Dessert "${d.name}" (id ${d.id})`);
    }

    if (unavailable.length > 0) {
      throw new BadRequestException(
        `Unavailable items: ${unavailable.join(', ')}`,
      );
    }

    return { pizzaEntities, drinkEntities, dessertEntities };
  }
}

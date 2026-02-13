import { Injectable } from '@nestjs/common';
import { CalculateTotalUseCase } from '../use-cases/calculate-total.use-case';
import { CalculateDiscountUseCase } from '../use-cases/calculate-discount.use-case';
import type { PizzaEntity } from '../../../pizza/domain/entities/pizza.entity';
import type { DrinkEntity } from '../../../drink/domain/entities/drink.entity';
import type { DessertEntity } from '../../../dessert/domain/entities/dessert.entity';

@Injectable()
export class MenuService {
  constructor(
    private readonly calculateTotalUseCase: CalculateTotalUseCase,
    private readonly calculateDiscountUseCase: CalculateDiscountUseCase,
  ) {}

  calculateTotal(
    pizzas: PizzaEntity[],
    drinks: DrinkEntity[],
    desserts: DessertEntity[],
  ): number {
    return this.calculateTotalUseCase.execute(pizzas, drinks, desserts);
  }

  calculateDiscount(
    pizzas: PizzaEntity[],
    drinks: DrinkEntity[],
    desserts: DessertEntity[],
  ): number {
    return this.calculateDiscountUseCase.execute(pizzas, drinks, desserts);
  }

  calculateMenuSubtotal(
    pizzas: PizzaEntity[],
    drinks: DrinkEntity[],
    desserts: DessertEntity[],
  ): number {
    return this.calculateDiscountUseCase.getMenuSubtotal(
      pizzas,
      drinks,
      desserts,
    );
  }
}

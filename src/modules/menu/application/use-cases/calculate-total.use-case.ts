import { Injectable } from '@nestjs/common';
import { CalculateDiscountUseCase } from './calculate-discount.use-case';
import type { PizzaEntity } from '../../../pizza/domain/entities/pizza.entity';
import type { DrinkEntity } from '../../../drink/domain/entities/drink.entity';
import type { DessertEntity } from '../../../dessert/domain/entities/dessert.entity';

@Injectable()
export class CalculateTotalUseCase {
  constructor(
    private readonly calculateDiscountUseCase: CalculateDiscountUseCase,
  ) {}

  execute(
    pizzas: PizzaEntity[],
    drinks: DrinkEntity[],
    desserts: DessertEntity[],
  ): number {
    const pizzaTotal = pizzas.reduce((sum, p) => sum + p.price, 0);
    const drinkTotal = drinks.reduce((sum, d) => sum + d.price, 0);
    const dessertTotal = desserts.reduce((sum, d) => sum + d.price, 0);

    const fullTotal = pizzaTotal + drinkTotal + dessertTotal;
    const discount = this.calculateDiscountUseCase.execute(
      pizzas,
      drinks,
      desserts,
    );

    return Math.round((fullTotal - discount) * 100) / 100;
  }
}

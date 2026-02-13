import { Injectable } from '@nestjs/common';
import type { PizzaEntity } from '../../../pizza/domain/entities/pizza.entity';
import type { DrinkEntity } from '../../../drink/domain/entities/drink.entity';
import type { DessertEntity } from '../../../dessert/domain/entities/dessert.entity';

@Injectable()
export class CalculateDiscountUseCase {
  execute(
    pizzas: PizzaEntity[],
    drinks: DrinkEntity[],
    desserts: DessertEntity[],
  ): number {
    return this.getMenuDetails(pizzas, drinks, desserts).discount;
  }

  getMenuSubtotal(
    pizzas: PizzaEntity[],
    drinks: DrinkEntity[],
    desserts: DessertEntity[],
  ): number {
    return this.getMenuDetails(pizzas, drinks, desserts).menuSubtotal;
  }

  private getMenuDetails(
    pizzas: PizzaEntity[],
    drinks: DrinkEntity[],
    desserts: DessertEntity[],
  ): { discount: number; menuSubtotal: number } {
    const nonAlcoholicDrinks = drinks.filter((d) => !d.withAlcohol);

    const menuCount = Math.min(
      pizzas.length,
      nonAlcoholicDrinks.length,
      desserts.length,
    );

    if (menuCount === 0) return { discount: 0, menuSubtotal: 0 };

    const sortedPizzaPrices = pizzas.map((p) => p.price).sort((a, b) => a - b);
    const sortedDrinkPrices = nonAlcoholicDrinks
      .map((d) => d.price)
      .sort((a, b) => a - b);
    const sortedDessertPrices = desserts
      .map((d) => d.price)
      .sort((a, b) => a - b);

    let discount = 0;
    let menuSubtotal = 0;
    for (let i = 0; i < menuCount; i++) {
      const menuTotal =
        sortedPizzaPrices[i] + sortedDrinkPrices[i] + sortedDessertPrices[i];
      menuSubtotal += menuTotal;
      discount += menuTotal * 0.1;
    }

    return {
      discount: Math.round(discount * 100) / 100,
      menuSubtotal: Math.round(menuSubtotal * 100) / 100,
    };
  }
}

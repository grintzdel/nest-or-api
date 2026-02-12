import { Injectable } from '@nestjs/common';
import type { PizzaEntity } from '../../../pizza/domain/entities/pizza.entity';
import type { DrinkEntity } from '../../../drink/domain/entities/drink.entity';
import type { DessertEntity } from '../../../dessert/domain/entities/dessert.entity';

@Injectable()
export class MenuService {
  calculateTotal(
    pizzas: PizzaEntity[],
    drinks: DrinkEntity[],
    desserts: DessertEntity[],
  ): number {
    const pizzaTotal = pizzas.reduce((sum, p) => sum + p.price, 0);
    const drinkTotal = drinks.reduce((sum, d) => sum + d.price, 0);
    const dessertTotal = desserts.reduce((sum, d) => sum + d.price, 0);

    const fullTotal = pizzaTotal + drinkTotal + dessertTotal;
    const discount = this.calculateDiscount(pizzas, drinks, desserts);

    return Math.round((fullTotal - discount) * 100) / 100;
  }

  calculateDiscount(
    pizzas: PizzaEntity[],
    drinks: DrinkEntity[],
    desserts: DessertEntity[],
  ): number {
    const nonAlcoholicDrinks = drinks.filter((d) => !d.withAlcohol);

    const menuCount = Math.min(
      pizzas.length,
      nonAlcoholicDrinks.length,
      desserts.length,
    );

    if (menuCount === 0) return 0;

    const sortedPizzaPrices = pizzas.map((p) => p.price).sort((a, b) => a - b);
    const sortedDrinkPrices = nonAlcoholicDrinks
      .map((d) => d.price)
      .sort((a, b) => a - b);
    const sortedDessertPrices = desserts
      .map((d) => d.price)
      .sort((a, b) => a - b);

    let discount = 0;
    for (let i = 0; i < menuCount; i++) {
      const menuTotal =
        sortedPizzaPrices[i] + sortedDrinkPrices[i] + sortedDessertPrices[i];
      discount += menuTotal * 0.1;
    }

    return Math.round(discount * 100) / 100;
  }
}

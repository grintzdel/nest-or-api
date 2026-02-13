import { BadRequestException, Injectable } from '@nestjs/common';
import { PizzaService } from '../../../pizza/application/service/pizza.service';
import { DrinkService } from '../../../drink/application/service/drink.service';
import { DessertService } from '../../../dessert/application/service/dessert.service';
import { MenuService } from '../../../menu/application/service/menu.service';

export type ValidatedOrderItems = {
  pizzas: number[];
  drinks: number[];
  desserts: number[];
  totalPrice: number;
  discountAmount: number;
  discountPercentage: number;
};

@Injectable()
export class ValidateOrderItemsUseCase {
  constructor(
    private readonly pizzaService: PizzaService,
    private readonly drinkService: DrinkService,
    private readonly dessertService: DessertService,
    private readonly menuService: MenuService,
  ) {}

  async execute(data: {
    pizzas: number[];
    drinks: number[];
    desserts: number[];
  }): Promise<ValidatedOrderItems> {
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

    const totalPrice = this.menuService.calculateTotal(
      pizzaEntities,
      drinkEntities,
      dessertEntities,
    );

    const discountAmount = this.menuService.calculateDiscount(
      pizzaEntities,
      drinkEntities,
      dessertEntities,
    );

    const menuSubtotal = this.menuService.calculateMenuSubtotal(
      pizzaEntities,
      drinkEntities,
      dessertEntities,
    );

    const discountPercentage =
      menuSubtotal > 0 ? (discountAmount / menuSubtotal) * 100 : 0;

    return {
      pizzas: data.pizzas,
      drinks: data.drinks,
      desserts: data.desserts,
      totalPrice,
      discountAmount,
      discountPercentage,
    };
  }
}

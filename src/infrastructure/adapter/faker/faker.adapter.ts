import { Inject, Injectable } from '@nestjs/common';
import type { ISeedPort } from '../../port/seed.port';
import { DRIZZLE } from '../../port/database.port';
import type { DrizzleDB } from '../../port/database.port';
import { pizzas } from '../drizzle-pg/schema/pizza.schema';
import { drinks } from '../drizzle-pg/schema/drink.schema';
import { desserts } from '../drizzle-pg/schema/dessert.schema';
import { orders } from '../drizzle-pg/schema/order.schema';
import { DrinkSizeEnum } from '../../../modules/drink/domain/enums/drink-size.enum';

@Injectable()
export class FakerAdapter implements ISeedPort {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async seed(): Promise<void> {
    await this.db.insert(pizzas).values([
      { name: 'Margherita', price: 8, ingredients: ['tomate', 'mozzarella', 'basilic'], available: true },
      { name: 'Reine', price: 10, ingredients: ['tomate', 'mozzarella', 'jambon', 'champignons'], available: true },
      { name: '4 Fromages', price: 12, ingredients: ['mozzarella', 'gorgonzola', 'parmesan', 'chèvre'], available: true },
      { name: 'Pepperoni', price: 11, ingredients: ['tomate', 'mozzarella', 'pepperoni'], available: true },
      { name: 'Végétarienne', price: 11, ingredients: ['tomate', 'mozzarella', 'poivrons', 'oignons', 'olives'], available: true },
      { name: 'Calzone', price: 13, ingredients: ['tomate', 'mozzarella', 'jambon', 'oeuf'], available: false },
    ]);

    await this.db.insert(drinks).values([
      { name: 'Coca-Cola', price: 2.5, size: DrinkSizeEnum.LARGE, withAlcohol: false, available: true },
      { name: 'Orangina', price: 2.5, size: DrinkSizeEnum.LARGE, withAlcohol: false, available: true },
      { name: 'Eau minérale', price: 1.5, size: DrinkSizeEnum.EXTRA_LARGE, withAlcohol: false, available: true },
      { name: 'Bière blonde', price: 3.5, size: DrinkSizeEnum.MEDIUM, withAlcohol: true, available: true },
      { name: 'Vin rouge', price: 4, size: DrinkSizeEnum.SMALL, withAlcohol: true, available: true },
      { name: 'Limonade', price: 2, size: DrinkSizeEnum.LARGE, withAlcohol: false, available: false },
    ]);

    await this.db.insert(desserts).values([
      { name: 'Tiramisu', price: 5, available: true },
      { name: 'Panna Cotta', price: 4.5, available: true },
      { name: 'Fondant au chocolat', price: 6, available: true },
      { name: 'Salade de fruits', price: 4, available: false },
    ]);

    await this.db.insert(orders).values([
      { pizzas: [1, 4], drinks: [1], desserts: [1], totalPrice: 22.95, processed: true },
      { pizzas: [2], drinks: [3], desserts: [], totalPrice: 11.5, processed: false },
      { pizzas: [3, 5], drinks: [2, 4], desserts: [2, 3], totalPrice: 36.55, processed: false },
    ]);
  }
}

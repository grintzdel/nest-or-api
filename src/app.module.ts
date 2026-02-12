import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzaModule } from './modules/pizza/pizza.module';
import { DrinkModule } from './modules/drink/drink.module';
import { DessertModule } from './modules/dessert/dessert.module';
import { OrderModule } from './modules/order/order.module';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [PizzaModule, DrinkModule, DessertModule, OrderModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

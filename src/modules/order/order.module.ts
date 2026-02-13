import { Module } from '@nestjs/common';
import { OrderInfrastructureModule } from './infrastructure/order.infrastructure.module';
import { PizzaModule } from '../pizza/pizza.module';
import { DrinkModule } from '../drink/drink.module';
import { DessertModule } from '../dessert/dessert.module';
import { MenuModule } from '../menu/menu.module';
import { OrderService } from './application/service/order.service';
import { ListOrdersUseCase } from './application/use-cases/list-orders.use-case';
import { GetOrderByIdUseCase } from './application/use-cases/get-order-by-id.use-case';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { UpdateOrderUseCase } from './application/use-cases/update-order.use-case';
import { DeleteOrderUseCase } from './application/use-cases/delete-order.use-case';
import { UpdateOrderProcessedUseCase } from './application/use-cases/update-order-processed.use-case';
import { FilterOrdersUseCase } from './application/use-cases/filter-orders.use-case';
import { ValidateOrderItemsUseCase } from './application/use-cases/validate-order-items.use-case';
import { OrderController } from './presentation/controllers/order.controller';

@Module({
  imports: [
    OrderInfrastructureModule,
    PizzaModule,
    DrinkModule,
    DessertModule,
    MenuModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    ListOrdersUseCase,
    GetOrderByIdUseCase,
    CreateOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    UpdateOrderProcessedUseCase,
    FilterOrdersUseCase,
    ValidateOrderItemsUseCase,
  ],
  exports: [OrderService],
})
export class OrderModule {}

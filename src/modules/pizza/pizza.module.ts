import { Module } from '@nestjs/common';
import { PizzaInfrastructureModule } from './infrastructure/pizza.infrastructure.module';
import { PizzaService } from './application/service/pizza.service';
import { ListPizzasUseCase } from './application/use-cases/list-pizzas.use-case';
import { GetPizzaByIdUseCase } from './application/use-cases/get-pizza-by-id.use-case';
import { CreatePizzaUseCase } from './application/use-cases/create-pizza.use-case';
import { UpdatePizzaUseCase } from './application/use-cases/update-pizza.use-case';
import { DeletePizzaUseCase } from './application/use-cases/delete-pizza.use-case';
import { SearchPizzasUseCase } from './application/use-cases/search-pizzas.use-case';
import { FilterPizzasUseCase } from './application/use-cases/filter-pizzas.use-case';
import { PizzaController } from './presentation/controllers/pizza.controller';

@Module({
  imports: [PizzaInfrastructureModule],
  controllers: [PizzaController],
  providers: [
    PizzaService,
    ListPizzasUseCase,
    GetPizzaByIdUseCase,
    CreatePizzaUseCase,
    UpdatePizzaUseCase,
    DeletePizzaUseCase,
    SearchPizzasUseCase,
    FilterPizzasUseCase,
  ],
  exports: [PizzaService],
})
export class PizzaModule {}

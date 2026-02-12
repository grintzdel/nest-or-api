import { Module } from '@nestjs/common';
import { DrinkInfrastructureModule } from './infrastructure/drink.infrastructure.module';
import { DrinkService } from './application/service/drink.service';
import { ListDrinksUseCase } from './application/use-cases/list-drinks.use-case';
import { GetDrinkByIdUseCase } from './application/use-cases/get-drink-by-id.use-case';
import { CreateDrinkUseCase } from './application/use-cases/create-drink.use-case';
import { UpdateDrinkUseCase } from './application/use-cases/update-drink.use-case';
import { DeleteDrinkUseCase } from './application/use-cases/delete-drink.use-case';
import { FilterDrinksUseCase } from './application/use-cases/filter-drinks.use-case';
import { DrinkController } from './presentation/controllers/drink.controller';

@Module({
  imports: [DrinkInfrastructureModule],
  controllers: [DrinkController],
  providers: [
    DrinkService,
    ListDrinksUseCase,
    GetDrinkByIdUseCase,
    CreateDrinkUseCase,
    UpdateDrinkUseCase,
    DeleteDrinkUseCase,
    FilterDrinksUseCase,
  ],
  exports: [DrinkService],
})
export class DrinkModule {}

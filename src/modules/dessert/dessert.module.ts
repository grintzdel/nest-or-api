import { Module } from '@nestjs/common';
import { DessertInfrastructureModule } from './infrastructure/dessert.infrastructure.module';
import { DessertService } from './application/service/dessert.service';
import { ListDessertsUseCase } from './application/use-cases/list-desserts.use-case';
import { GetDessertByIdUseCase } from './application/use-cases/get-dessert-by-id.use-case';
import { CreateDessertUseCase } from './application/use-cases/create-dessert.use-case';
import { UpdateDessertUseCase } from './application/use-cases/update-dessert.use-case';
import { DeleteDessertUseCase } from './application/use-cases/delete-dessert.use-case';
import { FilterDessertsUseCase } from './application/use-cases/filter-desserts.use-case';
import { DessertController } from './presentation/controllers/dessert.controller';

@Module({
  imports: [DessertInfrastructureModule],
  controllers: [DessertController],
  providers: [
    DessertService,
    ListDessertsUseCase,
    GetDessertByIdUseCase,
    CreateDessertUseCase,
    UpdateDessertUseCase,
    DeleteDessertUseCase,
    FilterDessertsUseCase,
  ],
  exports: [DessertService],
})
export class DessertModule {}

import { Module } from '@nestjs/common';
import { MenuService } from './application/service/menu.service';
import { CalculateTotalUseCase } from './application/use-cases/calculate-total.use-case';
import { CalculateDiscountUseCase } from './application/use-cases/calculate-discount.use-case';

@Module({
  providers: [MenuService, CalculateTotalUseCase, CalculateDiscountUseCase],
  exports: [MenuService],
})
export class MenuModule {}

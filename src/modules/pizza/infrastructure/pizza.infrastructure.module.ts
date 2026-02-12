import { Module } from '@nestjs/common';
import { PIZZA_REPOSITORY } from '../domain/repositories/pizza.repository.token';
import { PizzaRepositoryDrizzlePg } from './repositories/pizza.repository.drizzle-pg';
import { DrizzlePgModule } from '../../../infrastructure/adapter/drizzle-pg/drizzle-pg.module';

@Module({
  imports: [DrizzlePgModule],
  providers: [
    {
      provide: PIZZA_REPOSITORY,
      useClass: PizzaRepositoryDrizzlePg,
    },
  ],
  exports: [PIZZA_REPOSITORY],
})
export class PizzaInfrastructureModule {}

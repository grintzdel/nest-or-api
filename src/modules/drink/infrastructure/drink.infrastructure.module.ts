import { Module } from '@nestjs/common';
import { DRINK_REPOSITORY } from '../domain/repositories/drink.repository.token';
import { DrinkRepositoryDrizzlePg } from './repositories/drink.repository.drizzle-pg';
import { DrizzlePgModule } from '../../../infrastructure/adapter/drizzle-pg/drizzle-pg.module';

@Module({
  imports: [DrizzlePgModule],
  providers: [
    {
      provide: DRINK_REPOSITORY,
      useClass: DrinkRepositoryDrizzlePg,
    },
  ],
  exports: [DRINK_REPOSITORY],
})
export class DrinkInfrastructureModule {}

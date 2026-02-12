import { Module } from '@nestjs/common';
import { DESSERT_REPOSITORY } from '../domain/repositories/dessert.repository.token';
import { DessertRepositoryDrizzlePg } from './repositories/dessert.repository.drizzle-pg';
import { DrizzlePgModule } from '../../../infrastructure/adapter/drizzle-pg/drizzle-pg.module';

@Module({
  imports: [DrizzlePgModule],
  providers: [
    {
      provide: DESSERT_REPOSITORY,
      useClass: DessertRepositoryDrizzlePg,
    },
  ],
  exports: [DESSERT_REPOSITORY],
})
export class DessertInfrastructureModule {}

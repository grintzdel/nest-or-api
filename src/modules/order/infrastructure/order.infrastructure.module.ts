import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../domain/repositories/order.repository.token';
import { OrderRepositoryDrizzlePg } from './repositories/order.repository.drizzle-pg';
import { DrizzlePgModule } from '../../../infrastructure/adapter/drizzle-pg/drizzle-pg.module';

@Module({
  imports: [DrizzlePgModule],
  providers: [
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepositoryDrizzlePg,
    },
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrderInfrastructureModule {}

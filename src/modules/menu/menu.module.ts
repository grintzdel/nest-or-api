import { Module } from '@nestjs/common';
import { MenuService } from './application/service/menu.service';

@Module({
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}

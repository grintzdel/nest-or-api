import { IsArray, IsInt } from 'class-validator';

export class CreateOrderReqDto {
  @IsArray()
  @IsInt({ each: true })
  pizzas: number[];

  @IsArray()
  @IsInt({ each: true })
  drinks: number[];

  @IsArray()
  @IsInt({ each: true })
  desserts: number[];
}

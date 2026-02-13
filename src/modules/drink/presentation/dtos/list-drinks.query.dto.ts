import { IsOptional, IsString, IsBooleanString, IsEnum } from 'class-validator';
import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';

export class ListDrinksQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBooleanString()
  available?: string;

  @IsOptional()
  @IsBooleanString()
  withAlcohol?: string;

  @IsOptional()
  @IsEnum(DrinkSizeEnum)
  size?: DrinkSizeEnum;
}

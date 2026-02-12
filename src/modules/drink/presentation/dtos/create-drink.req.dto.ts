import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';

export class CreateDrinkReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsEnum(DrinkSizeEnum)
  size: DrinkSizeEnum;

  @IsBoolean()
  withAlcohol: boolean;

  @IsBoolean()
  available: boolean;
}

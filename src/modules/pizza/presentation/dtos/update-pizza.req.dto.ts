import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsBoolean,
  IsPositive,
  ArrayNotEmpty,
  MinLength,
} from 'class-validator';

export class UpdatePizzaReqDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @IsBoolean()
  available: boolean;
}

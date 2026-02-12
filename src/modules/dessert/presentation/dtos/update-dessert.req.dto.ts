import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsPositive,
} from 'class-validator';

export class UpdateDessertReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  available: boolean;
}

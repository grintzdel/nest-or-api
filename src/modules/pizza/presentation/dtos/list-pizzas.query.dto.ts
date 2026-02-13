import { IsOptional, IsString, IsBooleanString } from 'class-validator';

export class ListPizzasQueryDto {
  @IsOptional()
  @IsString()
  ingredient?: string;

  @IsOptional()
  @IsString()
  ingredients?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBooleanString()
  available?: string;
}

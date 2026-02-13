import { IsOptional, IsString, IsBooleanString } from 'class-validator';

export class ListDessertsQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBooleanString()
  available?: string;
}

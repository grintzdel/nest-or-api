import { IsOptional, IsBooleanString } from 'class-validator';

export class ListOrdersQueryDto {
  @IsOptional()
  @IsBooleanString()
  processed?: string;
}

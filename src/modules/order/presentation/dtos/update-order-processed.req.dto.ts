import { IsBoolean } from 'class-validator';

export class UpdateOrderProcessedReqDto {
  @IsBoolean()
  processed: boolean;
}

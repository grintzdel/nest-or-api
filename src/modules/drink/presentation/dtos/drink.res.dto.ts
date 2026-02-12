import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';

export class DrinkResDto {
  id: number;
  name: string;
  price: number;
  size: DrinkSizeEnum;
  withAlcohol: boolean;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

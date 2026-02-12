import { Inject, Injectable } from '@nestjs/common';
import { DRINK_REPOSITORY } from '../../domain/repositories/drink.repository.token';
import type { IDrinkRepository } from '../../domain/repositories/drink.repository.interface';
import { DrinkEntity } from '../../domain/entities/drink.entity';
import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';

export type DrinkFilters = {
  name?: string;
  available?: boolean;
  withAlcohol?: boolean;
  size?: DrinkSizeEnum;
};

@Injectable()
export class FilterDrinksUseCase {
  constructor(
    @Inject(DRINK_REPOSITORY)
    private readonly drinkRepository: IDrinkRepository,
  ) {}

  async execute(filters: DrinkFilters): Promise<DrinkEntity[]> {
    const all = await this.drinkRepository.findAll();

    return all.filter((drink) => {
      if (
        filters.name !== undefined &&
        !drink.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.available !== undefined &&
        drink.available !== filters.available
      ) {
        return false;
      }

      if (
        filters.withAlcohol !== undefined &&
        drink.withAlcohol !== filters.withAlcohol
      ) {
        return false;
      }

      if (filters.size !== undefined && drink.size !== filters.size) {
        return false;
      }

      return true;
    });
  }
}

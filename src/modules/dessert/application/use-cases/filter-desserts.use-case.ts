import { Inject, Injectable } from '@nestjs/common';
import { DESSERT_REPOSITORY } from '../../domain/repositories/dessert.repository.token';
import type { IDessertRepository } from '../../domain/repositories/dessert.repository.interface';
import { DessertEntity } from '../../domain/entities/dessert.entity';

export type DessertFilters = {
  name?: string;
  available?: boolean;
};

@Injectable()
export class FilterDessertsUseCase {
  constructor(
    @Inject(DESSERT_REPOSITORY)
    private readonly dessertRepository: IDessertRepository,
  ) {}

  async execute(filters: DessertFilters): Promise<DessertEntity[]> {
    const all = await this.dessertRepository.findAll();

    return all.filter((dessert) => {
      if (
        filters.name !== undefined &&
        !dessert.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.available !== undefined &&
        dessert.available !== filters.available
      ) {
        return false;
      }

      return true;
    });
  }
}

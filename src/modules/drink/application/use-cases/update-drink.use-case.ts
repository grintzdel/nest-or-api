import { Inject, Injectable } from '@nestjs/common';
import { DRINK_REPOSITORY } from '../../domain/repositories/drink.repository.token';
import type { IDrinkRepository } from '../../domain/repositories/drink.repository.interface';
import { DrinkNotFoundError } from '../../domain/errors/drink-not-found.error';
import { DrinkEntity } from '../../domain/entities/drink.entity';
import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';

@Injectable()
export class UpdateDrinkUseCase {
  constructor(
    @Inject(DRINK_REPOSITORY)
    private readonly drinkRepository: IDrinkRepository,
  ) {}

  async execute(
    id: number,
    data: {
      name: string;
      price: number;
      size: DrinkSizeEnum;
      withAlcohol: boolean;
      available: boolean;
    },
  ): Promise<DrinkEntity> {
    const existing = await this.drinkRepository.findById(id);
    if (!existing) {
      throw new DrinkNotFoundError(id);
    }
    const updated = existing.update(data);
    return await this.drinkRepository.update(updated);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { DRINK_REPOSITORY } from '../../domain/repositories/drink.repository.token';
import type { IDrinkRepository } from '../../domain/repositories/drink.repository.interface';
import { DrinkNotFoundError } from '../../domain/errors/drink-not-found.error';
import { DrinkEntity } from '../../domain/entities/drink.entity';

@Injectable()
export class GetDrinkByIdUseCase {
  constructor(
    @Inject(DRINK_REPOSITORY)
    private readonly drinkRepository: IDrinkRepository,
  ) {}

  async execute(id: number): Promise<DrinkEntity> {
    const drink = await this.drinkRepository.findById(id);
    if (!drink) {
      throw new DrinkNotFoundError(id);
    }
    return drink;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { DRINK_REPOSITORY } from '../../domain/repositories/drink.repository.token';
import type { IDrinkRepository } from '../../domain/repositories/drink.repository.interface';
import { DrinkEntity } from '../../domain/entities/drink.entity';

@Injectable()
export class ListDrinksUseCase {
  constructor(
    @Inject(DRINK_REPOSITORY)
    private readonly drinkRepository: IDrinkRepository,
  ) {}

  async execute(): Promise<DrinkEntity[]> {
    return await this.drinkRepository.findAll();
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { DRINK_REPOSITORY } from '../../domain/repositories/drink.repository.token';
import type { IDrinkRepository } from '../../domain/repositories/drink.repository.interface';
import { DrinkNotFoundError } from '../../domain/errors/drink-not-found.error';

@Injectable()
export class DeleteDrinkUseCase {
  constructor(
    @Inject(DRINK_REPOSITORY)
    private readonly drinkRepository: IDrinkRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.drinkRepository.findById(id);
    if (!existing) {
      throw new DrinkNotFoundError(id);
    }
    await this.drinkRepository.delete(id);
  }
}

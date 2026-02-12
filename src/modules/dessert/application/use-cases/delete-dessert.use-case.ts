import { Inject, Injectable } from '@nestjs/common';
import { DESSERT_REPOSITORY } from '../../domain/repositories/dessert.repository.token';
import type { IDessertRepository } from '../../domain/repositories/dessert.repository.interface';
import { DessertNotFoundError } from '../../domain/errors/dessert-not-found.error';

@Injectable()
export class DeleteDessertUseCase {
  constructor(
    @Inject(DESSERT_REPOSITORY)
    private readonly dessertRepository: IDessertRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.dessertRepository.findById(id);
    if (!existing) {
      throw new DessertNotFoundError(id);
    }
    await this.dessertRepository.delete(id);
  }
}

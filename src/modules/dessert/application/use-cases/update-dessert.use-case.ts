import { Inject, Injectable } from '@nestjs/common';
import { DESSERT_REPOSITORY } from '../../domain/repositories/dessert.repository.token';
import type { IDessertRepository } from '../../domain/repositories/dessert.repository.interface';
import { DessertNotFoundError } from '../../domain/errors/dessert-not-found.error';
import { DessertEntity } from '../../domain/entities/dessert.entity';

@Injectable()
export class UpdateDessertUseCase {
  constructor(
    @Inject(DESSERT_REPOSITORY)
    private readonly dessertRepository: IDessertRepository,
  ) {}

  async execute(
    id: number,
    data: { name: string; price: number; available: boolean },
  ): Promise<DessertEntity> {
    const existing = await this.dessertRepository.findById(id);
    if (!existing) {
      throw new DessertNotFoundError(id);
    }
    const updated = existing.update(data);
    return await this.dessertRepository.update(updated);
  }
}

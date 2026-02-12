import { Inject, Injectable } from '@nestjs/common';
import { DESSERT_REPOSITORY } from '../../domain/repositories/dessert.repository.token';
import type { IDessertRepository } from '../../domain/repositories/dessert.repository.interface';
import { DessertNotFoundError } from '../../domain/errors/dessert-not-found.error';
import { DessertEntity } from '../../domain/entities/dessert.entity';

@Injectable()
export class GetDessertByIdUseCase {
  constructor(
    @Inject(DESSERT_REPOSITORY)
    private readonly dessertRepository: IDessertRepository,
  ) {}

  async execute(id: number): Promise<DessertEntity> {
    const dessert = await this.dessertRepository.findById(id);
    if (!dessert) {
      throw new DessertNotFoundError(id);
    }
    return dessert;
  }
}

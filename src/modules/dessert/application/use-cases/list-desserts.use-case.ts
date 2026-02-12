import { Inject, Injectable } from '@nestjs/common';
import { DESSERT_REPOSITORY } from '../../domain/repositories/dessert.repository.token';
import type { IDessertRepository } from '../../domain/repositories/dessert.repository.interface';
import { DessertEntity } from '../../domain/entities/dessert.entity';

@Injectable()
export class ListDessertsUseCase {
  constructor(
    @Inject(DESSERT_REPOSITORY)
    private readonly dessertRepository: IDessertRepository,
  ) {}

  async execute(): Promise<DessertEntity[]> {
    return await this.dessertRepository.findAll();
  }
}

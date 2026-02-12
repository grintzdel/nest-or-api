import { Inject, Injectable } from '@nestjs/common';
import { DESSERT_REPOSITORY } from '../../domain/repositories/dessert.repository.token';
import type { IDessertRepository } from '../../domain/repositories/dessert.repository.interface';
import { DessertEntity } from '../../domain/entities/dessert.entity';

@Injectable()
export class CreateDessertUseCase {
  constructor(
    @Inject(DESSERT_REPOSITORY)
    private readonly dessertRepository: IDessertRepository,
  ) {}

  async execute(data: {
    name: string;
    price: number;
    available: boolean;
  }): Promise<DessertEntity> {
    const dessert = DessertEntity.create(data);
    return await this.dessertRepository.create(dessert);
  }
}

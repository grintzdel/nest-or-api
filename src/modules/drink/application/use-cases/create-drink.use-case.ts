import { Inject, Injectable } from '@nestjs/common';
import { DRINK_REPOSITORY } from '../../domain/repositories/drink.repository.token';
import type { IDrinkRepository } from '../../domain/repositories/drink.repository.interface';
import { DrinkEntity } from '../../domain/entities/drink.entity';
import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';

@Injectable()
export class CreateDrinkUseCase {
  constructor(
    @Inject(DRINK_REPOSITORY)
    private readonly drinkRepository: IDrinkRepository,
  ) {}

  async execute(data: {
    name: string;
    price: number;
    size: DrinkSizeEnum;
    withAlcohol: boolean;
    available: boolean;
  }): Promise<DrinkEntity> {
    const drink = DrinkEntity.create(data);
    return await this.drinkRepository.create(drink);
  }
}

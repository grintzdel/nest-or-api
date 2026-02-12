import { Inject, Injectable } from '@nestjs/common';
import { PIZZA_REPOSITORY } from '../../domain/repositories/pizza.repository.token';
import type { IPizzaRepository } from '../../domain/repositories/pizza.repository.interface';
import { PizzaEntity } from '../../domain/entities/pizza.entity';

@Injectable()
export class CreatePizzaUseCase {
  constructor(
    @Inject(PIZZA_REPOSITORY)
    private readonly pizzaRepository: IPizzaRepository,
  ) {}

  async execute(data: {
    name: string;
    ingredients: string[];
    price: number;
    available: boolean;
  }): Promise<PizzaEntity> {
    const pizza = PizzaEntity.create(data);
    return await this.pizzaRepository.create(pizza);
  }
}

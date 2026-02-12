import { Inject, Injectable } from '@nestjs/common';
import { PIZZA_REPOSITORY } from '../../domain/repositories/pizza.repository.token';
import type { IPizzaRepository } from '../../domain/repositories/pizza.repository.interface';
import { PizzaNotFoundError } from '../../domain/errors/pizza-not-found.error';
import { PizzaEntity } from '../../domain/entities/pizza.entity';

@Injectable()
export class UpdatePizzaUseCase {
  constructor(
    @Inject(PIZZA_REPOSITORY)
    private readonly pizzaRepository: IPizzaRepository,
  ) {}

  async execute(
    id: number,
    data: {
      name: string;
      ingredients: string[];
      price: number;
      available: boolean;
    },
  ): Promise<PizzaEntity> {
    const existing = await this.pizzaRepository.findById(id);
    if (!existing) {
      throw new PizzaNotFoundError(id);
    }
    const updated = existing.update(data);
    return await this.pizzaRepository.update(updated);
  }
}

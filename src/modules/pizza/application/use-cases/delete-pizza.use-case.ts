import { Inject, Injectable } from '@nestjs/common';
import { PIZZA_REPOSITORY } from '../../domain/repositories/pizza.repository.token';
import type { IPizzaRepository } from '../../domain/repositories/pizza.repository.interface';
import { PizzaNotFoundError } from '../../domain/errors/pizza-not-found.error';

@Injectable()
export class DeletePizzaUseCase {
  constructor(
    @Inject(PIZZA_REPOSITORY)
    private readonly pizzaRepository: IPizzaRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.pizzaRepository.findById(id);
    if (!existing) {
      throw new PizzaNotFoundError(id);
    }
    await this.pizzaRepository.delete(id);
  }
}

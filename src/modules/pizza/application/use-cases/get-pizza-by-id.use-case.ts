import { Inject, Injectable } from '@nestjs/common';
import { PIZZA_REPOSITORY } from '../../domain/repositories/pizza.repository.token';
import type { IPizzaRepository } from '../../domain/repositories/pizza.repository.interface';
import { PizzaNotFoundError } from '../../domain/errors/pizza-not-found.error';
import { PizzaEntity } from '../../domain/entities/pizza.entity';

@Injectable()
export class GetPizzaByIdUseCase {
  constructor(
    @Inject(PIZZA_REPOSITORY)
    private readonly pizzaRepository: IPizzaRepository,
  ) {}

  async execute(id: number): Promise<PizzaEntity> {
    const pizza = await this.pizzaRepository.findById(id);
    if (!pizza) {
      throw new PizzaNotFoundError(id);
    }
    return pizza;
  }
}

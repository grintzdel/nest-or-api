import { Inject, Injectable } from '@nestjs/common';
import { PIZZA_REPOSITORY } from '../../domain/repositories/pizza.repository.token';
import type { IPizzaRepository } from '../../domain/repositories/pizza.repository.interface';
import { PizzaEntity } from '../../domain/entities/pizza.entity';

@Injectable()
export class ListPizzasUseCase {
  constructor(
    @Inject(PIZZA_REPOSITORY)
    private readonly pizzaRepository: IPizzaRepository,
  ) {}

  async execute(): Promise<PizzaEntity[]> {
    return await this.pizzaRepository.findAll();
  }
}

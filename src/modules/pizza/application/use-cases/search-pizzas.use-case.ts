import { Inject, Injectable } from '@nestjs/common';
import { PIZZA_REPOSITORY } from '../../domain/repositories/pizza.repository.token';
import type { IPizzaRepository } from '../../domain/repositories/pizza.repository.interface';
import { PizzaEntity } from '../../domain/entities/pizza.entity';

@Injectable()
export class SearchPizzasUseCase {
  constructor(
    @Inject(PIZZA_REPOSITORY)
    private readonly pizzaRepository: IPizzaRepository,
  ) {}

  async execute(ingredientList: string[]): Promise<PizzaEntity[]> {
    const all = await this.pizzaRepository.findAll();
    const normalized = ingredientList.map((i) => i.trim().toLowerCase());
    return all.filter((pizza) =>
      normalized.every((ingredient) =>
        pizza.ingredients.some((pi) => pi.toLowerCase().includes(ingredient)),
      ),
    );
  }
}

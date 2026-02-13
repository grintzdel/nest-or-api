import { Inject, Injectable } from '@nestjs/common';
import { PIZZA_REPOSITORY } from '../../domain/repositories/pizza.repository.token';
import type { IPizzaRepository } from '../../domain/repositories/pizza.repository.interface';
import { PizzaEntity } from '../../domain/entities/pizza.entity';

export type PizzaFilters = {
  ingredient?: string;
  ingredients?: string;
  name?: string;
  available?: boolean;
};

@Injectable()
export class FilterPizzasUseCase {
  constructor(
    @Inject(PIZZA_REPOSITORY)
    private readonly pizzaRepository: IPizzaRepository,
  ) {}

  async execute(filters: PizzaFilters): Promise<PizzaEntity[]> {
    let results = await this.pizzaRepository.findAll();

    const ingredientList = this.buildIngredientList(filters);
    if (ingredientList.length > 0) {
      results = results.filter((pizza) =>
        ingredientList.every((ingredient) =>
          pizza.ingredients.some((pi) => pi.toLowerCase().includes(ingredient)),
        ),
      );
    }

    if (filters.name !== undefined) {
      const lower = filters.name.toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(lower));
    }

    if (filters.available !== undefined) {
      results = results.filter((p) => p.available === filters.available);
    }

    return results;
  }

  private buildIngredientList(filters: PizzaFilters): string[] {
    if (filters.ingredients) {
      return filters.ingredients.split(',').map((i) => i.trim().toLowerCase());
    }
    if (filters.ingredient) {
      return [filters.ingredient.trim().toLowerCase()];
    }
    return [];
  }
}

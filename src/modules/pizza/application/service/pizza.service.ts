import { Injectable } from '@nestjs/common';
import { ListPizzasUseCase } from '../use-cases/list-pizzas.use-case';
import { GetPizzaByIdUseCase } from '../use-cases/get-pizza-by-id.use-case';
import { CreatePizzaUseCase } from '../use-cases/create-pizza.use-case';
import { UpdatePizzaUseCase } from '../use-cases/update-pizza.use-case';
import { DeletePizzaUseCase } from '../use-cases/delete-pizza.use-case';
import { SearchPizzasUseCase } from '../use-cases/search-pizzas.use-case';
import { FilterPizzasUseCase } from '../use-cases/filter-pizzas.use-case';
import type { PizzaFilters } from '../use-cases/filter-pizzas.use-case';
import { PizzaEntity } from '../../domain/entities/pizza.entity';

@Injectable()
export class PizzaService {
  constructor(
    private readonly listPizzasUseCase: ListPizzasUseCase,
    private readonly getPizzaByIdUseCase: GetPizzaByIdUseCase,
    private readonly createPizzaUseCase: CreatePizzaUseCase,
    private readonly updatePizzaUseCase: UpdatePizzaUseCase,
    private readonly deletePizzaUseCase: DeletePizzaUseCase,
    private readonly searchPizzasUseCase: SearchPizzasUseCase,
    private readonly filterPizzasUseCase: FilterPizzasUseCase,
  ) {}

  async listPizzas(): Promise<PizzaEntity[]> {
    return await this.listPizzasUseCase.execute();
  }

  async getPizzaById(id: number): Promise<PizzaEntity> {
    return await this.getPizzaByIdUseCase.execute(id);
  }

  async createPizza(data: {
    name: string;
    ingredients: string[];
    price: number;
    available: boolean;
  }): Promise<PizzaEntity> {
    return await this.createPizzaUseCase.execute(data);
  }

  async updatePizza(
    id: number,
    data: {
      name: string;
      ingredients: string[];
      price: number;
      available: boolean;
    },
  ): Promise<PizzaEntity> {
    return await this.updatePizzaUseCase.execute(id, data);
  }

  async deletePizza(id: number): Promise<void> {
    await this.deletePizzaUseCase.execute(id);
  }

  async searchByIngredients(ingredients: string[]): Promise<PizzaEntity[]> {
    return await this.searchPizzasUseCase.execute(ingredients);
  }

  async filterPizzas(filters: PizzaFilters): Promise<PizzaEntity[]> {
    return await this.filterPizzasUseCase.execute(filters);
  }
}

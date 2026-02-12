import { Injectable } from '@nestjs/common';
import { ListDrinksUseCase } from '../use-cases/list-drinks.use-case';
import { GetDrinkByIdUseCase } from '../use-cases/get-drink-by-id.use-case';
import { CreateDrinkUseCase } from '../use-cases/create-drink.use-case';
import { UpdateDrinkUseCase } from '../use-cases/update-drink.use-case';
import { DeleteDrinkUseCase } from '../use-cases/delete-drink.use-case';
import {
  FilterDrinksUseCase,
  type DrinkFilters,
} from '../use-cases/filter-drinks.use-case';
import { DrinkEntity } from '../../domain/entities/drink.entity';
import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';

@Injectable()
export class DrinkService {
  constructor(
    private readonly listDrinksUseCase: ListDrinksUseCase,
    private readonly getDrinkByIdUseCase: GetDrinkByIdUseCase,
    private readonly createDrinkUseCase: CreateDrinkUseCase,
    private readonly updateDrinkUseCase: UpdateDrinkUseCase,
    private readonly deleteDrinkUseCase: DeleteDrinkUseCase,
    private readonly filterDrinksUseCase: FilterDrinksUseCase,
  ) {}

  async listDrinks(): Promise<DrinkEntity[]> {
    return await this.listDrinksUseCase.execute();
  }

  async getDrinkById(id: number): Promise<DrinkEntity> {
    return await this.getDrinkByIdUseCase.execute(id);
  }

  async createDrink(data: {
    name: string;
    price: number;
    size: DrinkSizeEnum;
    withAlcohol: boolean;
    available: boolean;
  }): Promise<DrinkEntity> {
    return await this.createDrinkUseCase.execute(data);
  }

  async updateDrink(
    id: number,
    data: {
      name: string;
      price: number;
      size: DrinkSizeEnum;
      withAlcohol: boolean;
      available: boolean;
    },
  ): Promise<DrinkEntity> {
    return await this.updateDrinkUseCase.execute(id, data);
  }

  async deleteDrink(id: number): Promise<void> {
    await this.deleteDrinkUseCase.execute(id);
  }

  async filterDrinks(filters: DrinkFilters): Promise<DrinkEntity[]> {
    return await this.filterDrinksUseCase.execute(filters);
  }
}

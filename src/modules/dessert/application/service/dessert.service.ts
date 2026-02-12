import { Injectable } from '@nestjs/common';
import { ListDessertsUseCase } from '../use-cases/list-desserts.use-case';
import { GetDessertByIdUseCase } from '../use-cases/get-dessert-by-id.use-case';
import { CreateDessertUseCase } from '../use-cases/create-dessert.use-case';
import { UpdateDessertUseCase } from '../use-cases/update-dessert.use-case';
import { DeleteDessertUseCase } from '../use-cases/delete-dessert.use-case';
import {
  FilterDessertsUseCase,
  type DessertFilters,
} from '../use-cases/filter-desserts.use-case';
import { DessertEntity } from '../../domain/entities/dessert.entity';

@Injectable()
export class DessertService {
  constructor(
    private readonly listDessertsUseCase: ListDessertsUseCase,
    private readonly getDessertByIdUseCase: GetDessertByIdUseCase,
    private readonly createDessertUseCase: CreateDessertUseCase,
    private readonly updateDessertUseCase: UpdateDessertUseCase,
    private readonly deleteDessertUseCase: DeleteDessertUseCase,
    private readonly filterDessertsUseCase: FilterDessertsUseCase,
  ) {}

  async listDesserts(): Promise<DessertEntity[]> {
    return await this.listDessertsUseCase.execute();
  }

  async getDessertById(id: number): Promise<DessertEntity> {
    return await this.getDessertByIdUseCase.execute(id);
  }

  async createDessert(data: {
    name: string;
    price: number;
    available: boolean;
  }): Promise<DessertEntity> {
    return await this.createDessertUseCase.execute(data);
  }

  async updateDessert(
    id: number,
    data: { name: string; price: number; available: boolean },
  ): Promise<DessertEntity> {
    return await this.updateDessertUseCase.execute(id, data);
  }

  async deleteDessert(id: number): Promise<void> {
    await this.deleteDessertUseCase.execute(id);
  }

  async filterDesserts(filters: DessertFilters): Promise<DessertEntity[]> {
    return await this.filterDessertsUseCase.execute(filters);
  }
}

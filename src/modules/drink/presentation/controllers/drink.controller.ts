import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DrinkService } from '../../application/service/drink.service';
import { DrinkSizeEnum } from '../../domain/enums/drink-size.enum';
import { DrinkResDto } from '../dtos/drink.res.dto';
import { CreateDrinkReqDto } from '../dtos/create-drink.req.dto';
import { UpdateDrinkReqDto } from '../dtos/update-drink.req.dto';

@Controller('drinks')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get()
  async list(
    @Query('name') name?: string,
    @Query('available') available?: string,
    @Query('withAlcohol') withAlcohol?: string,
    @Query('size') size?: DrinkSizeEnum,
  ): Promise<DrinkResDto[]> {
    const hasFilters =
      name !== undefined ||
      available !== undefined ||
      withAlcohol !== undefined ||
      size !== undefined;

    if (hasFilters) {
      const drinks = await this.drinkService.filterDrinks({
        name,
        available: available !== undefined ? available === 'true' : undefined,
        withAlcohol:
          withAlcohol !== undefined ? withAlcohol === 'true' : undefined,
        size,
      });
      return drinks.map((d) => d.toJson());
    }

    const drinks = await this.drinkService.listDrinks();
    return drinks.map((d) => d.toJson());
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<DrinkResDto> {
    const drink = await this.drinkService.getDrinkById(id);
    return drink.toJson();
  }

  @Post()
  async create(@Body() dto: CreateDrinkReqDto): Promise<DrinkResDto> {
    const drink = await this.drinkService.createDrink(dto);
    return drink.toJson();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDrinkReqDto,
  ): Promise<DrinkResDto> {
    const drink = await this.drinkService.updateDrink(id, dto);
    return drink.toJson();
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.drinkService.deleteDrink(id);
    return { message: `Drink ${id} deleted` };
  }
}

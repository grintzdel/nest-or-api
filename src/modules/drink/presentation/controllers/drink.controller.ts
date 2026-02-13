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
import { DrinkResDto } from '../dtos/drink.res.dto';
import { CreateDrinkReqDto } from '../dtos/create-drink.req.dto';
import { UpdateDrinkReqDto } from '../dtos/update-drink.req.dto';
import { ListDrinksQueryDto } from '../dtos/list-drinks.query.dto';

@Controller('drinks')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get()
  async list(@Query() query: ListDrinksQueryDto): Promise<DrinkResDto[]> {
    const drinks = await this.drinkService.filterDrinks({
      name: query.name,
      available:
        query.available !== undefined ? query.available === 'true' : undefined,
      withAlcohol:
        query.withAlcohol !== undefined
          ? query.withAlcohol === 'true'
          : undefined,
      size: query.size,
    });
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

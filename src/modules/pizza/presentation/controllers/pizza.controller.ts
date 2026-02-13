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
import { PizzaService } from '../../application/service/pizza.service';
import { PizzaResDto } from '../dtos/pizza.res.dto';
import { CreatePizzaReqDto } from '../dtos/create-pizza.req.dto';
import { UpdatePizzaReqDto } from '../dtos/update-pizza.req.dto';
import { ListPizzasQueryDto } from '../dtos/list-pizzas.query.dto';

@Controller('pizzas')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get()
  async list(@Query() query: ListPizzasQueryDto): Promise<PizzaResDto[]> {
    const pizzas = await this.pizzaService.filterPizzas({
      ingredient: query.ingredient,
      ingredients: query.ingredients,
      name: query.name,
      available:
        query.available !== undefined ? query.available === 'true' : undefined,
    });
    return pizzas.map((p) => p.toJson());
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<PizzaResDto> {
    const pizza = await this.pizzaService.getPizzaById(id);
    return pizza.toJson();
  }

  @Post()
  async create(@Body() dto: CreatePizzaReqDto): Promise<PizzaResDto> {
    const pizza = await this.pizzaService.createPizza(dto);
    return pizza.toJson();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePizzaReqDto,
  ): Promise<PizzaResDto> {
    const pizza = await this.pizzaService.updatePizza(id, dto);
    return pizza.toJson();
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.pizzaService.deletePizza(id);
    return { message: `Pizza ${id} deleted` };
  }
}

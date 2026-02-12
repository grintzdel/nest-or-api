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

@Controller('pizzas')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get()
  async list(
    @Query('ingredient') ingredient?: string,
    @Query('ingredients') ingredients?: string,
    @Query('name') name?: string,
    @Query('available') available?: string,
  ): Promise<PizzaResDto[]> {
    if (ingredient || ingredients) {
      const ingredientList = ingredients
        ? ingredients.split(',').map((i) => i.trim().toLowerCase())
        : [ingredient!.trim().toLowerCase()];
      let pizzas =
        await this.pizzaService.searchByIngredients(ingredientList);

      if (name) {
        const lower = name.toLowerCase();
        pizzas = pizzas.filter((p) =>
          p.name.toLowerCase().includes(lower),
        );
      }
      if (available !== undefined) {
        const bool = available === 'true';
        pizzas = pizzas.filter((p) => p.available === bool);
      }

      return pizzas.map((p) => p.toJson());
    }

    let pizzas = await this.pizzaService.listPizzas();

    if (name) {
      const lower = name.toLowerCase();
      pizzas = pizzas.filter((p) => p.name.toLowerCase().includes(lower));
    }
    if (available !== undefined) {
      const bool = available === 'true';
      pizzas = pizzas.filter((p) => p.available === bool);
    }

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

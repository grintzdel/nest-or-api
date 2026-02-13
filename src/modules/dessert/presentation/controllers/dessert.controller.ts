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
import { DessertService } from '../../application/service/dessert.service';
import { DessertResDto } from '../dtos/dessert.res.dto';
import { CreateDessertReqDto } from '../dtos/create-dessert.req.dto';
import { UpdateDessertReqDto } from '../dtos/update-dessert.req.dto';
import { ListDessertsQueryDto } from '../dtos/list-desserts.query.dto';

@Controller('desserts')
export class DessertController {
  constructor(private readonly dessertService: DessertService) {}

  @Get()
  async list(@Query() query: ListDessertsQueryDto): Promise<DessertResDto[]> {
    const desserts = await this.dessertService.filterDesserts({
      name: query.name,
      available:
        query.available !== undefined ? query.available === 'true' : undefined,
    });
    return desserts.map((d) => d.toJson());
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<DessertResDto> {
    const dessert = await this.dessertService.getDessertById(id);
    return dessert.toJson();
  }

  @Post()
  async create(@Body() dto: CreateDessertReqDto): Promise<DessertResDto> {
    const dessert = await this.dessertService.createDessert(dto);
    return dessert.toJson();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDessertReqDto,
  ): Promise<DessertResDto> {
    const dessert = await this.dessertService.updateDessert(id, dto);
    return dessert.toJson();
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.dessertService.deleteDessert(id);
    return { message: `Dessert ${id} deleted` };
  }
}

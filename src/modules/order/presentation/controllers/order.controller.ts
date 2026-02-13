import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from '../../application/service/order.service';
import { OrderResDto } from '../dtos/order.res.dto';
import { CreateOrderReqDto } from '../dtos/create-order.req.dto';
import { UpdateOrderReqDto } from '../dtos/update-order.req.dto';
import { UpdateOrderProcessedReqDto } from '../dtos/update-order-processed.req.dto';
import { ListOrdersQueryDto } from '../dtos/list-orders.query.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async list(@Query() query: ListOrdersQueryDto): Promise<OrderResDto[]> {
    const orders = await this.orderService.filterOrders({
      processed:
        query.processed !== undefined ? query.processed === 'true' : undefined,
    });
    return orders.map((o) => o.toJson());
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<OrderResDto> {
    const order = await this.orderService.getOrderById(id);
    return order.toJson();
  }

  @Post()
  async create(@Body() dto: CreateOrderReqDto): Promise<OrderResDto> {
    const order = await this.orderService.createOrder(dto);
    return order.toJson();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderReqDto,
  ): Promise<OrderResDto> {
    const order = await this.orderService.updateOrder(id, dto);
    return order.toJson();
  }

  @Patch(':id/processed')
  async updateProcessed(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderProcessedReqDto,
  ): Promise<OrderResDto> {
    const order = await this.orderService.updateProcessed(id, dto.processed);
    return order.toJson();
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.orderService.deleteOrder(id);
    return { message: `Order ${id} deleted` };
  }
}

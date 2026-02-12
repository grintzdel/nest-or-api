import { NotFoundException } from '@nestjs/common';

export class OrderNotFoundError extends NotFoundException {
  constructor(id: number) {
    super(`Order with id ${id} not found`);
  }
}

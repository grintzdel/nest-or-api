import { NotFoundException } from '@nestjs/common';

export class DessertNotFoundError extends NotFoundException {
  constructor(id: number) {
    super(`Dessert with id ${id} not found`);
  }
}

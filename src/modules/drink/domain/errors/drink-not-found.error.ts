import { NotFoundException } from '@nestjs/common';

export class DrinkNotFoundError extends NotFoundException {
  constructor(id: number) {
    super(`Drink with id ${id} not found`);
  }
}

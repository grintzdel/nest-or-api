import { NotFoundException } from '@nestjs/common';

export class PizzaNotFoundError extends NotFoundException {
  constructor(id: number) {
    super(`Pizza with id ${id} not found`);
  }
}

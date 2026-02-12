export class PizzaResDto {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

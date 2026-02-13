export class OrderResDto {
  id: number;
  pizzas: number[];
  drinks: number[];
  desserts: number[];
  totalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  processed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

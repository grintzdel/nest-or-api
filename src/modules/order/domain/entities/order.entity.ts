export interface OrderProps {
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

export class OrderEntity {
  private constructor(private readonly props: OrderProps) {}

  static create(data: Partial<OrderProps>): OrderEntity {
    return new OrderEntity({
      id: data.id ?? 0,
      pizzas: data.pizzas ?? [],
      drinks: data.drinks ?? [],
      desserts: data.desserts ?? [],
      totalPrice: data.totalPrice ?? 0,
      discountAmount: data.discountAmount ?? 0,
      discountPercentage: data.discountPercentage ?? 0,
      processed: data.processed ?? false,
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
      deletedAt: data.deletedAt ?? null,
    });
  }

  get id(): number {
    return this.props.id;
  }

  get pizzas(): number[] {
    return [...this.props.pizzas];
  }

  get drinks(): number[] {
    return [...this.props.drinks];
  }

  get desserts(): number[] {
    return [...this.props.desserts];
  }

  get totalPrice(): number {
    return this.props.totalPrice;
  }

  get discountAmount(): number {
    return this.props.discountAmount;
  }

  get discountPercentage(): number {
    return this.props.discountPercentage;
  }

  get processed(): boolean {
    return this.props.processed;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  update(data: Partial<Omit<OrderProps, 'id' | 'createdAt'>>): OrderEntity {
    return new OrderEntity({
      ...this.props,
      ...data,
      updatedAt: new Date(),
    });
  }

  toJson(): OrderProps {
    return {
      ...this.props,
      pizzas: [...this.props.pizzas],
      drinks: [...this.props.drinks],
      desserts: [...this.props.desserts],
    };
  }

  toPersistence(): OrderProps {
    return this.toJson();
  }
}

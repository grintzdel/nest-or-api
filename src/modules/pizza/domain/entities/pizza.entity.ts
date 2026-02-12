export interface PizzaProps {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class PizzaEntity {
  private constructor(private readonly props: PizzaProps) {}

  static create(data: Partial<PizzaProps>): PizzaEntity {
    return new PizzaEntity({
      id: data.id ?? 0,
      name: data.name ?? '',
      price: data.price ?? 0,
      ingredients: data.ingredients ?? [],
      available: data.available ?? true,
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
      deletedAt: data.deletedAt ?? null,
    });
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  get ingredients(): string[] {
    return [...this.props.ingredients];
  }

  get available(): boolean {
    return this.props.available;
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

  update(data: Partial<Omit<PizzaProps, 'id' | 'createdAt'>>): PizzaEntity {
    return new PizzaEntity({
      ...this.props,
      ...data,
      updatedAt: new Date(),
    });
  }

  toJson(): PizzaProps {
    return { ...this.props, ingredients: [...this.props.ingredients] };
  }

  toPersistence(): PizzaProps {
    return { ...this.props, ingredients: [...this.props.ingredients] };
  }
}

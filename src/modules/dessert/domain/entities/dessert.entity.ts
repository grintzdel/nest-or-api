export interface DessertProps {
  id: number;
  name: string;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class DessertEntity {
  private constructor(private readonly props: DessertProps) {}

  static create(data: Partial<DessertProps>): DessertEntity {
    return new DessertEntity({
      id: data.id ?? 0,
      name: data.name ?? '',
      price: data.price ?? 0,
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

  update(data: Partial<Omit<DessertProps, 'id' | 'createdAt'>>): DessertEntity {
    return new DessertEntity({
      ...this.props,
      ...data,
      updatedAt: new Date(),
    });
  }

  toJson(): DessertProps {
    return { ...this.props };
  }

  toPersistence(): DessertProps {
    return { ...this.props };
  }
}

import { DrinkSizeEnum } from '../enums/drink-size.enum';

export interface DrinkProps {
  id: number;
  name: string;
  price: number;
  size: DrinkSizeEnum;
  withAlcohol: boolean;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class DrinkEntity {
  private constructor(private readonly props: DrinkProps) {}

  static create(data: Partial<DrinkProps>): DrinkEntity {
    return new DrinkEntity({
      id: data.id ?? 0,
      name: data.name ?? '',
      price: data.price ?? 0,
      size: data.size ?? DrinkSizeEnum.LARGE,
      withAlcohol: data.withAlcohol ?? false,
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

  get size(): DrinkSizeEnum {
    return this.props.size;
  }

  get withAlcohol(): boolean {
    return this.props.withAlcohol;
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

  update(data: Partial<Omit<DrinkProps, 'id' | 'createdAt'>>): DrinkEntity {
    return new DrinkEntity({
      ...this.props,
      ...data,
      updatedAt: new Date(),
    });
  }

  toJson(): DrinkProps {
    return { ...this.props };
  }

  toPersistence(): DrinkProps {
    return { ...this.props };
  }
}

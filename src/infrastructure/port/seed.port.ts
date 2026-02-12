export const SEED = Symbol('SEED');

export interface ISeedPort {
  seed(): Promise<void>;
}

import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from '../adapter/drizzle-pg/schema/index';

export const DRIZZLE = Symbol('DRIZZLE');

export type DrizzleDB = NeonHttpDatabase<typeof schema>;

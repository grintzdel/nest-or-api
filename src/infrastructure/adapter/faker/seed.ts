import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../drizzle-pg/schema/index';
import { FakerAdapter } from './faker.adapter';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle({ client: sql, schema });

  const faker = new FakerAdapter(db);
  await faker.seed();

  console.log('Seed completed.');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

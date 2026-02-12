import { Global, Module } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { DRIZZLE } from '../../port/database.port';
import * as schema from './schema/index';
import 'dotenv/config';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => {
        const sql = neon(process.env.DATABASE_URL!);
        return drizzle({ client: sql, schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzlePgModule {}

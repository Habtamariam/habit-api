// Imports Nest's module decorator and configuration service.
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Imports Drizzle's PostgreSQL adapter and schema definitions.
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

// Identifies the Drizzle database connection in Nest's container.
export const DRIZZLE = Symbol('DRIZZLE_CONNECTION');

// Registers and exports the Drizzle database provider.
@Module({
  imports: [ConfigModule],
  providers: [
    {
      // Associates the database instance with the custom token.
      provide: DRIZZLE,
      // Injects configuration into the factory function.
      inject: [ConfigService],
      // Creates a PostgreSQL pool and wraps it with Drizzle.
      useFactory: (config: ConfigService) => {
        // Reads the database URL from the environment configuration.
        const pool = new Pool({
          connectionString: config.getOrThrow<string>('DATABASE_URL'),
        });

        // Exposes typed Drizzle queries using the application schema.
        return drizzle(pool, { schema });
      },
    },
  ],
  // Makes the database token available to importing feature modules.
  exports: [DRIZZLE],
})
export class DbModule {}

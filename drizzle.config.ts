// Loads DATABASE_URL from the local .env file.
import 'dotenv/config';
// Imports Drizzle Kit configuration types.
import { defineConfig } from 'drizzle-kit';

// Configures schema discovery and PostgreSQL migrations.
export default defineConfig({
  // Points Drizzle Kit to the table definitions.
  schema: './src/db/schema.ts',
  // Stores generated migration files here.
  out: './drizzle',
  // Uses PostgreSQL syntax for the migration dialect.
  dialect: 'postgresql',
  // Connects Drizzle Kit to the local database.
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

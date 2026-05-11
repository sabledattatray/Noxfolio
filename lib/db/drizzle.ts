import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  'postgres://localhost:5432/dummy';

// Global singleton to prevent connection leaks in development
const globalForDb = global as unknown as {
  client: postgres.Sql<{}> | undefined;
};

export const client =
  globalForDb.client ??
  postgres(connectionString, {
    max: process.env.NODE_ENV === 'production' ? undefined : 10, // Increased from 1 to 10 to allow parallel queries in dev
  });

if (process.env.NODE_ENV !== 'production') globalForDb.client = client;

export const db = drizzle(client, { schema });

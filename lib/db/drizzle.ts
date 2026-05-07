import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

// Global singleton to prevent connection leaks in development
const globalForDb = global as unknown as {
  client: postgres.Sql<{}> | undefined;
};

export const client = globalForDb.client ?? postgres(process.env.POSTGRES_URL, {
  max: process.env.NODE_ENV === 'production' ? undefined : 1, // Limit connections in dev
});

if (process.env.NODE_ENV !== 'production') globalForDb.client = client;

export const db = drizzle(client, { schema });

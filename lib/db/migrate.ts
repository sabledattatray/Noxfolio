import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

async function runMigration() {
  if (!connectionString) {
    console.error('❌ POSTGRES_URL or DATABASE_URL is not set.');
    process.exit(1);
  }

  console.log('🚀 Running production migrations...');
  
  const sql = postgres(connectionString as string, { max: 1 });
  const db = drizzle(sql);

  try {
    await migrate(db, { migrationsFolder: path.join(process.cwd(), 'lib/db/migrations') });
    console.log('✅ Migrations completed successfully.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runMigration();

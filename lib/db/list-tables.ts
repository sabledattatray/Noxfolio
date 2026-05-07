import { db } from './drizzle';
import { sql } from 'drizzle-orm';

async function listAllTables() {
  console.log('🔍 Listing all tables across all schemas...');
  try {
    const result = await db.execute(sql`SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema', 'pg_catalog')`);
    console.log('✅ TABLES:', (result as any).map((r: any) => `${r.table_schema}.${r.table_name}`));
  } catch (error: any) {
    console.error('❌ FAILURE:', error.message);
  }
  process.exit(0);
}

listAllTables();

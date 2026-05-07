import { db } from './drizzle';
import { sql } from 'drizzle-orm';

async function checkSearchPath() {
  console.log('🔍 Checking search_path and current user...');
  try {
    const user = await db.execute(sql`SELECT current_user`);
    const path = await db.execute(sql`SHOW search_path`);
    const schema = await db.execute(sql`SELECT current_schema()`);
    
    console.log('✅ Current User:', user);
    console.log('✅ Search Path:', path);
    console.log('✅ Current Schema:', schema);
    
    const tablesInCurrent = await db.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema()`);
    console.log('✅ Tables in current schema:', (tablesInCurrent as any).map((r: any) => r.table_name));
    
  } catch (error: any) {
    console.error('❌ FAILURE:', error.message);
  }
  process.exit(0);
}

checkSearchPath();

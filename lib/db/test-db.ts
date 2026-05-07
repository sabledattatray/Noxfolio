import { db } from './drizzle';
import { sql } from 'drizzle-orm';

async function test() {
  console.log('🔍 Testing database connection...');
  try {
    const result = await db.execute(sql`SELECT count(*) as count FROM users`);
    console.log('✅ SUCCESS: Users table exists. Count:', result);
  } catch (error: any) {
    console.error('❌ FAILURE:', error.message);
  }
  process.exit(0);
}

test();

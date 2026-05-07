import { db } from './drizzle';
import { users } from './schema';
import { eq } from 'drizzle-orm';

async function testAuthQuery() {
  console.log('🔍 Simulating Google Auth Query...');
  try {
    // This is the exact query that fails in actions.ts
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, 'test@example.com'))
      .limit(1);
    console.log('✅ SUCCESS: Query worked.');
  } catch (error: any) {
    console.error('❌ FAILURE:', error.message);
  }
  process.exit(0);
}

testAuthQuery();

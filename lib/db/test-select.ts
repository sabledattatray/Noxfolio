import { db } from './drizzle';
import { users } from './schema';
import { eq } from 'drizzle-orm';

async function testSelect() {
  console.log('🔍 Testing SELECT from users...');
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, 'test@example.com'))
      .limit(1);
    console.log('✅ SUCCESS: Query executed. Result count:', existingUser.length);
  } catch (error: any) {
    console.error('❌ FAILURE:', error.message);
  }
  process.exit(0);
}

testSelect();

import { db } from '../lib/db/drizzle';
import { users } from '../lib/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const email = 'noxfolio@gmail.com';
  
  const userList = await db.select().from(users).where(eq(users.email, email));
  if (userList.length === 0) {
    console.log('User not found.');
  } else {
    console.log(JSON.stringify(userList[0], null, 2));
  }
  process.exit(0);
}

main().catch(console.error);

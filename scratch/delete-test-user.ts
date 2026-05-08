import { db } from '../lib/db/drizzle';
import { users, activityLogs, organizationMembers, organizations } from '../lib/db/schema';
import { eq, inArray } from 'drizzle-orm';

async function main() {
  const email = 'noxfolio@gmail.com';
  console.log(`Deleting user with email: ${email}`);
  
  // Find the user first
  const userList = await db.select().from(users).where(eq(users.email, email));
  if (userList.length === 0) {
    console.log('User not found.');
    process.exit(0);
  }
  
  const userId = userList[0].id;
  
  // Find organizations the user is a member of to delete them too
  const orgMembers = await db.select().from(organizationMembers).where(eq(organizationMembers.userId, userId));
  const orgIds = orgMembers.map(m => m.organizationId);
  
  console.log(`Deleting from activity logs...`);
  await db.delete(activityLogs).where(eq(activityLogs.userId, userId));
  
  console.log(`Deleting from organization members...`);
  await db.delete(organizationMembers).where(eq(organizationMembers.userId, userId));
  
  if (orgIds.length > 0) {
    console.log(`Deleting organizations...`);
    await db.delete(organizations).where(inArray(organizations.id, orgIds));
  }
  
  console.log(`Deleting user...`);
  await db.delete(users).where(eq(users.id, userId));
  
  console.log('Cleanup successful.');
  process.exit(0);
}

main().catch(console.error);

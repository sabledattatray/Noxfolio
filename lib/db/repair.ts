import { db } from './drizzle';
import { users, organizations, organizationMembers } from './schema';
import { eq, sql } from 'drizzle-orm';

async function repair() {
  console.log('Starting DB repair and schema synchronization...');
  
  // Fix for missing organization_id in activity_logs
  try {
    console.log('Verifying activity_logs schema...');
    await db.execute(sql`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='activity_logs' AND column_name='organization_id') THEN
          ALTER TABLE activity_logs ADD COLUMN organization_id INTEGER REFERENCES organizations(id);
        END IF;
      END $$;
    `);
    console.log('✅ activity_logs schema synchronized.');
  } catch (e) {
    console.warn('⚠️ activity_logs schema sync warning:', e);
  }

  const allUsers = await db.select().from(users);
  console.log(`Found ${allUsers.length} users.`);

  for (const user of allUsers) {
    // Check if user has an organization
    const membership = await db.select()
      .from(organizationMembers)
      .where(eq(organizationMembers.userId, user.id))
      .limit(1);

    if (membership.length === 0) {
      console.log(`User ${user.email} has no organization. Creating one...`);
      const [newOrg] = await db.insert(organizations).values({
        name: `${user.name || 'User'}'s Organization`,
        planName: 'Starter',
        subscriptionStatus: 'active',
        stripeCustomerId: `cus_mock_${user.id}`,
        stripeProductId: 'prod_mock_starter'
      }).returning();

      await db.insert(organizationMembers).values({
        userId: user.id,
        organizationId: newOrg.id,
        role: 'owner'
      });
      console.log(`Organization created for ${user.email}.`);
    } else {
      console.log(`User ${user.email} already has organization ${membership[0].organizationId}.`);
      
      // Ensure organization has Stripe IDs
      const org = await db.select()
        .from(organizations)
        .where(eq(organizations.id, membership[0].organizationId))
        .limit(1);
        
      if (org.length > 0 && (!org[0].stripeCustomerId || !org[0].stripeProductId)) {
        console.log(`Hydrating Stripe IDs for Org ${org[0].id}`);
        await db.update(organizations)
          .set({
            stripeCustomerId: org[0].stripeCustomerId || `cus_mock_${user.id}`,
            stripeProductId: org[0].stripeProductId || 'prod_mock_starter',
            planName: org[0].planName || 'Starter',
            subscriptionStatus: org[0].subscriptionStatus || 'active'
          })
          .where(eq(organizations.id, org[0].id));
      }
    }
  }
  
  console.log('DB repair complete.');
  process.exit();
}

repair().catch(err => {
  console.error('Repair failed:', err);
  process.exit(1);
});

import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, organizationMembers, organizations, users, invoices } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getOrganizationByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(organizations)
    .where(eq(organizations.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateOrganizationSubscription(
  organizationId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(organizations)
    .set({
      ...subscriptionData,
      updatedAt: new Date()
    })
    .where(eq(organizations.id, organizationId));
}

export async function getUserWithOrganization(userId: number) {
  const result = await db
    .select({
      user: users,
      organizationId: organizationMembers.organizationId
    })
    .from(users)
    .leftJoin(organizationMembers, eq(users.id, organizationMembers.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getOrganizationForUser() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const result = await db.query.organizationMembers.findFirst({
    where: eq(organizationMembers.userId, user.id),
    with: {
      organization: {
        with: {
          organizationMembers: {
            with: {
              user: {
                columns: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        }
      }
    }
  });

  return result?.organization || null;
}
export async function getInvoicesForOrganization() {
  const organization = await getOrganizationForUser();
  if (!organization) return [];

  return await db
    .select()
    .from(invoices)
    .where(eq(invoices.organizationId, organization.id))
    .orderBy(desc(invoices.createdAt));
}

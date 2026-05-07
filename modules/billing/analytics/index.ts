import { db } from '@/lib/db/drizzle';
import { organizations } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { PLANS } from '../plans/config';

export class BillingAnalyticsService {
  /**
   * Get Monthly Recurring Revenue (MRR)
   */
  static async getMRR() {
    const activeOrgs = await db
      .select({
        planName: organizations.planName,
      })
      .from(organizations)
      .where(
        and(
          eq(organizations.subscriptionStatus, 'active'),
          sql`${organizations.planName} is not null`
        )
      );

    const mrr = activeOrgs.reduce((acc, org) => {
      const planId = org.planName?.toLowerCase() || 'starter';
      const plan = PLANS[planId];
      return acc + (plan?.price || 0);
    }, 0);

    return mrr;
  }

  /**
   * Get Annual Recurring Revenue (ARR)
   */
  static async getARR() {
    const mrr = await this.getMRR();
    return mrr * 12;
  }

  /**
   * Get Active Subscriptions count
   */
  static async getActiveSubscriptionsCount() {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(organizations)
      .where(eq(organizations.subscriptionStatus, 'active'));

    return result[0]?.count || 0;
  }
}

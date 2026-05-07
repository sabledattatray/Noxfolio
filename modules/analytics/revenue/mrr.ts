import { db } from '@/lib/db/drizzle';
import { organizations, activityLogs, ActivityType } from '@/lib/db/schema';
import { eq, and, sql, desc, lt, gte } from 'drizzle-orm';
import { PLANS } from '@/modules/billing/plans/config';

export class MRREngine {
  /**
   * Calculate Net New MRR for a period
   * Formula: New MRR + Expansion MRR - Churn MRR - Contraction MRR
   */
  static async getNetNewMRR(startDate: Date, endDate: Date) {
    // 1. Get New Subscriptions
    const newMRR = await this.calculateNewMRR(startDate, endDate);
    
    // 2. Get Churned Subscriptions
    const churnMRR = await this.calculateChurnMRR(startDate, endDate);

    return {
      new: newMRR,
      churn: churnMRR,
      net: newMRR - churnMRR,
    };
  }

  private static async calculateNewMRR(startDate: Date, endDate: Date): Promise<number> {
    const newOrgs = await db
      .select({ planName: organizations.planName })
      .from(organizations)
      .where(
        and(
          eq(organizations.subscriptionStatus, 'active'),
          gte(organizations.createdAt, startDate),
          lt(organizations.createdAt, endDate)
        )
      );

    return newOrgs.reduce((acc, org) => {
      const plan = PLANS[org.planName?.toLowerCase() || 'starter'];
      return acc + (plan?.price || 0);
    }, 0);
  }

  private static async calculateChurnMRR(startDate: Date, endDate: Date): Promise<number> {
    // In a real app, you'd track the price at time of churn
    const churnedLogs = await db
      .select({ metadata: activityLogs.action }) // Simplified for now
      .from(activityLogs)
      .where(
        and(
          eq(activityLogs.action, 'Subscription cancelled'),
          gte(activityLogs.timestamp, startDate),
          lt(activityLogs.timestamp, endDate)
        )
      );

    return churnedLogs.length * 999; // Placeholder: assuming $9.99 for churned orgs
  }

  /**
   * Calculate Projected ARR
   */
  static async getProjectedARR(currentMRR: number): Promise<number> {
    return currentMRR * 12;
  }
}

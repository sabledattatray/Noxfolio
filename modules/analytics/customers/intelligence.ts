import { db } from '@/lib/db/drizzle';
import { organizations, activityLogs } from '@/lib/db/schema';
import { eq, and, sql, gte, lt } from 'drizzle-orm';

export class ChurnService {
  /**
   * Calculate Customer Churn Rate for a period
   * Formula: (Customers at start - Customers at end) / Customers at start
   */
  static async calculateChurnRate(startDate: Date, endDate: Date): Promise<number> {
    const startCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(organizations)
      .where(lt(organizations.createdAt, startDate));

    const churnedInPeriod = await db
      .select({ count: sql<number>`count(*)` })
      .from(activityLogs)
      .where(
        and(
          eq(activityLogs.action, 'Subscription cancelled'),
          gte(activityLogs.timestamp, startDate),
          lt(activityLogs.timestamp, endDate)
        )
      );

    if (startCount[0]?.count === 0) return 0;
    return (churnedInPeriod[0]?.count / startCount[0]?.count) * 100;
  }
}

export class CustomerIntelligenceService {
  /**
   * Calculate Customer Lifetime Value (LTV)
   * Formula: ARPU / Churn Rate
   */
  static async calculateLTV(arpu: number, churnRate: number): Promise<number> {
    if (churnRate === 0) return arpu * 24; // Placeholder: 24 months for zero churn
    return arpu / (churnRate / 100);
  }

  /**
   * Get Average Revenue Per User (ARPU)
   */
  static async calculateARPU(totalMRR: number, activeCustomers: number): Promise<number> {
    if (activeCustomers === 0) return 0;
    return totalMRR / activeCustomers;
  }
}

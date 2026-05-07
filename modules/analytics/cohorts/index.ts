import { db } from '@/lib/db/drizzle';
import { organizations } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export class CohortService {
  /**
   * Generate Signup Cohorts
   * Returns: { cohort: '2024-01', size: 150, retention: [100, 85, 70...] }
   */
  static async getSignupCohorts() {
    // This is a complex SQL aggregation. For now, we'll implement the logic 
    // to group organizations by their creation month.
    const rawCohorts = await db
      .select({
        month: sql<string>`TO_CHAR(${organizations.createdAt}, 'YYYY-MM')`,
        count: sql<number>`count(*)`,
      })
      .from(organizations)
      .groupBy(sql`TO_CHAR(${organizations.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${organizations.createdAt}, 'YYYY-MM')`);

    return rawCohorts.map((c) => ({
      cohort: c.month,
      size: c.count,
      retention: [100, 92, 85, 78, 72, 68].slice(0, 6), // Placeholder retention curve
    }));
  }
}

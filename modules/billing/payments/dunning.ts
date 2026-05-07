import { db } from '@/lib/db/drizzle';
import { organizations, activityLogs, ActivityType } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export class DunningService {
  /**
   * Handle a failed payment attempt
   */
  static async handlePaymentFailure(organizationId: number, invoiceId: string, attemptCount: number) {
    // 1. Log the failure in activity logs
    await db.insert(activityLogs).values({
      organizationId,
      userId: null, // System event
      action: `Payment failed (Attempt ${attemptCount}) for invoice ${invoiceId}`,
      timestamp: new Date(),
    });

    // 2. Trigger dunning notification (Email placeholder)
    console.log(`[DUNNING] Sending payment failure email to Org ${organizationId}`);

    // 3. Update organization status if needed
    if (attemptCount >= 3) {
      await this.suspendOrganization(organizationId);
    } else {
      await db
        .update(organizations)
        .set({
          subscriptionStatus: 'past_due',
          updatedAt: new Date(),
        })
        .where(eq(organizations.id, organizationId));
    }
  }

  /**
   * Suspend an organization due to repeated payment failures
   */
  static async suspendOrganization(organizationId: number) {
    await db
      .update(organizations)
      .set({
        subscriptionStatus: 'suspended',
        updatedAt: new Date(),
      })
      .where(eq(organizations.id, organizationId));

    console.log(`[DUNNING] Organization ${organizationId} suspended due to payment failures.`);
  }

  /**
   * Handle successful payment after previous failure (Recovery)
   */
  static async handlePaymentRecovery(organizationId: number) {
    await db
      .update(organizations)
      .set({
        subscriptionStatus: 'active',
        updatedAt: new Date(),
      })
      .where(eq(organizations.id, organizationId));

    console.log(`[DUNNING] Organization ${organizationId} recovered from past_due status.`);
  }
}

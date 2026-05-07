import { db } from '@/lib/db/drizzle';
import { usageEvents } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

export class BillingEventLogger {
  /**
   * Log a billing event (Stripe webhook or internal)
   */
  static async logEvent(type: string, payload: any) {
    // We'll reuse the usageEvents table or a similar structure for event logging
    // For now, let's just log to console and a specific 'billing_event' type
    console.log(`[BILLING_EVENT] ${type}:`, JSON.stringify(payload, null, 2));
    
    // In a real app, you'd have a separate billing_events table
    // For now we'll use usageEvents as a generic event store
    await db.insert(usageEvents).values({
      organizationId: payload.organizationId || 0, // 0 for system-wide
      type: `evt_${type}`,
      value: 1,
      metadata: payload,
    });
  }
}

import { stripe } from '@/lib/stripe/stripe';
import { db } from '@/lib/db/drizzle';
import { organizations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { SubscriptionStatus } from '../types';

export class SubscriptionLifecycleService {
  /**
   * Upgrade or downgrade an organization's plan
   */
  static async changePlan(organizationId: number, newPriceId: string) {
    const org = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, organizationId))
      .limit(1);

    if (!org[0] || !org[0].stripeSubscriptionId) {
      throw new Error('No active subscription found for this organization.');
    }

    const subscription = await stripe.subscriptions.retrieve(org[0].stripeSubscriptionId);
    const subscriptionItemId = subscription.items.data[0].id;

    // Update the subscription in Stripe with proration
    const updatedSubscription = await stripe.subscriptions.update(org[0].stripeSubscriptionId, {
      items: [{
        id: subscriptionItemId,
        price: newPriceId,
      }],
      proration_behavior: 'create_prorations',
    });

    return updatedSubscription;
  }

  /**
   * Cancel a subscription at the end of the period
   */
  static async cancelSubscription(organizationId: number) {
    const org = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, organizationId))
      .limit(1);

    if (!org[0] || !org[0].stripeSubscriptionId) {
      throw new Error('No active subscription found.');
    }

    const subscription = await stripe.subscriptions.update(org[0].stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    return subscription;
  }

  /**
   * Resume a subscription scheduled for cancellation
   */
  static async resumeSubscription(organizationId: number) {
    const org = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, organizationId))
      .limit(1);

    if (!org[0] || !org[0].stripeSubscriptionId) {
      throw new Error('No active subscription found.');
    }

    const subscription = await stripe.subscriptions.update(org[0].stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    return subscription;
  }
}

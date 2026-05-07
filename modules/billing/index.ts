import { db } from '@/lib/db/drizzle';
import { 
  organizations, 
  invoices, 
  invoiceItems, 
  usageEvents 
} from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { BillingPlan, BillingSubscription, BillingInvoice } from './types';

import { DunningService } from './payments/dunning';

export class BillingService {
  /**
   * Get all invoices for an organization
   */
  static async getInvoices(organizationId: number): Promise<BillingInvoice[]> {
    const data = await db
      .select()
      .from(invoices)
      .where(eq(invoices.organizationId, organizationId))
      .orderBy(desc(invoices.createdAt));

    return data.map((inv) => ({
      id: inv.id.toString(),
      number: inv.number || `INV-${inv.id}`,
      amount: inv.amount,
      currency: inv.currency,
      status: inv.status as any,
      pdfUrl: inv.pdfUrl,
      createdAt: inv.createdAt,
    }));
  }

  /**
   * Track a usage event
   */
  static async trackUsage(organizationId: number, type: string, value: number = 1, metadata: any = {}) {
    await db.insert(usageEvents).values({
      organizationId,
      type,
      value,
      metadata,
    });
  }

  /**
   * Get current usage for a specific type
   */
  static async getUsage(organizationId: number, type: string, startDate: Date, endDate: Date) {
    const data = await db
      .select()
      .from(usageEvents)
      .where(
        and(
          eq(usageEvents.organizationId, organizationId),
          eq(usageEvents.type, type)
          // Add date filtering logic here
        )
      );

    return data.reduce((acc, curr) => acc + curr.value, 0);
  }

  /**
   * Handle successful invoice payment
   */
  static async handleInvoicePaid(invoice: any) {
    const stripeInvoiceId = invoice.id;
    const organizationId = await this.getOrganizationIdFromStripeCustomer(invoice.customer);

    if (!organizationId) return;

    await db.insert(invoices).values({
      organizationId,
      stripeInvoiceId,
      number: invoice.number,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: 'paid',
      pdfUrl: invoice.invoice_pdf,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
    });

    // Handle recovery if the organization was past_due
    await DunningService.handlePaymentRecovery(organizationId);
  }

  /**
   * Handle failed invoice payment
   */
  static async handleInvoicePaymentFailed(invoice: any) {
    const organizationId = await this.getOrganizationIdFromStripeCustomer(invoice.customer);
    if (!organizationId) return;

    await DunningService.handlePaymentFailure(
      organizationId, 
      invoice.id, 
      invoice.attempt_count || 1
    );
  }

  /**
   * Helper: Get organization ID from Stripe Customer ID
   */
  private static async getOrganizationIdFromStripeCustomer(stripeCustomerId: string): Promise<number | null> {
    const org = await db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.stripeCustomerId, stripeCustomerId))
      .limit(1);

    return org[0]?.id || null;
  }
}

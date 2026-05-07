export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'incomplete'
  | 'incomplete_expired'
  | 'paused';

export type PlanInterval = 'month' | 'year' | 'one_time';

export interface BillingPlan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  interval: PlanInterval;
  stripeProductId: string;
  stripePriceId: string;
  features: string[];
  metadata?: Record<string, any>;
}

export interface BillingSubscription {
  id: string;
  organizationId: string;
  status: SubscriptionStatus;
  planId: string;
  stripeSubscriptionId: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface InvoiceStatus {
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
}

export interface BillingInvoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: InvoiceStatus['status'];
  pdfUrl: string | null;
  createdAt: Date;
}

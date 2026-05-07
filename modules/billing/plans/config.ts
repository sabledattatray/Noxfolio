import { BillingPlan } from '../types';

export const PLANS: Record<string, BillingPlan> = {
  community: {
    id: 'community',
    name: 'Community',
    description: 'Perfect for local development and self-hosting.',
    price: 0,
    currency: 'usd',
    interval: 'month',
    stripeProductId: process.env.STRIPE_PRODUCT_STARTER || '',
    stripePriceId: process.env.STRIPE_PRICE_STARTER || '',
    features: [
      'Full source code access',
      'Unlimited organizations',
      'Basic Billing Core',
      'Community support',
    ],
    metadata: {
      requestsLimit: 5000,
      membersLimit: 5,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'AI-powered growth for professional teams.',
    price: 4900,
    currency: 'usd',
    interval: 'month',
    stripeProductId: process.env.STRIPE_PRODUCT_GROWTH || '',
    stripePriceId: process.env.STRIPE_PRICE_GROWTH || '',
    features: [
      'Everything in Community',
      'Growth Optimus AI Agent',
      'Advanced Growth Analytics',
      '24/7 Priority support',
      'Custom Branding',
    ],
    metadata: {
      requestsLimit: 50000,
      membersLimit: -1,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Autonomous revenue engine for large scale.',
    price: 0, // Contact sales
    currency: 'usd',
    interval: 'month',
    stripeProductId: process.env.STRIPE_PRODUCT_ENTERPRISE || '',
    stripePriceId: process.env.STRIPE_PRICE_ENTERPRISE || '',
    features: [
      'Everything in Pro',
      'Revenue Guard AI Agent',
      'Retention Hero AI Agent',
      'Audit & Compliance Logs',
      'SLA guarantee',
      'SSO & SAML integration',
    ],
    metadata: {
      custom: true,
    },
  },
};

export const getPlanById = (id: string) => PLANS[id] || null;
export const getPlanByPriceId = (priceId: string) => 
  Object.values(PLANS).find((p) => p.stripePriceId === priceId) || null;

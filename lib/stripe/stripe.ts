import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { Organization } from '@/lib/db/schema';
import {
  getOrganizationByStripeCustomerId,
  getUser,
  updateOrganizationSubscription
} from '@/lib/db/queries';

const stripeApiKey = process.env.STRIPE_SECRET_KEY?.trim() || 'sk_test_mock';

export const stripe = new Stripe(stripeApiKey, {
  apiVersion: '2025-04-30.basil' as any
});

export async function createCheckoutSession({
  organization,
  priceId
}: {
  organization: Organization | null;
  priceId: string;
}) {
  const user = await getUser();

  if (!organization || !user) {
    redirect(`/sign-up?redirect=checkout&priceId=${priceId}`);
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: `${process.env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/pricing`,
    customer: organization.stripeCustomerId || undefined,
    client_reference_id: user.id.toString(),
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14
    }
  });

  redirect(session.url!);
}

export async function createCustomerPortalSession(organization: Organization) {
  if (!organization.stripeCustomerId || !organization.stripeProductId) {
    redirect('/pricing');
  }

  let configuration: Stripe.BillingPortal.Configuration;
  const configurations = await stripe.billingPortal.configurations.list();

  if (configurations.data.length > 0) {
    configuration = configurations.data[0];
  } else {
    const product = await stripe.products.retrieve(organization.stripeProductId);
    if (!product.active) {
      throw new Error("Organization's product is not active in Stripe");
    }

    const prices = await stripe.prices.list({
      product: product.id,
      active: true
    });
    if (prices.data.length === 0) {
      throw new Error("No active prices found for the organization's product");
    }

    configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'Manage your subscription'
      },
      features: {
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price', 'quantity', 'promotion_code'],
          proration_behavior: 'create_prorations',
          products: [
            {
              product: product.id,
              prices: prices.data.map((price) => price.id)
            }
          ]
        },
        subscription_cancel: {
          enabled: true,
          mode: 'at_period_end',
          cancellation_reason: {
            enabled: true,
            options: [
              'too_expensive',
              'missing_features',
              'switched_service',
              'unused',
              'other'
            ]
          }
        },
        payment_method_update: {
          enabled: true
        }
      }
    });
  }

  return stripe.billingPortal.sessions.create({
    customer: organization.stripeCustomerId,
    return_url: `${process.env.BASE_URL}/dashboard`,
    configuration: configuration.id
  });
}

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const status = subscription.status;

  const organization = await getOrganizationByStripeCustomerId(customerId);

  if (!organization) {
    console.error('Organization not found for Stripe customer:', customerId);
    return;
  }

  if (status === 'active' || status === 'trialing') {
    const plan = subscription.items.data[0]?.plan;
    await updateOrganizationSubscription(organization.id, {
      stripeSubscriptionId: subscriptionId,
      stripeProductId: plan?.product as string,
      planName: (plan?.product as Stripe.Product).name,
      subscriptionStatus: status
    });
  } else if (status === 'canceled' || status === 'unpaid') {
    await updateOrganizationSubscription(organization.id, {
      stripeSubscriptionId: null,
      stripeProductId: null,
      planName: null,
      subscriptionStatus: status
    });
  }
}

export async function getStripePrices() {
  if (stripeApiKey === 'sk_test_mock') {
    return [
      { id: 'price_mock_base', productId: 'prod_mock_base', unitAmount: 800, currency: 'usd', interval: 'month', trialPeriodDays: 7 },
      { id: 'price_mock_plus', productId: 'prod_mock_plus', unitAmount: 1200, currency: 'usd', interval: 'month', trialPeriodDays: 7 }
    ];
  }

  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
    type: 'recurring'
  });

  return prices.data.map((price) => ({
    id: price.id,
    productId:
      typeof price.product === 'string' ? price.product : price.product.id,
    unitAmount: price.unit_amount,
    currency: price.currency,
    interval: price.recurring?.interval,
    trialPeriodDays: price.recurring?.trial_period_days
  }));
}

export async function getStripeProducts() {
  if (stripeApiKey === 'sk_test_mock') {
    return [
      { id: 'prod_mock_base', name: 'Base', description: 'Base Plan', defaultPriceId: 'price_mock_base' },
      { id: 'prod_mock_plus', name: 'Plus', description: 'Plus Plan', defaultPriceId: 'price_mock_plus' }
    ];
  }

  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price']
  });

  return products.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    defaultPriceId:
      typeof product.default_price === 'string'
        ? product.default_price
        : product.default_price?.id
  }));
}

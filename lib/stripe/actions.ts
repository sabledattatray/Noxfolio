'use server';

import { redirect } from 'next/navigation';
import { createCheckoutSession, createCustomerPortalSession } from './stripe';
import { withOrganization } from '@/lib/auth/middleware';
import { updateOrganizationSubscription } from '@/lib/db/queries';
import { getPlanByPriceId } from '@/modules/billing/plans/config';

export const checkoutAction = withOrganization(async (formData, organization) => {
  try {
    const priceId = formData.get('priceId') as string;
    
    // Simulation for mock environment - Now performs real DB update!
    if (process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
      const plan = getPlanByPriceId(priceId);
      if (plan) {
        await updateOrganizationSubscription(organization.id, {
          stripeSubscriptionId: 'sub_mock_' + Date.now(),
          stripeProductId: plan.stripeProductId,
          planName: plan.name,
          subscriptionStatus: 'active'
        });
        
        // Wait a moment to simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        redirect('/dashboard/billing?success=plan_updated');
      }
      return { error: 'Plan not found in configuration' };
    }

    await createCheckoutSession({ organization: organization, priceId });
    return { success: 'Redirecting to checkout...' };
  } catch (error: any) {
    if (error.digest?.startsWith('NEXT_REDIRECT')) throw error;
    console.error('Checkout error:', error);
    return { error: error.message || 'Failed to initiate checkout' };
  }
});

export const customerPortalAction = withOrganization(async (_, organization) => {
  try {
    // Simulation for mock environment
    if (process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
      await new Promise(resolve => setTimeout(resolve, 500));
      redirect('/dashboard/billing?success=portal_simulated');
    }

    const portalSession = await createCustomerPortalSession(organization);
    redirect(portalSession.url);
  } catch (error: any) {
    if (error.digest?.startsWith('NEXT_REDIRECT')) throw error;
    console.error('Portal error:', error);
    return { error: error.message || 'Failed to open customer portal' };
  }
});

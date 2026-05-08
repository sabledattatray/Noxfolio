'use client';

import { Suspense, useTransition, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { SubscriptionCard } from '@/components/billing/subscription-card';
import { InvoiceTable } from '@/components/billing/invoice-table';
import { PLANS } from '@/modules/billing/plans/config';
import { OrganizationDataWithMembers } from '@/lib/db/schema';
import { BillingInvoice } from '@/modules/billing/types';
import { customerPortalAction, checkoutAction } from '@/lib/stripe/actions';
import { simulateUpgradeAction } from '@/lib/billing/actions';
import { CheckCircle2, PartyPopper } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function StripeLink() {
  const [isPending, setIsPending] = useState(false);
  return (
    <button 
      disabled={isPending}
      onClick={async () => {
        setIsPending(true);
        try {
          await customerPortalAction(null, new FormData());
        } catch (err: any) {
          if (err.message?.includes('NEXT_REDIRECT') || err.digest?.includes('NEXT_REDIRECT')) {
            throw err;
          }
          alert(err.message || 'Action failed');
        } finally {
          setIsPending(false);
        }
      }}
      className="text-sm font-bold text-primary hover:underline bg-transparent border-none cursor-pointer disabled:opacity-50"
    >
      {isPending ? 'Connecting...' : 'Manage in Stripe →'}
    </button>
  );
}

function SuccessBanner() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (success) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (!success || !visible) return null;

  const messages: Record<string, string> = {
    plan_updated: 'Success! Your plan has been upgraded. Simulation complete.',
    portal_simulated: 'Mock customer portal session initiated successfully.',
  };

  return (
    <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-500 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="p-2 bg-emerald-500/20 rounded-xl">
        <PartyPopper className="w-5 h-5" />
      </div>
      <p className="font-semibold text-sm">{messages[success] || 'Action completed successfully.'}</p>
    </div>
  );
}

function BillingOverview() {
  const { data: organizationData, error: orgError, mutate } = useSWR<OrganizationDataWithMembers>('/api/organization', fetcher);
  const { data: invoices, error: invError } = useSWR<BillingInvoice[]>('/api/billing/invoices', fetcher);
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  // Re-fetch data if a success param is present to show the updated plan
  useEffect(() => {
    if (success) mutate();
  }, [success, mutate]);

  const currentPlanId = organizationData?.planName?.toLowerCase() || 'community';
  
  if (orgError || invError) {
    console.error('Billing data fetch error:', orgError || invError);
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SuccessBanner />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Subscriptions</h1>
          <p className="text-muted-foreground mt-1">Manage your plan, payment methods, and view your billing history.</p>
        </div>
        <div className="flex gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-sm shadow-xl shadow-primary/5">
          <div className="text-center px-4 border-r border-primary/10">
            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Current Plan</p>
            <p className="text-lg font-bold text-primary capitalize">{currentPlanId}</p>
          </div>
          <div className="text-center px-4">
            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Next Invoice</p>
            <p className="text-lg font-bold text-primary">June 1, 2026</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.values(PLANS).map((plan) => (
          <SubscriptionCard 
            key={plan.id} 
            plan={plan} 
            isCurrent={plan.id === currentPlanId}
            action={simulateUpgradeAction}
          />
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Billing History</h2>
            <p className="text-muted-foreground text-sm">Download your previous invoices and receipts.</p>
          </div>
          <StripeLink />
        </div>
        <div className="rounded-[32px] overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm">
          <InvoiceTable invoices={Array.isArray(invoices) ? invoices : []} />
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <Suspense fallback={<div className="h-96 w-full animate-pulse bg-accent/20 rounded-[32px]" />}>
        <BillingOverview />
      </Suspense>
    </div>
  );
}

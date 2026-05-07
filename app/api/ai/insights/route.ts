import { NextResponse } from 'next/server';
import { getInvoicesForOrganization, getOrganizationForUser } from '@/lib/db/queries';

export async function GET() {
  try {
    const organization = await getOrganizationForUser();
    if (!organization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const invoices = await getInvoicesForOrganization();
    const insights = [];

    // 1. Revenue Guard: Check for overdue/failed invoices
    const failedInvoices = invoices.filter(inv => inv.status === 'failed' || inv.status === 'past_due');
    if (failedInvoices.length > 0) {
      const totalAtRisk = failedInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0) / 100;
      insights.push({
        id: 'rev_guard_1',
        title: 'Revenue Leak Detected',
        description: `${failedInvoices.length} invoices are currently past due. Estimated $${totalAtRisk.toFixed(2)} at risk.`,
        impact: 'high',
        actionLabel: 'Trigger Recovery Flow',
        type: 'revenue_guard',
        createdAt: new Date(),
      });
    }

    // 2. Growth Optimus: Check for high usage (Simulated for now based on plan)
    if (organization.planName === 'Free') {
       insights.push({
        id: 'growth_opt_1',
        title: 'Upgrade Recommendation',
        description: 'You are approaching your usage limit for the Free plan. Upgrade to Pro to avoid service interruption.',
        impact: 'medium',
        actionLabel: 'View Plans',
        type: 'growth_optimus',
        createdAt: new Date(),
      });
    }

    // 3. Retention Hero: Simulated churn warning
    // In a real app, we'd check usage drop over time
    insights.push({
      id: 'retention_hero_1',
      title: 'Retention Opportunity',
      description: 'Customer engagement has increased by 15%. Send a reward coupon to maintain momentum.',
      impact: 'low',
      actionLabel: 'Send Coupon',
      type: 'retention_hero',
      createdAt: new Date(),
    });

    return NextResponse.json(insights);
  } catch (error: any) {
    console.error('AI Insights Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

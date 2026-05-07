import { NextResponse } from 'next/server';
import { BillingService } from '@/modules/billing';
import { getOrganizationForUser } from '@/lib/db/queries';

export async function GET() {
  const organization = await getOrganizationForUser();

  if (!organization) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
  }

  const invoices = await BillingService.getInvoices(organization.id);
  return NextResponse.json(invoices);
}

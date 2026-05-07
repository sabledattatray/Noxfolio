import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { invoices, invoiceItems, organizations } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getOrganizationForUser } from '@/lib/db/queries';
import { InvoiceGenerator } from '@/modules/billing/invoices/generator';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const organization = await getOrganizationForUser();
  if (!organization) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const invoiceId = parseInt(params.id);
  
  const invoiceData = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.organizationId, organization.id)))
    .limit(1);

  if (invoiceData.length === 0) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  const items = await db
    .select()
    .from(invoiceItems)
    .where(eq(invoiceItems.invoiceId, invoiceId));

  const pdfBuffer = await InvoiceGenerator.generatePDF(organization, invoiceData[0], items);

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="invoice-${invoiceData[0].number || invoiceId}.pdf"`,
    },
  });
}

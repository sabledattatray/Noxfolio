import { db } from '@/lib/db/drizzle';
import { invoices } from '@/lib/db/schema';
import { eq, and, gte, lt } from 'drizzle-orm';

export class ReportingService {
  /**
   * Generate a Revenue Report in CSV format
   */
  static async generateRevenueCSV(organizationId: number, startDate: Date, endDate: Date): Promise<string> {
    const data = await db
      .select()
      .from(invoices)
      .where(
        and(
          eq(invoices.organizationId, organizationId),
          eq(invoices.status, 'paid'),
          gte(invoices.createdAt, startDate),
          lt(invoices.createdAt, endDate)
        )
      );

    const headers = ['Date', 'Invoice Number', 'Amount', 'Currency', 'Status'];
    const rows = data.map((inv) => [
      inv.createdAt.toISOString().split('T')[0],
      inv.number || `INV-${inv.id}`,
      (inv.amount / 100).toFixed(2),
      inv.currency.toUpperCase(),
      inv.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    return csvContent;
  }
}

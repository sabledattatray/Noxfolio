import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Invoice, InvoiceItem, Organization } from '@/lib/db/schema';

export class InvoiceGenerator {
  /**
   * Generate a PDF invoice as a Buffer
   */
  static async generatePDF(
    organization: Organization,
    invoice: Invoice,
    items: InvoiceItem[],
  ): Promise<Buffer> {
    const doc = new jsPDF() as any;

    // Header
    doc.setFontSize(22);
    doc.text('INVOICE', 14, 22);

    doc.setFontSize(10);
    doc.text(`Noxfolio Foundation`, 14, 30);
    doc.text(`support@noxfolio.com`, 14, 35);

    // Bill To
    doc.setFontSize(12);
    doc.text('BILL TO:', 14, 55);
    doc.setFontSize(10);
    doc.text(organization.name || 'Valued Customer', 14, 62);

    // Invoice Info
    doc.text(
      `Invoice Number: ${invoice.number || `INV-${invoice.id}`}`,
      140,
      55,
    );
    doc.text(
      `Date: ${new Date(invoice.createdAt).toLocaleDateString()}`,
      140,
      60,
    );
    doc.text(`Status: ${invoice.status.toUpperCase()}`, 140, 65);

    // Items Table
    const tableData = items.map((item) => [
      item.description,
      item.quantity.toString(),
      `$${(item.amount / 100).toFixed(2)}`,
      `$${((item.amount * item.quantity) / 100).toFixed(2)}`,
    ]);

    doc.autoTable({
      startY: 80,
      head: [['Description', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [31, 41, 55] },
    });

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(12);
    doc.text(
      `Total Amount: $${(invoice.amount / 100).toFixed(2)}`,
      140,
      finalY + 20,
    );

    // Footer
    doc.setFontSize(8);
    doc.text(
      'Thank you for your business!',
      14,
      doc.internal.pageSize.height - 10,
    );

    return Buffer.from(doc.output('arraybuffer'));
  }
}

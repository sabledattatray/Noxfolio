'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { BillingInvoice } from '@/modules/billing/types';

interface InvoiceTableProps {
  invoices: BillingInvoice[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!Array.isArray(invoices) || invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="w-8 h-8 opacity-20" />
                  <p>No invoices found.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.id} className="border-border/50 hover:bg-accent/30 transition-colors">
                <TableCell className="font-medium">{invoice.number}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    invoice.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {invoice.status}
                  </div>
                </TableCell>
                <TableCell>${invoice.amount / 100}</TableCell>
                <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" asChild>
                      <a href={`/api/billing/invoices/${invoice.id}/download`} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

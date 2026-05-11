'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PencilLine, Info, HelpCircle } from 'lucide-react';

export default function EntityNamesPage() {
  const entities = [
    {
      id: 'organization',
      label: 'Organization Term',
      default: 'Organization',
      current: 'Business',
    },
    {
      id: 'customer',
      label: 'Customer Term',
      default: 'Customer',
      current: 'Client',
    },
    {
      id: 'product',
      label: 'Product Term',
      default: 'Product',
      current: 'Service',
    },
    {
      id: 'invoice',
      label: 'Invoice Term',
      default: 'Invoice',
      current: 'Bill',
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Entity Personalization
        </h1>
        <p className="text-muted-foreground mt-1">
          Customize terminology to match your business model.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {entities.map((entity) => (
            <div key={entity.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={entity.id} className="text-sm font-semibold">
                  {entity.label}
                </Label>
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Default: {entity.default}
                </span>
              </div>
              <div className="group relative">
                <PencilLine className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
                <Input
                  id={entity.id}
                  defaultValue={entity.current}
                  className="border-border/50 focus:border-primary/50 rounded-xl pl-10"
                />
              </div>
            </div>
          ))}
          <Button className="shadow-primary/20 w-full rounded-xl shadow-lg">
            Update Terminology
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="border-border/50 bg-primary/5 border-dashed">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="text-primary h-5 w-5" />
                <CardTitle className="text-lg">Why customize?</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                BillForge is designed for flexibility. Whether you sell{' '}
                <strong>Services</strong> to <strong>Clients</strong> or{' '}
                <strong>Goods</strong> to <strong>Customers</strong>,
                personalizing these terms ensures your dashboard and invoices
                feel native to your brand.
              </p>
              <div className="text-primary mt-4 flex items-center gap-2 text-xs font-semibold">
                <HelpCircle className="h-4 w-4" />
                Learn more about white-labeling
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Preview Effect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted h-2 w-3/4 animate-pulse rounded" />
              <div className="border-border/50 text-muted-foreground flex h-8 w-full items-center rounded-lg border px-3 text-xs font-medium">
                "Manage your{' '}
                <span className="text-primary px-1 font-bold">Business</span>{' '}
                here."
              </div>
              <div className="border-border/50 text-muted-foreground flex h-8 w-full items-center rounded-lg border px-3 text-xs font-medium">
                "Create new{' '}
                <span className="text-primary px-1 font-bold">Bill</span>."
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

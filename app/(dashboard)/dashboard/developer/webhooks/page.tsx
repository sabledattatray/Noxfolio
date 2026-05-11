'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Webhook,
  Plus,
  ExternalLink,
  Activity,
  ShieldCheck,
} from 'lucide-react';

export default function WebhooksPage() {
  const webhooks = [
    {
      id: '1',
      url: 'https://api.myapp.com/webhooks/billforge',
      status: 'Active',
      events: 'invoice.created, payment.succeeded',
    },
    {
      id: '2',
      url: 'https://hooks.slack.com/services/...',
      status: 'Active',
      events: 'organization.joined',
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
          <p className="text-muted-foreground mt-1">
            Receive real-time notifications for events happening in your
            account.
          </p>
        </div>
        <Button className="shadow-primary/20 gap-2 rounded-xl shadow-lg">
          <Plus className="h-4 w-4" />
          Add Endpoint
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {webhooks.map((hook) => (
          <Card
            key={hook.id}
            className="border-border/50 bg-card/50 hover:border-primary/30 backdrop-blur-sm transition-all"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <Activity className="h-3 w-3" />
                  </div>
                  <CardTitle className="max-w-[300px] truncate text-base md:max-w-none">
                    {hook.url}
                  </CardTitle>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-emerald-500 uppercase">
                  {hook.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Webhook className="h-4 w-4" />
                  <span>
                    Events:{' '}
                    <span className="text-foreground font-medium">
                      {hook.events}
                    </span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-lg text-xs"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/5 gap-2 rounded-lg text-xs"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-primary/5 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">Secure Your Endpoints</h3>
          <p className="text-muted-foreground max-w-sm text-sm">
            We sign all webhook events so you can verify that requests are
            coming from BillForge.
          </p>
          <Button variant="link" className="text-primary mt-2">
            Read Documentation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

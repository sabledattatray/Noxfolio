'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import useSWR, { mutate } from 'swr';
import { Organization } from '@/lib/db/schema';
import {
  Puzzle,
  ExternalLink,
  CheckCircle2,
  Cloud,
  ShieldCheck,
  BarChart3,
  Mail,
  Slack,
  MessageSquare,
  Zap,
} from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const APPS = [
  {
    id: 'slack',
    name: 'Slack',
    description:
      'Get real-time billing alerts and payment notifications in your Slack channels.',
    icon: Slack,
    category: 'Notifications',
    author: 'Noxfolio Official',
    rating: 4.9,
  },
  {
    id: 'stripe-tax',
    name: 'Stripe Tax',
    description:
      'Automate sales tax, VAT, and GST calculation for every transaction.',
    icon: ShieldCheck,
    category: 'Tax & Compliance',
    author: 'Stripe',
    rating: 5.0,
  },
  {
    id: 'intercom',
    name: 'Intercom',
    description:
      'Sync billing status with customer support profiles to provide faster assistance.',
    icon: MessageSquare,
    category: 'Customer Support',
    author: 'Intercom',
    rating: 4.7,
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description:
      'Automatically sync invoices and payments with your QuickBooks account.',
    icon: Cloud,
    category: 'Accounting',
    author: 'Intuit',
    rating: 4.5,
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description:
      'Create targeted email campaigns based on subscription tier and billing status.',
    icon: Mail,
    category: 'Marketing',
    author: 'Noxfolio Official',
    rating: 4.8,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description:
      'Connect Noxfolio with over 5,000+ apps to automate your entire workflow.',
    icon: Zap,
    category: 'Automation',
    author: 'Zapier',
    rating: 4.9,
  },
];

const CATEGORIES = [
  'All',
  'Notifications',
  'Tax & Compliance',
  'Accounting',
  'Marketing',
  'Automation',
];

export function AppDirectory() {
  const { data: org } = useSWR<Organization>('/api/organization', fetcher);
  const [filter, setFilter] = useState('All');
  const [loadingAppId, setLoadingAppId] = useState<string | null>(null);

  const installedApps = (org?.installedApps as string[]) || [];

  const handleInstallAction = async (appId: string, isInstalled: boolean) => {
    setLoadingAppId(appId);
    try {
      const res = await fetch('/api/marketplace/install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId,
          action: isInstalled ? 'uninstall' : 'install',
        }),
      });
      if (res.ok) {
        mutate('/api/organization');
      }
    } catch (error) {
      console.error('Failed to update app status:', error);
    } finally {
      setLoadingAppId(null);
    }
  };

  const filteredApps =
    filter === 'All' ? APPS : APPS.filter((app) => app.category === filter);

  return (
    <div className="space-y-8">
      <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(cat)}
            className="rounded-full whitespace-nowrap"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredApps.map((app) => {
          const isInstalled = installedApps.includes(app.id);
          return (
            <Card
              key={app.id}
              className="group border-border/50 bg-card/50 hover:shadow-primary/5 relative p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="bg-primary/5 group-hover:bg-primary/10 rounded-2xl p-3 transition-colors">
                  <app.icon className="text-primary h-6 w-6" />
                </div>
                {isInstalled ? (
                  <Badge
                    variant="secondary"
                    className="border-none bg-emerald-500/10 text-emerald-500"
                  >
                    Installed
                  </Badge>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </Button>
                )}
              </div>

              <h3 className="mb-1 text-lg font-bold">{app.name}</h3>
              <p className="text-muted-foreground mb-3 text-[10px] font-bold tracking-wider uppercase">
                By {app.author}
              </p>
              <p className="text-muted-foreground mb-6 line-clamp-2 text-sm">
                {app.description}
              </p>

              <div className="border-border/50 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">{app.rating}</span>
                  <span className="text-amber-500">★</span>
                </div>
                <Button
                  size="sm"
                  variant={isInstalled ? 'outline' : 'default'}
                  className="h-8 rounded-xl px-4"
                  onClick={() => handleInstallAction(app.id, isInstalled)}
                  disabled={loadingAppId === app.id}
                >
                  {loadingAppId === app.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isInstalled ? (
                    'Uninstall'
                  ) : (
                    'Install App'
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredApps.length === 0 && (
        <div className="space-y-4 py-20 text-center">
          <Puzzle className="text-muted-foreground/20 mx-auto h-12 w-12" />
          <h3 className="text-xl font-medium">
            No apps found in this category
          </h3>
          <p className="text-muted-foreground">
            We're constantly adding new integrations. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}

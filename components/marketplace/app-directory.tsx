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
  Zap
} from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const APPS = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get real-time billing alerts and payment notifications in your Slack channels.',
    icon: Slack,
    category: 'Notifications',
    author: 'BillForge Official',
    rating: 4.9,
  },
  {
    id: 'stripe-tax',
    name: 'Stripe Tax',
    description: 'Automate sales tax, VAT, and GST calculation for every transaction.',
    icon: ShieldCheck,
    category: 'Tax & Compliance',
    author: 'Stripe',
    rating: 5.0,
  },
  {
    id: 'intercom',
    name: 'Intercom',
    description: 'Sync billing status with customer support profiles to provide faster assistance.',
    icon: MessageSquare,
    category: 'Customer Support',
    author: 'Intercom',
    rating: 4.7,
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Automatically sync invoices and payments with your QuickBooks account.',
    icon: Cloud,
    category: 'Accounting',
    author: 'Intuit',
    rating: 4.5,
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Create targeted email campaigns based on subscription tier and billing status.',
    icon: Mail,
    category: 'Marketing',
    author: 'BillForge Official',
    rating: 4.8,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect BillForge with over 5,000+ apps to automate your entire workflow.',
    icon: Zap,
    category: 'Automation',
    author: 'Zapier',
    rating: 4.9,
  },
];

const CATEGORIES = ['All', 'Notifications', 'Tax & Compliance', 'Accounting', 'Marketing', 'Automation'];

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
          action: isInstalled ? 'uninstall' : 'install' 
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

  const filteredApps = filter === 'All' 
    ? APPS 
    : APPS.filter(app => app.category === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map(app => {
          const isInstalled = installedApps.includes(app.id);
          return (
            <Card key={app.id} className="group relative p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <app.icon className="w-6 h-6 text-primary" />
                </div>
                {isInstalled ? (
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none">
                    Installed
                  </Badge>
                ) : (
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                )}
              </div>
              
              <h3 className="text-lg font-bold mb-1">{app.name}</h3>
              <p className="text-[10px] text-muted-foreground uppercase font-bold mb-3 tracking-wider">By {app.author}</p>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
                {app.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">{app.rating}</span>
                  <span className="text-amber-500">★</span>
                </div>
                <Button 
                  size="sm" 
                  variant={isInstalled ? 'outline' : 'default'} 
                  className="rounded-xl h-8 px-4"
                  onClick={() => handleInstallAction(app.id, isInstalled)}
                  disabled={loadingAppId === app.id}
                >
                  {loadingAppId === app.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    isInstalled ? 'Uninstall' : 'Install App'
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredApps.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <Puzzle className="w-12 h-12 text-muted-foreground/20 mx-auto" />
          <h3 className="text-xl font-medium">No apps found in this category</h3>
          <p className="text-muted-foreground">We're constantly adding new integrations. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

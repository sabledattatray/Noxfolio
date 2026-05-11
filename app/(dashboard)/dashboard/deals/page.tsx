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
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function ModulePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold tracking-widest uppercase"
            >
              PRO MODULE
            </Badge>
            <span className="text-muted-foreground text-[10px] font-semibold tracking-[0.2em] uppercase">
              Enterprise Suite
            </span>
          </div>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight lowercase first-letter:uppercase">
            deals
          </h1>
          <p className="text-muted-foreground mt-1 font-semibold">
            Track your sales pipeline and closure rates with precision.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-border/50 hover:bg-accent/50 h-11 rounded-none px-6 font-semibold transition-all"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button
            onClick={() => alert('New Entry functionality coming soon!')}
            className="bg-primary text-primary-foreground border-primary/20 dark:shadow-primary/20 h-11 rounded-none border px-6 font-semibold shadow-none transition-all hover:-translate-y-0.5 active:scale-95 dark:text-black dark:shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard title="Pipeline Value" value="$4.2M" trend="+22.5%" />
        <StatCard title="Forecasted Revenue" value="$1.8M" trend="+12.4%" />
        <StatCard title="Close Rate" value="68%" trend="+5%" isHighlight />
      </div>

      <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
        <CardHeader className="border-border/50 border-b pb-8">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                Data Registry
              </CardTitle>
              <CardDescription>
                Comprehensive overview of your deals ecosystem.
              </CardDescription>
            </div>
            <div className="relative w-72">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                placeholder="Search registry..."
                className="bg-accent/30 border-border/50 focus:ring-primary/20 w-full rounded-none border py-2.5 pr-4 pl-10 text-sm transition-all focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-border/50 divide-y">
            {[
              'Q3 Enterprise Expansion',
              'Mid-Market SaaS Tier',
              'Strategic Partnership',
              'Global Support Renewal',
              'Platform Migration',
            ].map((deal, i) => (
              <div
                key={deal}
                className="hover:bg-accent/30 group flex cursor-pointer items-center justify-between p-6 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-accent/50 border-border/50 text-primary flex h-12 w-12 items-center justify-center rounded-none border text-lg font-semibold">
                    {deal.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold">{deal}</h4>
                    <p className="text-muted-foreground text-xs">
                      Est. Value: ${50 + i * 25}k • Closing in {14 + i * 7} days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Badge
                    variant="secondary"
                    className="rounded-none border-none bg-emerald-500/10 font-semibold text-emerald-500"
                  >
                    {i % 2 === 0 ? 'Negotiation' : 'Discovery'}
                  </Badge>
                  <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-accent/10 border-border/50 flex justify-center border-t p-6">
            <Button
              variant="ghost"
              className="hover:text-primary text-xs font-semibold tracking-widest uppercase"
            >
              View All Registry Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-primary/5 border-primary/20 flex items-center justify-between rounded-none border p-8 shadow-none dark:shadow-md">
        <div className="flex items-center gap-6">
          <div className="bg-primary dark:shadow-primary/20 flex h-14 w-14 items-center justify-center rounded-none shadow-none dark:shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-foreground text-xl font-semibold">
              AI Workflow Engine
            </h3>
            <p className="text-muted-foreground text-sm">
              Our neural networks are ready to automate your deals management.
            </p>
          </div>
        </div>
        <Button className="h-11 rounded-none bg-white px-8 text-xs font-semibold tracking-widest text-black uppercase shadow-none transition-all hover:bg-white/90 dark:shadow-md">
          Enable Automation
        </Button>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, isHighlight = false }) {
  return (
    <Card
      className={cn(
        'border-border/50 rounded-none shadow-none dark:shadow-md',
        isHighlight ? 'bg-primary/5 border-primary/50' : 'bg-card',
      )}
    >
      <CardContent className="pt-6">
        <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-widest uppercase">
          {title}
        </p>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-semibold tracking-tight">{value}</h3>
          <span className="rounded-none bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-500">
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

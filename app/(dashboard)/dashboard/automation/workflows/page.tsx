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

export default function ModulePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black tracking-widest uppercase"
            >
              PRO MODULE
            </Badge>
            <span className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
              Enterprise Suite
            </span>
          </div>
          <h1 className="text-foreground text-4xl font-black tracking-tight lowercase first-letter:uppercase">
            workflows
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Manage and optimize your workflows workflows with AI-driven
            insights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-border/50 hover:bg-accent/50 h-11 rounded-xl px-6 font-bold transition-all"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-primary shadow-primary/20 h-11 rounded-xl px-6 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard title="Active Items" value="1,284" trend="+12.5%" />
        <StatCard title="Efficiency" value="98.2%" trend="+2.4%" />
        <StatCard
          title="AI Optimizations"
          value="452"
          trend="+85%"
          isHighlight
        />
      </div>

      <Card className="border-border/50 bg-card/50 overflow-hidden rounded-[2rem] backdrop-blur-sm">
        <CardHeader className="border-border/50 border-b pb-8">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Data Registry</CardTitle>
              <CardDescription>
                Comprehensive overview of your workflows ecosystem.
              </CardDescription>
            </div>
            <div className="relative w-72">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                placeholder="Search registry..."
                className="bg-accent/30 border-border/50 focus:ring-primary/20 w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm transition-all focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-border/50 divide-y">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="hover:bg-accent/30 group flex cursor-pointer items-center justify-between p-6 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-accent/50 border-border/50 text-primary flex h-12 w-12 items-center justify-center rounded-2xl border text-lg font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold">
                      Sample workflows Item #{i}
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Modified 2 hours ago • System Admin
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Badge
                    variant="secondary"
                    className="rounded-lg border-none bg-emerald-500/10 font-bold text-emerald-500"
                  >
                    Operational
                  </Badge>
                  <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-accent/10 border-border/50 flex justify-center border-t p-6">
            <Button
              variant="ghost"
              className="hover:text-primary text-xs font-black tracking-widest uppercase"
            >
              View All Registry Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-primary/5 border-primary/20 flex items-center justify-between rounded-[2rem] border p-8">
        <div className="flex items-center gap-6">
          <div className="bg-primary shadow-primary/20 flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-foreground text-xl font-bold">
              AI Workflow Engine
            </h3>
            <p className="text-muted-foreground text-sm">
              Our neural networks are ready to automate your workflows
              management.
            </p>
          </div>
        </div>
        <Button className="h-11 rounded-xl bg-white px-8 text-xs font-black tracking-widest text-black uppercase shadow-xl transition-all hover:bg-white/90">
          Enable Automation
        </Button>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, isHighlight = false }) {
  return (
    <Card
      className={
        isHighlight
          ? 'border-primary/50 bg-primary/5 rounded-[2rem]'
          : 'border-border/50 bg-card/50 rounded-[2rem]'
      }
    >
      <CardContent className="pt-6">
        <p className="text-muted-foreground mb-2 text-[10px] font-black tracking-widest uppercase">
          {title}
        </p>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-black tracking-tight">{value}</h3>
          <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-500">
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

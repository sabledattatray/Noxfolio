'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Users,
  Zap,
  Activity,
  ArrowRight,
  ShieldCheck,
  Globe,
  Terminal,
  TrendingUp,
  Target,
  Cpu,
  Database,
  Lock,
  Code2,
  Copy,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AIAgentsPanel } from '@/components/ai/agents-panel';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const chartData = [
  { month: 'Jan', requests: 475000 },
  { month: 'Feb', requests: 500000 },
  { month: 'Mar', requests: 675000 },
  { month: 'Apr', requests: 854000 },
  { month: 'May', requests: 630000 },
  { month: 'Jun', requests: 556000 },
  { month: 'Jul', requests: 460000 },
  { month: 'Aug', requests: 852000 },
  { month: 'Sep', requests: 738000 },
  { month: 'Oct', requests: 869000 },
  { month: 'Nov', requests: 745000 },
  { month: 'Dec', requests: 695000 },
];

export function DashboardUser() {
  const [copied, setCopied] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText('pk_live_51Px...9v2m');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-700">
      {/* 1. CFO & FOUNDER HUB: Revenue Intelligence */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Net Revenue',
            value: '$128,430',
            change: '+12.5%',
            icon: TrendingUp,
            color: 'text-emerald-500',
          },
          {
            title: 'Avg. LTV',
            value: '$2,450',
            change: '+4.2%',
            icon: Target,
            color: 'text-blue-500',
          },
          {
            title: 'Active Subscriptions',
            value: '1,240',
            change: '+18%',
            icon: Users,
            color: 'text-purple-500',
          },
          {
            title: 'Churn Rate',
            value: '2.4%',
            change: '-0.8%',
            icon: ArrowDownRight,
            color: 'text-emerald-500',
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="group hover:border-primary/30 bg-card/50 rounded-none shadow-sm transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn('h-4 w-4', stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tighter">
                {stat.value}
              </div>
              <p className={cn('mt-1 text-[10px] font-bold', stat.color)}>
                {stat.change}{' '}
                <span className="text-muted-foreground/60 font-medium">
                  vs last month
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CORE COMMAND GRID: 2/3 and 1/3 Split */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* PRIMARY COLUMN: Analytics & Insights */}
        <div className="space-y-8 lg:col-span-2">
          {/* REQUEST ANALYTICS */}
          <Card className="bg-card border-border/50 h-fit overflow-hidden rounded-none shadow-sm">
            <CardHeader className="border-border/40 bg-accent/5 flex flex-row items-center justify-between border-b pb-6">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black tracking-tight">
                  Request Analytics
                </CardTitle>
                <CardDescription className="text-xs font-medium">
                  Autonomous request volume across all settlement clusters.
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                    Global Edge
                  </p>
                  <p className="text-primary text-lg font-black">8.4M</p>
                </div>
                <Badge
                  variant="outline"
                  className="border-primary/20 text-primary bg-primary/5 h-8 rounded-none px-3 text-[10px] font-black tracking-widest uppercase"
                >
                  Live Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="bg-card pt-6">
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                    barGap={0}
                    barCategoryGap="25%"
                  >
                    <defs>
                      <linearGradient
                        id="barGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#ED0600" stopOpacity={1} />
                        <stop
                          offset="100%"
                          stopColor="#ED0600"
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }}
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(237, 6, 0, 0.05)' }}
                      contentStyle={{
                        backgroundColor: '#000',
                        border: '1px solid rgba(237, 6, 0, 0.3)',
                        borderRadius: '0px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                      itemStyle={{ color: '#ED0600' }}
                    />
                    <Bar
                      dataKey="requests"
                      radius={0}
                      animationDuration={1000}
                      animationEasing="ease-in-out"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="url(#barGradient)" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AUTONOMOUS INSIGHTS FEED */}
          <AIAgentsPanel mode="insights" />
        </div>

        {/* SECONDARY COLUMN: Ops & Developer Hub */}
        <div className="space-y-8">
          {/* OPS STATUS */}
          <AIAgentsPanel mode="status" />

          {/* SCALE CARD */}
          <Card className="bg-card border-primary/20 group relative overflow-hidden rounded-none p-8 shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-transform duration-700 group-hover:rotate-12 dark:opacity-10">
              <Zap className="text-primary h-16 w-16" />
            </div>
            <h3 className="text-primary mb-2 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
              <Activity className="h-3 w-3" />
              Scale Infrastructure
            </h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed font-medium">
              Unlock 100% uptime SLA and unlimited members with enterprise
              clusters.
            </p>
            <Button className="h-12 w-full rounded-none bg-[#ED0600] font-black tracking-widest text-white uppercase shadow-lg shadow-[#ED0600]/20 transition-all hover:scale-[1.02] hover:bg-[#D10500]">
              Upgrade Now
            </Button>
          </Card>

          {/* DEVELOPER PORTAL */}
          <Card className="bg-card border-border/50 h-fit overflow-hidden rounded-none shadow-sm">
            <CardHeader className="border-border/40 border-b pb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-none bg-blue-500/10 p-2 text-blue-500">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-black tracking-tight">
                    Developer Portal
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Manage live environment keys and webhooks.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-3">
                <Label className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                  Live Public Key
                </Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value="pk_live_51Px...9v2m"
                    className="bg-accent/30 border-border/50 h-10 rounded-none font-mono text-xs"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyKey}
                    className="border-border/50 h-10 w-10 shrink-0 rounded-none"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-border/40 flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-none bg-emerald-500" />
                    <span className="text-xs font-bold">Live Webhooks</span>
                  </div>
                  <span className="text-muted-foreground text-[10px] font-black uppercase">
                    99.9% Delivery
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      event: 'invoice.paid',
                      time: '2m ago',
                      status: 'Success',
                    },
                    {
                      event: 'subscription.created',
                      time: '14m ago',
                      status: 'Success',
                    },
                    {
                      event: 'payment.failed',
                      time: '1h ago',
                      status: 'Alert',
                    },
                  ].map((hook, i) => (
                    <div
                      key={i}
                      className="group flex cursor-pointer items-center justify-between"
                    >
                      <div>
                        <p className="group-hover:text-primary text-[11px] font-bold transition-colors">
                          {hook.event}
                        </p>
                        <p className="text-muted-foreground text-[9px]">
                          {hook.time}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'h-5 rounded-none px-2 text-[8px] font-black uppercase',
                          hook.status === 'Alert'
                            ? 'border-amber-500/30 bg-amber-500/5 text-amber-500'
                            : 'border-emerald-500/30 bg-emerald-500/5 text-emerald-500',
                        )}
                      >
                        {hook.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/5 h-12 w-full rounded-none text-xs font-bold transition-all"
              >
                Access Full Documentation
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Shield,
  Zap,
  Activity,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardAdmin() {
  const systemStats = [
    {
      title: 'Total Users',
      value: '1,284',
      change: '+12%',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'System Load',
      value: '24%',
      change: '-2%',
      icon: Activity,
      color: 'text-emerald-500',
    },
    {
      title: 'Active Orgs',
      value: '412',
      change: '+18%',
      icon: Shield,
      color: 'text-purple-500',
    },
    {
      title: 'API Traffic',
      value: '8.4M',
      change: '+24%',
      icon: Zap,
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight">
          Platform Overview (Admin)
        </h1>
        <p className="text-muted-foreground mt-1 font-medium">
          System-wide performance and administrative controls.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat, i) => (
          <Card
            key={i}
            className="bg-card border-border/50 hover:border-primary/30 shadow-sm transition-all"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-black tracking-widest uppercase">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{stat.value}</div>
              <p className="mt-1 text-xs font-bold text-emerald-500">
                {stat.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="bg-card border-border/50 rounded-[32px] shadow-sm">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="font-bold">Main API Cluster</span>
              </div>
              <span className="text-xs font-black text-emerald-500">
                OPERATIONAL
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="font-bold">Database Nodes</span>
              </div>
              <span className="text-xs font-black text-emerald-500">
                OPERATIONAL
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                <span className="font-bold">Edge Cache (US-East)</span>
              </div>
              <span className="text-xs font-black text-amber-500">
                RE-ROUTING
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 rounded-[32px] p-6 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Admin Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="h-12 justify-start rounded-xl font-bold"
              >
                Manage All Users
              </Button>
              <Button
                variant="outline"
                className="h-12 justify-start rounded-xl font-bold"
              >
                System Configuration
              </Button>
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive/5 h-12 justify-start rounded-xl font-bold"
              >
                Maintenance Mode
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

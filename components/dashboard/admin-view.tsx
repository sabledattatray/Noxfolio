'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Users,
  Shield,
  Zap,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Server,
  Globe,
  Database,
  Lock,
  Cpu,
  Terminal,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function DashboardAdmin() {
  const systemStats = [
    {
      title: 'Global Revenue',
      value: '$2.4M',
      change: '+14.2%',
      icon: TrendingUp,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Total Users',
      value: '14,842',
      change: '+12%',
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Active Orgs',
      value: '1,212',
      change: '+18%',
      icon: Shield,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'API Throughput',
      value: '142.8M',
      change: '+24%',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
  ];

  const systemHealth = [
    {
      name: 'Core API Gateway',
      status: 'Healthy',
      latency: '42ms',
      load: '14%',
      icon: Server,
    },
    {
      name: 'Primary Ledger DB',
      status: 'Healthy',
      latency: '12ms',
      load: '8%',
      icon: Database,
    },
    {
      name: 'AI Inference Node',
      status: 'Healthy',
      latency: '184ms',
      load: '64%',
      icon: Cpu,
    },
    {
      name: 'Global CDN Edge',
      status: 'Warning',
      latency: '92ms',
      load: '88%',
      icon: Globe,
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 duration-500">
      {/* Admin Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge className="bg-destructive/10 text-destructive rounded-none border-transparent px-2 py-0 text-[10px] font-black tracking-widest uppercase">
              Root Authority
            </Badge>
            <span className="h-1.5 w-1.5 animate-pulse rounded-none bg-emerald-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">
            Platform Command Center
          </h1>
          <p className="text-muted-foreground mt-1 text-lg font-medium">
            Global system-wide oversight and administrative protocols.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-border/50 h-12 rounded-none px-6 font-bold"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh State
          </Button>
          <Button className="shadow-primary/20 bg-primary h-12 rounded-none px-8 font-bold shadow-xl">
            <Terminal className="mr-2 h-4 w-4" />
            System Console
          </Button>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat, i) => (
          <Card
            key={i}
            className="group bg-card border-border/50 hover:border-primary/30 relative overflow-hidden rounded-none shadow-sm transition-all duration-500"
          >
            <CardHeader className="space-y-4 pb-2">
              <div
                className={`w-fit rounded-none p-3 ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:scale-110`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-muted-foreground text-sm font-black tracking-widest uppercase">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tight">
                {stat.value}
              </div>
              <p className="mt-1 text-xs font-bold text-emerald-500">
                {stat.change}{' '}
                <span className="text-muted-foreground/60 font-medium">
                  vs last period
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Real-time Infrastructure Status */}
        <Card className="bg-card border-border/50 overflow-hidden rounded-none shadow-sm lg:col-span-2">
          <CardHeader className="border-border/40 border-b pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold tracking-tight">
                  Infrastructure Health
                </CardTitle>
                <CardDescription className="font-medium">
                  Live telemetry from global service clusters.
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="rounded-none text-[10px] font-black tracking-widest uppercase"
              >
                4 Nodes Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-border/40 divide-y">
              {systemHealth.map((node) => (
                <div
                  key={node.name}
                  className="hover:bg-accent/5 group flex items-center justify-between p-6 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 rounded-none p-3 transition-all">
                      <node.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold">{node.name}</p>
                      <div className="mt-0.5 flex items-center gap-3">
                        <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                          Load: {node.load}
                        </span>
                        <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                          Ping: {node.latency}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${
                        node.status === 'Healthy'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-amber-500/10 text-amber-500'
                      } rounded-none border-transparent text-[9px] font-black tracking-widest uppercase`}
                    >
                      {node.status}
                    </Badge>
                    <ArrowUpRight className="text-muted-foreground/40 group-hover:text-primary h-4 w-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Administrative Protocols */}
        <div className="space-y-6">
          <Card className="bg-card border-border/50 rounded-none p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-black tracking-tight">
              Security Protocols
            </h3>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="border-border/50 hover:bg-primary/5 hover:border-primary/30 group h-14 w-full justify-start rounded-none transition-all"
              >
                <div className="bg-primary/10 text-primary mr-4 rounded-none p-2 transition-transform group-hover:scale-110">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="font-bold">Access Control List</span>
              </Button>
              <Button
                variant="outline"
                className="border-border/50 group h-14 w-full justify-start rounded-none transition-all hover:border-blue-500/30 hover:bg-blue-500/5"
              >
                <div className="mr-4 rounded-none bg-blue-500/10 p-2 text-blue-500 transition-transform group-hover:scale-110">
                  <Lock className="h-5 w-5" />
                </div>
                <span className="font-bold">Encryption Keys</span>
              </Button>
              <Button
                variant="outline"
                className="border-border/50 group h-14 w-full justify-start rounded-none transition-all hover:border-amber-500/30 hover:bg-amber-500/5"
              >
                <div className="mr-4 rounded-none bg-amber-500/10 p-2 text-amber-500 transition-transform group-hover:scale-110">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <span className="font-bold">Incident Reports</span>
              </Button>
            </div>
          </Card>

          <Card className="bg-destructive/5 border-destructive/20 group relative overflow-hidden rounded-none border p-8">
            <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform duration-700 group-hover:rotate-12">
              <AlertTriangle className="text-destructive h-20 w-20" />
            </div>
            <h3 className="text-destructive mb-2 text-[10px] font-black tracking-widest uppercase">
              Emergency Override
            </h3>
            <p className="mb-6 text-sm leading-relaxed font-medium">
              Initiate global system maintenance mode and freeze all active
              settlement cycles.
            </p>
            <Button
              variant="destructive"
              className="shadow-destructive/20 h-12 w-full rounded-none font-black tracking-widest uppercase shadow-lg transition-all hover:scale-[1.02]"
            >
              Trigger Lockdown
            </Button>
          </Card>
        </div>
      </div>

      {/* Global Activity Map Placeholder */}
      <Card className="bg-card border-border/50 relative overflow-hidden rounded-none p-10 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary-rgb),0.1),transparent)]" />
        <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
          <Globe className="text-primary/40 h-16 w-16 animate-pulse" />
          <h3 className="text-2xl font-black tracking-tight">
            Global Traffic Orchestration
          </h3>
          <p className="text-muted-foreground max-w-lg font-medium">
            Real-time visualization of settlement traffic across 42 availability
            zones. Integration with planetary edge-runtime active.
          </p>
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 h-12 rounded-none px-10 font-bold"
          >
            Open Map View
          </Button>
        </div>
      </Card>
    </div>
  );
}

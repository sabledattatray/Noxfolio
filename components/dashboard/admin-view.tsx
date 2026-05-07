'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Zap, Activity, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardAdmin() {
  const systemStats = [
    { title: 'Total Users', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-500' },
    { title: 'System Load', value: '24%', change: '-2%', icon: Activity, color: 'text-emerald-500' },
    { title: 'Active Orgs', value: '412', change: '+18%', icon: Shield, color: 'text-purple-500' },
    { title: 'API Traffic', value: '8.4M', change: '+24%', icon: Zap, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black italic tracking-tight">Platform Overview (Admin)</h1>
        <p className="text-muted-foreground mt-1 font-medium">System-wide performance and administrative controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, i) => (
          <Card key={i} className="bg-card border-border/50 hover:border-primary/30 transition-all shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{stat.value}</div>
              <p className="text-xs font-bold text-emerald-500 mt-1">{stat.change} from last week</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card border-border/50 rounded-[32px] shadow-sm">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">Main API Cluster</span>
              </div>
              <span className="text-xs font-black text-emerald-500">OPERATIONAL</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">Database Nodes</span>
              </div>
              <span className="text-xs font-black text-emerald-500">OPERATIONAL</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-bold">Edge Cache (US-East)</span>
              </div>
              <span className="text-xs font-black text-amber-500">RE-ROUTING</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 rounded-[32px] shadow-sm p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Admin Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="h-12 justify-start font-bold rounded-xl">Manage All Users</Button>
              <Button variant="outline" className="h-12 justify-start font-bold rounded-xl">System Configuration</Button>
              <Button variant="outline" className="h-12 justify-start font-bold rounded-xl text-destructive hover:bg-destructive/5">Maintenance Mode</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIAgentsPanel } from '@/components/ai/agents-panel';
import {
  TrendingUp,
  Users,
  CreditCard,
  ArrowUpRight,
  Shield,
  Zap,
  Activity,
  Calendar,
  CheckCircle2,
  FileText,
  Coins,
} from 'lucide-react';
import { User } from '@/lib/db/schema';

export function DashboardUser({
  user,
}: {
  user:
    | (User & {
        organization?: any;
        stats?: {
          memberCount: number;
          recentActivities: any[];
        };
      })
    | null
    | undefined;
}) {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);
  const [showReportSuccess, setShowReportSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    setChartData([...Array(12)].map(() => 40 + Math.random() * 60));
  }, []);

  const stats = user?.stats;

  const dynamicStats = [
    {
      title: 'Current Plan',
      value: user?.organization?.planName || 'Free Trial',
      change: 'Active',
      trend: 'up',
      icon: Shield,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Active Members',
      value: stats?.memberCount?.toString() || '1',
      change: 'Real-time',
      trend: 'neutral',
      icon: Users,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Monthly Usage',
      value: stats?.recentActivities?.length?.toString() || '0',
      change: 'Events',
      trend: 'up',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Credits Left',
      value: user?.organization?.balance?.toString() || '50',
      change: 'Trial',
      trend: 'neutral',
      icon: Coins,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
  ];

  const handleDownloadReport = () => {
    const csvContent = [
      ['Metric', 'Value', 'Change'],
      ...dynamicStats.map((s) => [s.title, s.value, s.change]),
      ['Month', 'Usage Volume'],
      ...['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map(
        (m, i) => [m, `${Math.floor((chartData[i] || 40) * 10)}k`],
      ),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Noxfolio_Report_${new Date().toISOString().split('T')[0]}.csv`,
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowReportSuccess(true);
    setTimeout(() => setShowReportSuccess(false), 3000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-black tracking-tight text-transparent italic">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Here's what's happening with your organization today.
          </p>
        </div>
        <div className="relative flex items-center gap-3">
          {showReportSuccess && (
            <div className="animate-in slide-in-from-bottom-2 fade-in absolute -top-12 right-0 z-10 flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-[10px] font-black text-white shadow-lg shadow-emerald-500/20 duration-300">
              <CheckCircle2 className="h-3 w-3" />
              REPORT GENERATED
            </div>
          )}
          <Button
            variant="outline"
            className="border-border/50 bg-background/50 group h-12 rounded-xl px-6 font-bold backdrop-blur-sm"
          >
            <Calendar className="group-hover:text-primary mr-2 h-4 w-4 transition-colors" />
            Last 30 Days
          </Button>
          <Button
            className="shadow-primary/25 h-12 rounded-xl px-8 font-bold shadow-xl transition-all hover:-translate-y-0.5"
            onClick={handleDownloadReport}
          >
            <FileText className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dynamicStats.map((stat, i) => (
          <Card
            key={i}
            className="group bg-card border-border/50 hover:border-primary/30 relative overflow-hidden shadow-sm transition-all duration-500"
          >
            <div className="via-primary/0 group-hover:via-primary/40 absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent to-transparent transition-all duration-1000" />
            <CardHeader className="space-y-4 pb-2">
              <div
                className={`w-fit rounded-2xl p-3 shadow-lg ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:scale-110`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-muted-foreground group-hover:text-foreground flex w-full items-center justify-between text-sm font-black tracking-widest uppercase transition-colors">
                {stat.title}
                <ArrowUpRight className="h-3 w-3 translate-x-1 -translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black tracking-tighter">
                {stat.value}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-black tracking-tighter ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}
                >
                  {stat.change}
                </div>
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase opacity-60">
                  {stat.title === 'Credits Left'
                    ? 'Free Trial'
                    : 'vs last month'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Live System Activity
        </h2>
        <Card className="bg-card border-border/50 relative overflow-hidden rounded-[32px] shadow-sm">
          <CardContent className="p-0">
            <div className="divide-border/50 divide-y">
              {user?.stats?.recentActivities &&
              user.stats.recentActivities.length > 0 ? (
                user.stats.recentActivities.map((activity, i) => (
                  <div
                    key={activity.id}
                    className="hover:bg-muted/30 group flex items-center gap-4 p-6 transition-colors"
                  >
                    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-black tracking-tight">
                          {activity.action.replace(/_/g, ' ')}
                        </p>
                        <span className="text-muted-foreground text-[10px] font-bold uppercase italic">
                          {new Date(activity.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs font-medium">
                        Triggered by{' '}
                        <span className="text-foreground font-bold">
                          {activity.userName || 'System'}
                        </span>
                      </p>
                    </div>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/5" />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Activity className="text-muted-foreground/20 mb-4 h-12 w-12" />
                  <p className="text-muted-foreground text-sm font-bold">
                    No recent activity detected.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="bg-card border-border/40 overflow-hidden rounded-[32px] shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">
              Usage Overview
            </CardTitle>
            <CardDescription className="font-medium">
              System performance and request volume across all endpoints.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] w-full items-end justify-between gap-3 px-4 pt-10">
              {[...Array(12)].map((_, i) => {
                const height = mounted ? chartData[i] || 40 : 40;
                return (
                  <div
                    key={i}
                    className="group flex flex-1 flex-col items-center gap-4"
                  >
                    <div
                      className="bg-primary/10 group-hover:bg-primary/30 relative w-full rounded-2xl shadow-inner transition-all duration-700"
                      style={{ height: `${height}%` }}
                    >
                      <div className="bg-foreground text-background absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg px-2 py-1 text-[10px] font-black opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100">
                        {Math.floor(height * 10)}k
                      </div>
                    </div>
                    <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase opacity-60">
                      {
                        [
                          'Jan',
                          'Feb',
                          'Mar',
                          'Apr',
                          'May',
                          'Jun',
                          'Jul',
                          'Aug',
                          'Sep',
                          'Oct',
                          'Nov',
                          'Dec',
                        ][i]
                      }
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 rounded-[32px] shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">
              Quick Actions
            </CardTitle>
            <CardDescription className="font-medium">
              Common tasks and configurations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/organization" className="block">
              <Button
                variant="outline"
                className="border-border/50 hover:border-primary/40 bg-background/30 hover:bg-primary/5 group h-14 w-full justify-start rounded-2xl transition-all"
              >
                <div className="bg-primary/10 text-primary mr-4 flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-110">
                  <Users className="h-5 w-5" />
                </div>
                <span className="font-bold">Manage Team</span>
                <ArrowUpRight className="text-muted-foreground group-hover:text-primary ml-auto h-4 w-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </Link>
            <Link href="/dashboard/security" className="block">
              <Button
                variant="outline"
                className="border-border/50 bg-background/30 group h-14 w-full justify-start rounded-2xl transition-all hover:border-amber-500/40 hover:bg-amber-500/5"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shadow-sm transition-transform group-hover:scale-110">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="font-bold">Security Audit</span>
                <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber-500" />
              </Button>
            </Link>
            <Link href="/dashboard/billing" className="block">
              <Button
                variant="outline"
                className="border-border/50 bg-background/30 group h-14 w-full justify-start rounded-2xl transition-all hover:border-purple-500/40 hover:bg-purple-500/5"
              >
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 shadow-sm transition-transform group-hover:scale-110">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span className="font-bold">Billing Settings</span>
                <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-purple-500" />
              </Button>
            </Link>
            <div className="border-border/50 mt-2 border-t pt-6">
              <div className="from-primary/20 via-primary/5 border-primary/20 group relative overflow-hidden rounded-[24px] border bg-gradient-to-br to-transparent p-6">
                <div className="bg-primary/10 absolute -right-8 -bottom-8 h-32 w-32 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
                <p className="text-md text-primary mb-1 flex items-center gap-2 font-black">
                  <TrendingUp className="h-5 w-5" />
                  Upgrade to Pro
                </p>
                <p className="text-muted-foreground mb-6 text-[11px] leading-relaxed font-medium">
                  Unlock advanced autonomous agents and unlimited members.
                </p>
                <Link href="/dashboard/billing">
                  <Button className="shadow-primary/20 w-full rounded-xl py-5 font-bold shadow-xl transition-all hover:-translate-y-0.5">
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  FileText
} from 'lucide-react';
import useSWR from 'swr';
import { User } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const stats = [
  {
    title: 'Monthly Revenue',
    value: '$12,450',
    change: '+12.5%',
    trend: 'up',
    icon: CreditCard,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Active Members',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: Users,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'API Requests',
    value: '1.2M',
    change: '+18.2%',
    trend: 'up',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    title: 'Success Rate',
    value: '99.9%',
    change: '0.0%',
    trend: 'neutral',
    icon: Activity,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
];

export default function DashboardPage() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);
  const [showReportSuccess, setShowReportSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    setChartData([...Array(12)].map(() => 40 + Math.random() * 60));
  }, []);

  const handleDownloadReport = () => {
    const csvContent = [
      ['Metric', 'Value', 'Change'],
      ...stats.map(s => [s.title, s.value, s.change]),
      ['Month', 'Usage Volume'],
      ...['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => [m, `${Math.floor((chartData[i] || 40) * 10)}k`])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `BillForge_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setShowReportSuccess(true);
    setTimeout(() => setShowReportSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent italic">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">Here's what's happening with your organization today.</p>
        </div>
        <div className="flex items-center gap-3 relative">
          {showReportSuccess && (
            <div className="absolute -top-12 right-0 bg-emerald-500 text-white text-[10px] font-black px-4 py-2 rounded-xl animate-in slide-in-from-bottom-2 fade-in duration-300 flex items-center gap-2 shadow-lg shadow-emerald-500/20 z-10">
              <CheckCircle2 className="w-3 h-3" />
              REPORT GENERATED
            </div>
          )}
          <Button variant="outline" className="rounded-xl h-12 border-border/50 bg-background/50 backdrop-blur-sm px-6 font-bold group">
            <Calendar className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
            Last 30 Days
          </Button>
          <Button 
            className="rounded-xl h-12 shadow-xl shadow-primary/25 font-bold px-8 hover:-translate-y-0.5 transition-all"
            onClick={handleDownloadReport}
          >
            <FileText className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="group relative overflow-hidden bg-card border-border/50 hover:border-primary/30 transition-all duration-500 shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-1000" />
            <CardHeader className="space-y-4 pb-2">
              <div className={`p-3 w-fit rounded-2xl shadow-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors flex items-center justify-between w-full">
                {stat.title}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`px-1.5 py-0.5 rounded-md text-[10px] font-black tracking-tighter ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                  {stat.change}
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">AI Autonomous Insights</h2>
        <AIAgentsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card border-border/40 overflow-hidden rounded-[32px] shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">Usage Overview</CardTitle>
            <CardDescription className="font-medium">System performance and request volume across all endpoints.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-end justify-between gap-3 pt-10 px-4">
              {[...Array(12)].map((_, i) => {
                const height = mounted ? (chartData[i] || 40) : 40;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                    <div 
                      className="w-full bg-primary/10 rounded-2xl group-hover:bg-primary/30 transition-all duration-700 relative shadow-inner" 
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 font-black shadow-xl">
                        {Math.floor(height * 10)}k
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 rounded-[32px] shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight">Quick Actions</CardTitle>
            <CardDescription className="font-medium">Common tasks and configurations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/organization" className="block">
              <Button variant="outline" className="w-full justify-start h-14 rounded-2xl border-border/50 hover:border-primary/40 bg-background/30 hover:bg-primary/5 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-bold">Manage Team</span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </Link>
            <Link href="/dashboard/security" className="block">
              <Button variant="outline" className="w-full justify-start h-14 rounded-2xl border-border/50 hover:border-amber-500/40 bg-background/30 hover:bg-amber-500/5 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-bold">Security Audit</span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-amber-500 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </Link>
            <Link href="/dashboard/billing" className="block">
              <Button variant="outline" className="w-full justify-start h-14 rounded-2xl border-border/50 hover:border-purple-500/40 bg-background/30 hover:bg-purple-500/5 group transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-sm">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="font-bold">Billing Settings</span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-purple-500 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </Link>
            <div className="pt-6 mt-2 border-t border-border/50">
              <div className="p-6 rounded-[24px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                <p className="text-md font-black text-primary mb-1 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Upgrade to Pro
                </p>
                <p className="text-[11px] text-muted-foreground mb-6 font-medium leading-relaxed">Unlock advanced autonomous agents and unlimited members.</p>
                <Link href="/dashboard/billing">
                  <Button className="w-full rounded-xl shadow-xl shadow-primary/20 font-bold py-5 hover:-translate-y-0.5 transition-all">Upgrade Now</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

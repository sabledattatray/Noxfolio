'use client';

import { Suspense } from 'react';
import { KPICard } from '@/components/analytics/kpi-card';
import { RevenueChart } from '@/components/analytics/revenue-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  BarChart3, 
  PieChart, 
  Calendar,
  Filter,
  Database,
  Cloud,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Intelligence</h1>
          <p className="text-muted-foreground mt-1">Real-time revenue, customer growth, and financial health metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-xl border-border/50">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-border/50">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button size="sm" className="rounded-xl">
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total MRR" 
          value="$128,430" 
          change={12.5} 
          trend="up" 
          description="Monthly Recurring Revenue"
        />
        <KPICard 
          title="Annual Run Rate" 
          value="$1.54M" 
          change={8.2} 
          trend="up" 
          description="Projected yearly revenue"
        />
        <KPICard 
          title="Churn Rate" 
          value="2.4%" 
          change={-0.5} 
          trend="down" 
          description="Customer attrition rate"
        />
        <KPICard 
          title="Avg. LTV" 
          value="$4,200" 
          change={5.1} 
          trend="up" 
          description="Customer Lifetime Value"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="h-[400px] w-full animate-pulse bg-accent/20 rounded-3xl" />}>
            <RevenueChart />
          </Suspense>
        </div>
        <div className="space-y-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary">
                <Zap className="w-4 h-4" />
                <CardTitle className="text-sm uppercase tracking-widest font-bold">AI Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-bold">Revenue Surge Detected</p>
                <p className="text-xs text-muted-foreground leading-relaxed">MRR grew 12.5% this month, primarily due to enterprise upgrades in the NA region.</p>
              </div>
              <div className="h-px bg-border/50" />
              <div className="space-y-1">
                <p className="text-sm font-bold">Churn Warning</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Startup plan churn is up 0.8%. Recommend launching a retention campaign.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Customer Segmentation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* ... existing segmentation bars ... */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Enterprise</span>
                  <span className="font-bold">45%</span>
                </div>
                <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Mid-Market</span>
                  <span className="font-bold">32%</span>
                </div>
                <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-primary/70 w-[32%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Startup</span>
                  <span className="font-bold">23%</span>
                </div>
                <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-primary/40 w-[23%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="pt-8 border-t border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-xl font-bold">Data Lake Integration</h2>
            <p className="text-sm text-muted-foreground">Stream your financial data directly to enterprise data warehouses.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 border-border/50 bg-card/50 hover:border-primary/30 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                <Database className="w-6 h-6" />
              </div>
              <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest group-hover:bg-primary group-hover:text-primary-foreground transition-colors">Connect</Badge>
            </div>
            <h3 className="font-bold">Snowflake</h3>
            <p className="text-xs text-muted-foreground mt-2">Real-time streaming of events and transactions to your Snowflake instance.</p>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 hover:border-primary/30 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Cloud className="w-6 h-6" />
              </div>
              <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest group-hover:bg-primary group-hover:text-primary-foreground transition-colors">Connect</Badge>
            </div>
            <h3 className="font-bold">Google BigQuery</h3>
            <p className="text-xs text-muted-foreground mt-2">Native integration for high-volume analytics and deep financial reporting.</p>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 hover:border-primary/30 transition-all cursor-pointer group opacity-50">
             <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-muted text-muted-foreground">
                <Database className="w-6 h-6" />
              </div>
              <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest">Enterprise Only</Badge>
            </div>
            <h3 className="font-bold">AWS Redshift</h3>
            <p className="text-xs text-muted-foreground mt-2">Seamless data warehousing for organizations running on AWS infrastructure.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

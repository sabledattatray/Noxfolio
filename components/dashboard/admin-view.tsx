'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  TrendingUp,
  Target,
  Users,
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  Phone,
  MessageSquare,
  Mic,
  FileText,
  Share2,
  Activity,
  MessageCircle,
  Mail,
  Globe,
  Zap,
  Calendar,
  Database,
  Headset,
  Book,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Plus,
  ExternalLink,
  Code2,
  Copy,
  CheckCircle2,
  Lock,
  Shield,
  Terminal,
  RefreshCw,
  AlertTriangle,
  Server,
  Search,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 pb-20 duration-700">
      <Tabs defaultValue="setup" className="space-y-6">
        <div className="border-border/50 flex items-center justify-between border-b pb-2">
          <TabsList className="h-12 gap-8 rounded-none bg-transparent p-0">
            <TabsTrigger
              value="setup"
              className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-0 pb-2 text-sm font-semibold tracking-widest uppercase shadow-none transition-all data-[state=active]:bg-transparent"
            >
              Set Up
            </TabsTrigger>
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-0 pb-2 text-sm font-semibold tracking-widest uppercase shadow-none transition-all data-[state=active]:bg-transparent"
            >
              Dashboard
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
              Progress
            </span>
            <div className="flex items-center gap-2">
              <div className="bg-accent/30 h-2 w-32 overflow-hidden rounded-none">
                <div className="bg-primary h-full w-[10%]" />
              </div>
              <span className="text-[10px] font-semibold">0/6</span>
            </div>
          </div>
        </div>

        <TabsContent
          value="setup"
          className="mt-6 space-y-8 border-none shadow-none outline-none"
        >
          {/* Top Row: 3 Equal Columns */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="border-border/50 bg-primary/5 group hover:bg-primary/10 relative flex h-full flex-col justify-between overflow-hidden rounded-none p-8 transition-all">
              <div className="space-y-6">
                <div className="bg-primary shadow-primary/20 flex h-12 w-12 items-center justify-center rounded-none shadow-lg">
                  <Cpu className="h-6 w-6 text-black" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    AI Agents
                  </h2>
                  <p className="text-muted-foreground text-xs font-medium">
                    Pre-built assistants ready to deploy
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <AgentItem
                    icon={Phone}
                    title="Calling"
                    sub="Outbound & inbound"
                  />
                  <AgentItem
                    icon={MessageSquare}
                    title="Support"
                    sub="Handle queries 24/7"
                  />
                  <AgentItem
                    icon={Target}
                    title="Qualifier"
                    sub="Score leads instantly"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-6">
                <p className="text-muted-foreground text-[10px] font-medium italic">
                  and many more agents...
                </p>
                <Button
                  variant="ghost"
                  className="hover:text-primary h-auto justify-start rounded-none p-0 text-[10px] font-semibold tracking-widest uppercase"
                >
                  Activate <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </Card>

            <Card className="border-border/50 bg-card flex h-full flex-col justify-between rounded-none p-8">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-none border border-orange-500/20 bg-orange-500/10">
                    <Mic className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Train AI</h3>
                    <p className="text-muted-foreground text-xs font-medium">
                      Feed it docs & data
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-6 px-2">
                  <WorkflowStepHorizontal
                    icon={FileText}
                    label="Business Docs"
                  />
                  <div className="bg-border/50 ml-6 h-4 w-px" />
                  <WorkflowStepHorizontal
                    icon={Share2}
                    label="Knowledge Base"
                  />
                  <div className="bg-border/50 ml-6 h-4 w-px" />
                  <WorkflowStepHorizontal icon={Cpu} label="Trained Agents" />
                </div>
              </div>
            </Card>

            <Card className="border-border/50 bg-card h-full rounded-none p-8">
              <div className="mb-8 flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-none border border-rose-500/20 bg-rose-500/10">
                  <Activity className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Channels</h3>
                  <p className="text-muted-foreground text-xs font-medium">
                    Connect everywhere
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <ChannelItem icon={MessageCircle} label="WhatsApp" />
                <ChannelItem icon={Mail} label="Email" />
                <ChannelItem icon={Phone} label="Voice" />
                <ChannelItem icon={MessageSquare} label="SMS" />
                <ChannelItem icon={Globe} label="Chat Widget" />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Bottom Left: Leads */}
            <Card className="border-border/50 bg-card h-full rounded-none p-8">
              <div className="mb-8 flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-none border border-blue-500/20 bg-blue-500/10">
                  <Target className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Capture All Leads</h3>
                  <p className="text-muted-foreground text-xs font-medium">
                    Grow your pipeline
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <LeadSource label="Web Forms" count="+12" />
                <LeadSource label="Meta Ads" count="+8" />
                <LeadSource label="WhatsApp Leads" count="+5" />
                <LeadSource label="Chat Widget" count="+3" />
                <LeadSource label="Excel Import" count="+50" />
              </div>
            </Card>

            {/* Bottom Middle: Stack & Team */}
            <div className="flex h-full flex-col space-y-8">
              <Card className="border-border/50 bg-card flex-grow rounded-none p-8">
                <div className="mb-8 flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-none border border-amber-500/20 bg-amber-500/10">
                    <Zap className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Connect Your Stack
                    </h3>
                    <p className="text-muted-foreground text-xs font-medium">
                      Sync your favorite tools
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <StackIcon
                    icon={Calendar}
                    color="bg-blue-500/10 text-blue-500"
                  />
                  <StackIcon
                    icon={Zap}
                    color="bg-orange-500/10 text-orange-500"
                  />
                  <StackIcon
                    icon={Database}
                    color="bg-purple-500/10 text-purple-500"
                  />
                  <div className="bg-accent/20 text-muted-foreground border-border/50 flex aspect-square items-center justify-center border text-xs font-semibold">
                    +47
                  </div>
                </div>
              </Card>

              <Card className="border-border/50 bg-card flex-grow rounded-none p-8">
                <div className="mb-8 flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-none border border-emerald-500/20 bg-emerald-500/10">
                    <Users className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Build Your Team</h3>
                    <p className="text-muted-foreground text-xs font-medium">
                      Invite & assign roles
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {['JD', 'AS', 'MK', 'RK'].map((initials) => (
                    <div
                      key={initials}
                      className="bg-accent border-border/50 flex h-10 w-10 items-center justify-center border text-[10px] font-semibold uppercase"
                    >
                      {initials}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="border-primary/30 text-primary h-10 rounded-none px-4 text-[10px] font-semibold tracking-widest uppercase"
                  >
                    + Invite
                  </Button>
                </div>
              </Card>
            </div>

            {/* Bottom Right: Help & Docs */}
            <div className="h-full space-y-4">
              <Button className="group flex h-32 w-full flex-col items-center justify-center gap-3 rounded-none bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.01]">
                <Headset className="h-10 w-10 transition-transform group-hover:scale-110" />
                <span className="text-xs font-semibold tracking-widest uppercase">
                  Get Help
                </span>
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-border/50 bg-card hover:bg-accent/50 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-none p-6 transition-colors">
                  <Book className="h-8 w-8 text-rose-500" />
                  <span className="text-[10px] font-semibold tracking-widest uppercase">
                    See Docs
                  </span>
                </Card>
                <Card className="border-border/50 bg-card hover:bg-accent/50 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-none p-6 transition-colors">
                  <Sparkles className="text-primary h-8 w-8" />
                  <span className="text-[10px] font-semibold tracking-widest uppercase">
                    Ask Agentix
                  </span>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="dashboard"
          className="mt-6 space-y-12 border-none shadow-none outline-none"
        >
          {/* Dashboard Filters */}
          <div className="border-border/50 flex flex-col items-center justify-between gap-4 border-b pb-6 sm:flex-row">
            <div className="bg-accent/20 flex items-center gap-2 rounded-none p-1">
              {['Today', 'Last 7 Days', 'Last 30 Days', 'All Time'].map(
                (period) => (
                  <Button
                    key={period}
                    variant="ghost"
                    className={cn(
                      'h-8 rounded-none px-4 text-[10px] font-semibold tracking-widest uppercase',
                      period === 'Last 30 Days'
                        ? 'bg-background shadow-sm'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {period}
                  </Button>
                ),
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-destructive animate-pulse text-[10px] font-semibold tracking-widest uppercase">
                Low credits: 50 remaining
              </span>
              <Button
                size="sm"
                className="bg-primary h-8 rounded-none px-4 text-[10px] font-semibold tracking-widest uppercase"
              >
                Add Credits
              </Button>
            </div>
          </div>

          {/* Section: Automation */}
          <DashboardSection title="Automation" count="4/4">
            <MetricCard
              icon={Zap}
              title="Workflows"
              value="3"
              subValue="0 Active"
              color="bg-emerald-500/10 text-emerald-500"
              actions={[
                { label: 'Create', icon: Plus },
                { label: 'View All', icon: ChevronRight },
              ]}
            />
            <MetricCard
              icon={Activity}
              title="Workflow Executions"
              value="0"
              subValue="0% Success"
              color="bg-emerald-500/10 text-emerald-500"
              actions={[{ label: 'View All', icon: ChevronRight }]}
            />
            <MetricCard
              icon={MessageSquare}
              title="Prompts"
              value="3"
              color="bg-blue-500/10 text-blue-500"
              actions={[
                { label: 'New', icon: Plus },
                { label: 'View All', icon: ChevronRight },
              ]}
              chart="bar"
            />
            <MetricCard
              icon={Cpu}
              title="AI Executions"
              value="23"
              subValue="100% Success"
              color="bg-purple-500/10 text-purple-500"
              actions={[{ label: 'View All', icon: ChevronRight }]}
              chart="line"
            />
          </DashboardSection>

          {/* Section: Customers */}
          <DashboardSection title="Customers" count="8/8">
            <MetricCard
              icon={Users}
              title="Contacts"
              value="0"
              subValue="0 New"
              color="bg-blue-500/10 text-blue-500"
              actions={[
                { label: 'Add', icon: Plus },
                { label: 'Import', icon: Share2 },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="area"
            />
            <MetricCard
              icon={Target}
              title="Deals"
              value="0"
              subValue="$0 Pipeline"
              color="bg-emerald-500/10 text-emerald-500"
              actions={[
                { label: 'Add', icon: Plus },
                { label: 'Import', icon: Share2 },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="bar"
            />
            <MetricCard
              icon={Shield}
              title="Companies"
              value="0"
              color="bg-indigo-500/10 text-indigo-500"
              actions={[
                { label: 'Add', icon: Plus },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="area"
            />
            <MetricCard
              icon={FileText}
              title="Tasks"
              value="0"
              subValue="0 Overdue"
              color="bg-rose-500/10 text-rose-500"
              actions={[
                { label: 'Add', icon: Plus },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="donut"
            />
            <MetricCard
              icon={Zap}
              title="Products"
              value="8"
              color="bg-amber-500/10 text-amber-500"
              actions={[
                { label: 'Add', icon: Plus },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="bar"
            />
            <MetricCard
              icon={MessageCircle}
              title="Forms"
              value="10"
              subValue="84 Subs"
              color="bg-cyan-500/10 text-cyan-500"
              actions={[
                { label: 'Create', icon: Plus },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="line"
            />
            <MetricCard
              icon={Globe}
              title="Visitors"
              value="0"
              subValue="0 Today"
              color="bg-blue-500/10 text-blue-500"
              actions={[{ label: 'View', icon: ChevronRight }]}
              chart="area"
            />
            <MetricCard
              icon={CreditCard}
              title="Payments"
              value="0"
              subValue="0 Received"
              color="bg-emerald-500/10 text-emerald-500"
              actions={[{ label: 'View', icon: ChevronRight }]}
              chart="line"
            />
          </DashboardSection>

          {/* Section: Communication */}
          <DashboardSection title="Communication" count="8/8">
            <MetricCard
              icon={Mail}
              title="Campaigns"
              value="0"
              subValue="0 Active"
              color="bg-orange-500/10 text-orange-500"
              actions={[
                { label: 'New', icon: Plus },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="bar"
            />
            <MetricCard
              icon={FileText}
              title="Templates"
              value="3"
              color="bg-blue-500/10 text-blue-500"
              actions={[
                { label: 'Create', icon: Plus },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="bar"
            />
            <MetricCard
              icon={Share2}
              title="Assets"
              value="0"
              color="bg-purple-500/10 text-purple-500"
              actions={[
                { label: 'Upload', icon: Plus },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="donut"
            />
            <MetricCard
              icon={Phone}
              title="Calls"
              value="Not Connected"
              subValue="0 Calls"
              color="bg-rose-500/10 text-rose-500"
              actions={[
                { label: 'Connect', icon: Plus },
                { label: 'Logs', icon: ChevronRight },
              ]}
              chart="spark"
            />
            <MetricCard
              icon={MessageCircle}
              title="WhatsApp"
              value="Not Connected"
              subValue="0 Messages"
              color="bg-emerald-500/10 text-emerald-500"
              actions={[
                { label: 'Connect', icon: Plus },
                { label: 'Logs', icon: ChevronRight },
              ]}
              chart="spark"
            />
            <MetricCard
              icon={Mail}
              title="Emails"
              value="Connected"
              subValue="0 Sent"
              color="bg-blue-500/10 text-blue-500"
              actions={[
                { label: 'Connect', icon: Plus },
                { label: 'Logs', icon: ChevronRight },
              ]}
              chart="line"
            />
            <MetricCard
              icon={MessageSquare}
              title="Chats"
              value="30"
              subValue="30 Active"
              color="bg-cyan-500/10 text-cyan-500"
              actions={[
                { label: 'New', icon: Plus },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="line"
            />
            <MetricCard
              icon={Target}
              title="Segments"
              value="0"
              color="bg-indigo-500/10 text-indigo-500"
              actions={[
                { label: 'Create', icon: Plus },
                { label: 'View', icon: ChevronRight },
              ]}
              chart="bar"
            />
          </DashboardSection>

          {/* Section: Analytics & Settings */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <DashboardSection
              title="Analytics"
              count="3/3"
              className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
            >
              <MetricCard
                icon={TrendingUp}
                title="Dashboards"
                value="0"
                color="bg-blue-500/10 text-blue-500"
                actions={[
                  { label: 'New', icon: Plus },
                  { label: 'View', icon: ChevronRight },
                ]}
                chart="bar"
              />
              <MetricCard
                icon={Activity}
                title="Charts"
                value="0"
                color="bg-emerald-500/10 text-emerald-500"
                actions={[
                  { label: 'New', icon: Plus },
                  { label: 'View', icon: ChevronRight },
                ]}
                chart="donut"
              />
              <MetricCard
                icon={Search}
                title="Queries"
                value="0"
                color="bg-amber-500/10 text-amber-500"
                actions={[
                  { label: 'New', icon: Plus },
                  { label: 'View', icon: ChevronRight },
                ]}
                chart="spark"
              />
            </DashboardSection>

            <DashboardSection
              title="Settings"
              count="7/7"
              className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
            >
              <MetricCard
                icon={Zap}
                title="Integrations"
                value="11"
                subValue="11 Active"
                color="bg-emerald-500/10 text-emerald-500"
                actions={[
                  { label: 'Add', icon: Plus },
                  { label: 'Manage', icon: ChevronRight },
                ]}
                chart="donut"
              />
              <MetricCard
                icon={Users}
                title="Team"
                value="1"
                subValue="0 Pending"
                color="bg-blue-500/10 text-blue-500"
                actions={[
                  { label: 'Invite', icon: Plus },
                  { label: 'Manage', icon: ChevronRight },
                ]}
                chart="donut"
              />
              <MetricCard
                icon={Share2}
                title="Incoming Webhooks"
                value="0"
                subValue="0 Active"
                color="bg-purple-500/10 text-purple-500"
                actions={[
                  { label: 'Add', icon: Plus },
                  { label: 'Manage', icon: ChevronRight },
                ]}
                chart="spark"
              />
            </DashboardSection>
          </div>

          {/* Widget Gallery Footer */}
          <div className="border-border/50 mt-12 border-t pt-12">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold">Widget Gallery</h3>
                <Badge
                  variant="outline"
                  className="border-primary/20 text-primary rounded-none"
                >
                  30 of 30 widgets active
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="h-10 rounded-none px-6 text-[10px] font-semibold tracking-widest uppercase"
                >
                  Reset to Default
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                'Automation',
                'Customers',
                'Communication',
                'Analytics',
                'Settings',
              ].map((cat) => (
                <div key={cat} className="space-y-4">
                  <h4 className="text-muted-foreground border-border/40 border-b pb-2 text-[10px] font-semibold tracking-widest uppercase">
                    {cat}
                  </h4>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="hover:bg-accent/30 flex cursor-pointer items-center justify-between p-2 text-xs transition-colors"
                      >
                        <span className="font-medium">Widget Type {i}</span>
                        <div className="bg-primary h-4 w-8 rounded-none" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DashboardSection({ title, count, children, className }: any) {
  return (
    <div className="space-y-6">
      <div className="border-border/40 flex items-center justify-between border-b pb-2">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <span className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
          {count}
        </span>
      </div>
      <div
        className={cn(
          'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  title,
  value,
  subValue,
  color,
  actions,
  chart,
}: any) {
  return (
    <Card className="border-border/50 bg-card hover:border-primary/30 group flex h-full flex-col overflow-hidden rounded-none shadow-none transition-all dark:shadow-md">
      <div className="flex-grow space-y-4 p-5">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-none',
              color,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-right">
            <h4 className="text-muted-foreground max-w-[120px] truncate text-[10px] font-semibold tracking-widest uppercase">
              {title}
            </h4>
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-2">
          <div className="truncate text-3xl font-semibold tracking-tight">
            {value}
          </div>
          {subValue && (
            <div
              className={cn(
                'px-1.5 py-0.5 text-[10px] font-semibold uppercase',
                color,
              )}
            >
              {subValue}
            </div>
          )}
        </div>

        {chart && (
          <div className="flex h-12 w-full items-end gap-1 pt-2 opacity-50 transition-opacity group-hover:opacity-100">
            {chart === 'bar' &&
              [40, 70, 45, 90, 65].map((h, i) => (
                <div
                  key={i}
                  className="bg-primary/20 h-[var(--h)] flex-grow rounded-none"
                  style={{ '--h': `${h}%` } as any}
                />
              ))}
            {chart === 'line' && (
              <svg
                className="text-primary/30 h-full w-full"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 35 Q 20 10, 40 25 T 80 5 T 100 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            )}
            {chart === 'area' && (
              <svg
                className="text-primary/10 h-full w-full"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 40 L0 30 Q 25 10, 50 25 T 100 5 L 100 40 Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {chart === 'spark' && (
              <div className="bg-primary/20 mb-2 h-px w-full" />
            )}
            {chart === 'donut' && (
              <div className="border-primary/20 border-t-primary ml-auto h-10 w-10 animate-spin self-center rounded-full border-4" />
            )}
          </div>
        )}
      </div>

      <div className="border-border/40 bg-accent/5 flex items-center gap-1 border-t p-2">
        {actions?.map((action: any, i: number) => (
          <Button
            key={i}
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 hover:text-primary h-7 w-7 rounded-none transition-colors"
            title={action.label}
          >
            <action.icon className="h-3.5 w-3.5" />
          </Button>
        ))}
      </div>
    </Card>
  );
}

function AgentItem({ icon: Icon, title, sub }: any) {
  return (
    <div className="group flex cursor-pointer items-start gap-4">
      <div className="bg-accent/50 border-border/50 group-hover:bg-primary/20 group-hover:border-primary flex h-10 w-10 items-center justify-center rounded-none border transition-all">
        <Icon className="text-primary h-5 w-5" />
      </div>
      <div>
        <h4 className="group-hover:text-primary text-sm font-semibold transition-colors">
          {title}
        </h4>
        <p className="text-muted-foreground text-xs">{sub}</p>
      </div>
    </div>
  );
}

function WorkflowStepHorizontal({ icon: Icon, label }: any) {
  return (
    <div className="group flex items-center gap-4">
      <div className="bg-accent/30 border-border/50 group-hover:border-primary/50 flex h-12 w-12 items-center justify-center rounded-none border transition-colors">
        <Icon className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
      </div>
      <span className="text-muted-foreground text-[10px] font-semibold tracking-widest whitespace-nowrap uppercase">
        {label}
      </span>
    </div>
  );
}

function ChannelItem({ icon: Icon, label }: any) {
  return (
    <div className="border-border/40 hover:border-primary/30 group bg-accent/5 flex cursor-pointer items-center justify-between rounded-none border p-3 transition-all">
      <div className="flex items-center gap-3">
        <Icon className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <Badge
        variant="outline"
        className="h-5 rounded-none border-emerald-500/20 bg-emerald-500/5 text-[8px] font-bold text-emerald-500"
      >
        LIVE
      </Badge>
    </div>
  );
}

function LeadSource({ label, count }: any) {
  return (
    <div className="bg-accent/5 border-border/40 hover:bg-accent/10 flex cursor-pointer items-center justify-between rounded-none border p-3 text-xs transition-colors">
      <span className="font-medium">{label}</span>
      <span className="font-bold text-emerald-500">{count}</span>
    </div>
  );
}

function StackIcon({ icon: Icon, color }: any) {
  return (
    <div
      className={cn(
        'border-border/50 flex aspect-square cursor-pointer items-center justify-center rounded-none border transition-transform hover:scale-110',
        color,
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}

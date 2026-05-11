'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Loader2,
  CheckCircle2,
  BrainCircuit,
  Settings2,
  X,
  Target,
  Zap,
  Info,
  ShieldCheck,
  Activity,
} from 'lucide-react';
import { AutonomousAgentService, AgentInsight } from '@/modules/ai/agents';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AIAgentsPanel({
  mode = 'full',
}: {
  mode?: 'full' | 'insights' | 'status';
}) {
  const {
    data: insights,
    error,
    isLoading,
  } = useSWR<AgentInsight[]>('/api/ai/insights', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
  });

  const [executingId, setExecutingId] = useState<string | null>(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleExecute = async (id: string) => {
    setExecutingId(id);
    const result = await AutonomousAgentService.executeAction(id);
    if (result.success) {
      // Logic for post-execution
    }
    setExecutingId(null);
  };

  const renderSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 h-12 w-12 rounded-none" />
          <div className="space-y-2">
            <div className="bg-accent/20 h-6 w-32 rounded-none" />
            <div className="bg-accent/10 h-3 w-48 rounded-none" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card
            key={i}
            className="bg-accent/5 border-border/20 rounded-none p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-1 gap-4">
                <div className="bg-accent/20 h-12 w-12 shrink-0 rounded-none" />
                <div className="flex-1 space-y-3">
                  <div className="bg-accent/20 h-5 w-1/3 rounded-none" />
                  <div className="bg-accent/10 h-4 w-full rounded-none" />
                </div>
              </div>
              <div className="bg-accent/20 h-12 w-32 rounded-none" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return mode === 'status' ? (
      <div className="bg-accent/5 h-64 w-full animate-pulse rounded-none" />
    ) : (
      renderSkeleton()
    );
  }

  const activeInsights = Array.isArray(insights) ? insights : [];
  const revenueGuardInsight = activeInsights.find(
    (i) => i.type === 'revenue_guard',
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-none shadow-inner">
            <Bot className="text-primary h-7 w-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Autonomous Insights
            </h2>
            <p className="text-muted-foreground text-sm font-medium">
              Real-time optimization engine active.
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-none border border-emerald-500/10 bg-emerald-500/5 px-4 py-2 md:flex">
          <div className="h-2 w-2 animate-pulse rounded-none bg-emerald-500" />
          <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase">
            System Optimal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Revenue Guard Active Protection Card */}
        <Card className="bg-card border-primary/20 group relative overflow-hidden rounded-none border-l-4 p-6">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-opacity group-hover:opacity-10 dark:opacity-5">
            <ShieldCheck className="text-primary h-20 w-20" />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="bg-primary/10 text-primary rounded-none p-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="text-lg font-black tracking-tight uppercase">
                    Revenue Guard AI
                  </h3>
                  <Badge className="rounded-none border-transparent bg-emerald-500/10 text-[8px] font-black tracking-widest text-emerald-500 uppercase">
                    Active Protection
                  </Badge>
                </div>
                <p className="text-muted-foreground max-w-lg text-sm">
                  {revenueGuardInsight
                    ? revenueGuardInsight.description
                    : 'No revenue leaks detected in the current settlement cycle. Proactive scanning for failed payments and overdue invoices is active.'}
                </p>
              </div>
            </div>
            {revenueGuardInsight && (
              <Button
                onClick={() => handleExecute(revenueGuardInsight.id)}
                disabled={executingId === revenueGuardInsight.id}
                className="bg-primary hover:bg-primary/90 shadow-primary/20 h-10 rounded-none px-6 text-[10px] font-black tracking-widest text-white uppercase shadow-lg"
              >
                {executingId === revenueGuardInsight.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Execute Recovery'
                )}
              </Button>
            )}
          </div>
        </Card>

        {/* Other Insights */}
        {activeInsights
          .filter((i) => i.type !== 'revenue_guard')
          .map((insight) => (
            <Card
              key={insight.id}
              className="group hover:border-primary/30 bg-card/50 rounded-none p-6 shadow-sm transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div
                    className={`mt-1 rounded-none p-3 transition-transform group-hover:scale-110 ${
                      insight.impact === 'high'
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-amber-500/10 text-amber-500'
                    }`}
                  >
                    {insight.type === 'revenue_guard' ? (
                      <ShieldAlert className="h-6 w-6" />
                    ) : (
                      <TrendingUp className="h-6 w-6" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="group-hover:text-primary text-lg font-bold transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                      {insight.description}
                    </p>
                    <div className="flex items-center gap-4 pt-3">
                      <Badge
                        variant="outline"
                        className="bg-accent/30 rounded-none border-transparent text-[10px] font-black tracking-widest uppercase"
                      >
                        {insight.impact} Impact
                      </Badge>
                      <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
                        <Zap className="h-3 w-3 text-amber-500" />
                        Live Detection
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={() => handleExecute(insight.id)}
                  disabled={executingId === insight.id}
                  className="shadow-primary/20 rounded-none px-8 font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  {executingId === insight.id ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      {insight.actionLabel}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );

  const renderStatus = () => (
    <div className="space-y-6">
      <Card className="from-primary/10 via-card to-card border-primary/20 shadow-primary/5 rounded-none bg-gradient-to-br p-8 shadow-xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 rounded-none p-2">
              <BrainCircuit className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Active Agents</h3>
          </div>
          <span className="flex h-2 w-2 rounded-none bg-emerald-500" />
        </div>

        <div className="space-y-4">
          {[
            {
              name: 'Revenue Guard',
              status: 'Monitoring',
              color: 'text-emerald-500',
              icon: ShieldAlert,
              detail: 'Scanning transaction patterns...',
              tier: 'Enterprise',
            },
            {
              name: 'Growth Optimus',
              status: 'Analyzing',
              color: 'text-blue-500',
              icon: TrendingUp,
              detail: 'Modeling cohort expansions...',
              tier: 'Pro',
            },
            {
              name: 'Retention Hero',
              status: 'Idle',
              color: 'text-muted-foreground',
              icon: Target,
              detail: 'Waiting for churn triggers...',
              tier: 'Enterprise',
            },
          ].map((agent) => (
            <button
              key={agent.name}
              onClick={() =>
                setSelectedAgent(
                  selectedAgent === agent.name ? null : agent.name,
                )
              }
              className="bg-accent/30 border-border/50 hover:border-primary/30 group relative w-full overflow-hidden rounded-none border p-4 text-left transition-all"
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="group-hover:text-primary text-sm font-bold transition-colors">
                    {agent.name}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-primary/5 text-primary border-primary/20 h-4 rounded-none px-1.5 text-[8px] font-black tracking-tighter uppercase"
                  >
                    {agent.tier}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-none bg-current ${agent.color}`}
                  />
                  <span
                    className={`text-[10px] font-black tracking-widest uppercase ${agent.color}`}
                  >
                    {agent.status}
                  </span>
                </div>
              </div>
              {selectedAgent === agent.name ? (
                <div className="animate-in slide-in-from-top-1 duration-300">
                  <p className="text-muted-foreground border-border/50 mt-2 flex items-center gap-2 border-t pt-2 text-[10px]">
                    <Info className="h-3 w-3" />
                    {agent.detail}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/5 mt-2 h-7 w-full rounded-none text-[10px] font-bold"
                  >
                    View Agent Logs
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground/60 truncate text-[10px]">
                  Click for detailed agent status
                </p>
              )}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => setConfigOpen(true)}
          className="border-primary/20 hover:bg-primary/5 hover:border-primary/50 group mt-8 h-12 w-full rounded-none font-bold transition-all"
        >
          <Settings2 className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Configure AI Behavior
        </Button>
      </Card>

      <Card className="border-border/50 bg-card/30 group relative overflow-hidden rounded-none p-8 backdrop-blur-sm">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h3 className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            AI Contribution
          </h3>
        </div>
        <div className="space-y-1">
          <p className="text-primary text-4xl font-black tracking-tighter">
            $4,820
          </p>
          <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
            Revenue saved this month
          </p>
        </div>
      </Card>
    </div>
  );

  if (mode === 'insights') return renderInsights();
  if (mode === 'status') return renderStatus();

  return (
    <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">{renderInsights()}</div>
      <div>{renderStatus()}</div>
    </div>
  );
}

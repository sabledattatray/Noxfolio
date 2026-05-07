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
  Info
} from 'lucide-react';
import { AutonomousAgentService, AgentInsight } from '@/modules/ai/agents';

export function AIAgentsPanel() {
  const [insights, setInsights] = useState<AgentInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [executingId, setExecutingId] = useState<string | null>(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/ai/insights');
        const data = await res.json();
        setInsights(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load AI insights:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleExecute = async (id: string) => {
    setExecutingId(id);
    const result = await AutonomousAgentService.executeAction(id);
    if (result.success) {
      setInsights(prev => prev.filter(i => i.id !== id));
    }
    setExecutingId(null);
  };

  if (loading) {
    return <div className="h-48 w-full animate-pulse bg-accent/20 rounded-[32px]" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
      {/* Config Overlay */}
      {configOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-lg p-8 space-y-6 shadow-2xl border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-purple-500" />
            <button onClick={() => setConfigOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-primary">
                <Settings2 className="w-6 h-6" />
                <h3 className="text-2xl font-bold">AI Behavior Engine</h3>
              </div>
              <p className="text-sm text-muted-foreground">Adjust the autonomy and risk-tolerance of your billing agents.</p>
            </div>

            <div className="space-y-6">
              {[
                { label: 'Autonomy Level', desc: 'Allow agents to execute low-risk actions without approval.', default: 'Semi-Autonomous' },
                { label: 'Risk Threshold', desc: 'Maximum financial impact before requiring human review.', default: '$500.00' },
                { label: 'Strategy Focus', desc: 'Primary optimization goal for the next cycle.', default: 'Churn Reduction' }
              ].map(opt => (
                <div key={opt.label} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-foreground">{opt.label}</label>
                    <Badge variant="outline" className="text-primary border-primary/20">{opt.default}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{opt.desc}</p>
                  <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-primary rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full h-12 rounded-xl shadow-lg shadow-primary/20" onClick={() => setConfigOpen(false)}>
              Save Configuration
            </Button>
          </Card>
        </div>
      )}

      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
              <Bot className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Autonomous Insights</h2>
              <p className="text-sm text-muted-foreground font-medium">Real-time optimization engine active.</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">System Optimal</span>
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((insight) => (
            <Card key={insight.id} className="p-6 group hover:border-primary/30 transition-all duration-300 bg-card/50 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className={`mt-1 p-3 rounded-2xl transition-transform group-hover:scale-110 ${
                    insight.impact === 'high' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {insight.type === 'revenue_guard' ? <ShieldAlert className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{insight.description}</p>
                    <div className="flex items-center gap-4 pt-3">
                      <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest bg-accent/30 border-transparent">
                        {insight.impact} Impact
                      </Badge>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        <Zap className="w-3 h-3 text-amber-500" />
                        Live Detection
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => handleExecute(insight.id)}
                  disabled={executingId === insight.id}
                  className="rounded-2xl shadow-xl shadow-primary/20 px-8 font-bold transition-all hover:scale-105 active:scale-95"
                >
                  {executingId === insight.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {insight.actionLabel}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}

          {insights.length === 0 && (
            <div className="py-20 text-center space-y-6 rounded-[32px] border-2 border-dashed border-border/50 bg-accent/5 backdrop-blur-sm">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-500/40" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">System Fully Optimized</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">Your autonomous agents have completed all pending tasks. Stand by for the next analysis cycle.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-8 bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 shadow-xl shadow-primary/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-xl">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Active Agents</h3>
            </div>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          </div>

          <div className="space-y-4">
            {[
              { name: 'Revenue Guard', status: 'Monitoring', color: 'text-emerald-500', icon: ShieldAlert, detail: 'Scanning transaction patterns...', tier: 'Enterprise' },
              { name: 'Growth Optimus', status: 'Analyzing', color: 'text-blue-500', icon: TrendingUp, detail: 'Modeling cohort expansions...', tier: 'Pro' },
              { name: 'Retention Hero', status: 'Idle', color: 'text-muted-foreground', icon: Target, detail: 'Waiting for churn triggers...', tier: 'Enterprise' }
            ].map((agent) => (
              <button 
                key={agent.name} 
                onClick={() => setSelectedAgent(selectedAgent === agent.name ? null : agent.name)}
                className="w-full text-left p-4 rounded-2xl bg-accent/30 border border-border/50 hover:border-primary/30 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{agent.name}</span>
                    <Badge variant="outline" className="text-[8px] h-4 px-1.5 uppercase font-black tracking-tighter bg-primary/5 text-primary border-primary/20">
                      {agent.tier}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-current ${agent.color}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${agent.color}`}>{agent.status}</span>
                  </div>
                </div>
                {selectedAgent === agent.name ? (
                  <div className="animate-in slide-in-from-top-1 duration-300">
                    <p className="text-[10px] text-muted-foreground flex items-center gap-2 pt-2 border-t border-border/50 mt-2">
                      <Info className="w-3 h-3" />
                      {agent.detail}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full mt-2 h-7 text-[10px] font-bold text-primary hover:bg-primary/5 rounded-lg">
                      View Agent Logs
                    </Button>
                  </div>
                ) : (
                  <p className="text-[10px] text-muted-foreground/60 truncate">Click for detailed agent status</p>
                )}
              </button>
            ))}
          </div>

          <Button 
            variant="outline" 
            onClick={() => setConfigOpen(true)}
            className="w-full mt-8 h-12 rounded-2xl border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-all font-bold group"
          >
            <Settings2 className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
            Configure AI Behavior
          </Button>
        </Card>

        <Card className="p-8 border-border/50 bg-card/30 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">AI Contribution</h3>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-black text-primary tracking-tighter">$4,820</p>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Revenue saved this month</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

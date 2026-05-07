'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Play, 
  Clock, 
  Settings, 
  ArrowRight, 
  Mail, 
  Webhook, 
  Bell, 
  Cpu, 
  Terminal,
  CheckCircle2,
  Loader2
} from 'lucide-react';

export function WorkflowBuilder() {
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const startSimulation = () => {
    setSimulating(true);
    setSimStep(0);
    
    const steps = [1, 2, 3, 4];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimStep(step);
        if (step === 4) {
          setTimeout(() => setSimulating(false), 2000);
        }
      }, (index + 1) * 1500);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Active Workflows</h2>
          <p className="text-sm text-muted-foreground">Automate actions based on platform events.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="rounded-xl border-primary/20 bg-primary/5 hover:bg-primary/10"
            onClick={startSimulation}
            disabled={simulating}
          >
            {simulating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Cpu className="w-4 h-4 mr-2" />}
            {simulating ? 'Simulating...' : 'Run Simulation'}
          </Button>
          <Button className="rounded-xl">
            <Zap className="w-4 h-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      </div>

      {simulating && (
        <Card className="p-4 border-primary/30 bg-primary/5 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold font-mono">
              [SIMULATION] {simStep === 1 && 'Triggering invoice.payment_failed...'}
              {simStep === 2 && 'Executing action: Send Email (Failed Payment Alert)...'}
              {simStep === 3 && 'Executing action: Outgoing Webhook (Notify Customer)...'}
              {simStep === 4 && 'Simulation complete. 100% path coverage.'}
            </span>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 ${simulating ? 'ring-2 ring-primary border-primary/50 shadow-xl shadow-primary/10' : 'border-primary/20'}`}>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Active</Badge>
              <Settings className="w-4 h-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">Dunning Automation</CardTitle>
            <CardDescription>Triggered when an invoice payment fails.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center gap-4 text-sm transition-all duration-300 ${simStep >= 1 ? 'text-primary' : ''}`}>
              <div className={`p-2 rounded-lg ${simStep === 1 ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-accent/50 text-muted-foreground'}`}>
                <Play className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Trigger</p>
                <p className="text-xs text-muted-foreground">invoice.payment_failed</p>
              </div>
              {simStep >= 1 && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            </div>
            
            <div className="ml-4 pl-6 border-l-2 border-primary/20 space-y-4">
              <div className={`flex items-center gap-4 text-sm transition-all duration-300 ${simStep >= 2 ? 'translate-x-2' : ''}`}>
                <div className={`p-2 rounded-lg ${simStep === 2 ? 'bg-primary text-primary-foreground animate-bounce' : 'bg-primary/10 text-primary'}`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Send Email</p>
                  <p className="text-xs text-muted-foreground">Template: Failed Payment Alert</p>
                </div>
                {simStep >= 2 && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </div>
              <div className={`flex items-center gap-4 text-sm transition-all duration-300 ${simStep >= 3 ? 'translate-x-2' : ''}`}>
                <div className={`p-2 rounded-lg ${simStep === 3 ? 'bg-blue-500 text-white animate-bounce' : 'bg-blue-500/10 text-blue-500'}`}>
                  <Webhook className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Outgoing Webhook</p>
                  <p className="text-xs text-muted-foreground">Notify customer backend</p>
                </div>
                {simStep >= 3 && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                Last run: 2 hours ago
              </div>
              <div className="text-xs font-bold text-emerald-500">99.8% Success Rate</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm opacity-60">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-muted-foreground border-border/50">Paused</Badge>
              <Settings className="w-4 h-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">Welcome Sequence</CardTitle>
            <CardDescription>Triggered when a subscription starts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-col items-center justify-center h-48">
               <Bell className="w-8 h-8 opacity-20 mb-2" />
               <p className="text-xs text-muted-foreground">No executions in the last 7 days.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

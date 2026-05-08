'use client';

import { APIKeyManager } from '@/components/developer/api-key-manager';
import { WorkflowBuilder } from '@/components/developer/workflow-builder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code2, 
  Webhook, 
  Activity, 
  Terminal, 
  BookOpen, 
  Settings2,
  Box,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function PlatformStatus() {
  return (
    <div className="space-y-8">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Activity className="w-4 h-4" />
            <CardTitle className="text-sm uppercase tracking-widest font-bold">Platform Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">API Gateway</span>
            <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Webhooks</span>
            <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Event Processing</span>
            <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Operational
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm">Quick Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-xl bg-accent/30 border border-border/50 flex items-center gap-3 group hover:border-primary/50 transition-colors cursor-pointer">
            <Box className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div>
              <p className="text-xs font-bold">Noxfolio SDK</p>
              <p className="text-[10px] text-muted-foreground">npm install @noxfolio/sdk</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-accent/30 border border-border/50 flex items-center gap-3 group hover:border-primary/50 transition-colors cursor-pointer">
            <Terminal className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div>
              <p className="text-xs font-bold">CLI Tool</p>
              <p className="text-[10px] text-muted-foreground">curl -sL noxfolio.sh | sh</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DeveloperPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Developer Platform</h1>
          <p className="text-muted-foreground mt-1">Integrate Noxfolio into your applications using our APIs and Webhooks.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-xl border-border/50">
            <BookOpen className="w-4 h-4 mr-2" />
            API Docs
          </Button>
          <Button size="sm" className="rounded-xl">
            API Playground
          </Button>
        </div>
      </div>

      <Tabs defaultValue="keys" className="space-y-8">
        <TabsList className="bg-accent/30 p-1 rounded-xl">
          <TabsTrigger value="keys" className="rounded-lg">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks" className="rounded-lg">Webhooks</TabsTrigger>
          <TabsTrigger value="workflows" className="rounded-lg">Workflows</TabsTrigger>
          <TabsTrigger value="logs" className="rounded-lg">Request Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <APIKeyManager />
              
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <CardTitle>Site Connection Guide</CardTitle>
                  </div>
                  <CardDescription>Connect your external site to Noxfolio in minutes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm font-medium">1. Verify Connection (Node.js)</p>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-[11px] leading-relaxed text-zinc-300">
                      <pre>
{`const res = await fetch('https://noxfolio.app/api/v1/auth/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ apiKey: 'YOUR_API_KEY' })
});

const { valid, plan } = await res.json();
console.log(\`Connected to Noxfolio: \${valid} (\${plan})\`);`}
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-medium">2. Quick Test (Curl)</p>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-[11px] leading-relaxed text-zinc-300 flex justify-between items-center group">
                      <code>{`curl -X POST https://noxfolio.app/api/v1/auth/verify -d '{"apiKey":"YOUR_KEY"}'`}</code>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg h-7">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <PlatformStatus />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-8">
           <WorkflowBuilder />
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Webhook Endpoints</CardTitle>
                      <CardDescription>Receive real-time event notifications from Noxfolio.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Add Endpoint
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-border/50 rounded-2xl bg-accent/5">
                    <Webhook className="w-12 h-12 text-muted-foreground/20 mb-4" />
                    <p className="text-sm font-medium">No webhook endpoints configured.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


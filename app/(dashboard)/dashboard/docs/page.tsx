'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Copy, 
  Check, 
  ChevronRight,
  BookOpen,
  Lock,
  Zap,
  Webhooks
} from 'lucide-react';
import { useState } from 'react';

export default function DocsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/billing/usage',
      description: 'Retrieve real-time usage metrics for an organization.',
      curl: 'curl -X GET https://api.billforge.com/v1/billing/usage \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
    },
    {
      method: 'POST',
      path: '/api/v1/customers/create',
      description: 'Initialize a new customer identity in the billing ledger.',
      curl: 'curl -X POST https://api.billforge.com/v1/customers/create \\\n  -H "Content-Type: application/json" \\\n  -d \'{"email": "user@example.com", "name": "Jane Doe"}\'',
    },
    {
      method: 'GET',
      path: '/api/v1/ai/recommendations',
      description: 'Fetch autonomous growth recommendations from the AI engine.',
      curl: 'curl -X GET https://api.billforge.com/v1/ai/recommendations \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <BookOpen className="w-8 h-8" />
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Developer Interface</h1>
        </div>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
          Integrated API documentation for the BillForge Autonomous Revenue Engine. Programmatic access to billing orchestration, AI insights, and organizational auditing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Lock, label: 'Secure Authentication', desc: 'Ed25519 Signed JWTs' },
          { icon: Zap, label: 'Instant Settlement', desc: 'Real-time ledger updates' },
          { icon: Globe, label: 'Global Edge Runtime', desc: 'Sub-50ms latency' }
        ].map((item, i) => (
          <Card key={i} className="bg-card/30 backdrop-blur-sm border-border/50 p-6 rounded-3xl group hover:border-primary/40 transition-all">
            <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-sm uppercase tracking-widest">{item.label}</h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{item.desc}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <Terminal className="w-6 h-6 text-primary" />
          Core Endpoints
        </h2>
        
        <div className="space-y-6">
          {endpoints.map((ep, i) => (
            <Card key={i} className="bg-card/10 backdrop-blur-md border-border/40 rounded-[32px] overflow-hidden group">
              <div className="p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className={`${
                        ep.method === 'GET' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'
                      } border-transparent font-black px-3 py-1`}>
                        {ep.method}
                      </Badge>
                      <code className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {ep.path}
                      </code>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">{ep.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl border-border/50 hover:bg-primary/5 transition-all">
                    Test Request
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="relative group/code">
                  <pre className="bg-black/80 text-blue-400 p-6 rounded-2xl overflow-x-auto font-mono text-xs leading-relaxed border border-border/50">
                    {ep.curl}
                  </pre>
                  <button 
                    onClick={() => copyToClipboard(ep.curl, ep.path)}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all opacity-0 group-hover/code:opacity-100"
                  >
                    {copied === ep.path ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-8 bg-gradient-to-br from-primary/20 via-card to-card border-primary/30 rounded-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Code2 className="w-64 h-64" />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight">Need custom integrations?</h3>
            <p className="text-muted-foreground font-medium max-w-lg">Our engineering team provides dedicated support for high-volume enterprise API integrations.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="rounded-xl px-8 font-bold h-12 shadow-xl shadow-primary/20">Contact Engineering</Button>
            <Button variant="outline" className="rounded-xl px-8 font-bold h-12 bg-transparent border-border/50">Developer Discord</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

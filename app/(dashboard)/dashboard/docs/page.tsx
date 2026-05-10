'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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
  Webhook,
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
      curl: 'curl -X GET https://api.noxfolio.com/v1/billing/usage \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
    },
    {
      method: 'POST',
      path: '/api/v1/customers/create',
      description: 'Initialize a new customer identity in the billing ledger.',
      curl: 'curl -X POST https://api.noxfolio.com/v1/customers/create \\\n  -H "Content-Type: application/json" \\\n  -d \'{"email": "user@example.com", "name": "Jane Doe"}\'',
    },
    {
      method: 'GET',
      path: '/api/v1/ai/recommendations',
      description:
        'Fetch autonomous growth recommendations from the AI engine.',
      curl: 'curl -X GET https://api.noxfolio.com/v1/ai/recommendations \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-5xl space-y-12 duration-700">
      <div className="space-y-4">
        <div className="text-primary flex items-center gap-3">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Developer Interface
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed font-medium">
          Integrated API documentation for the Noxfolio Autonomous Revenue
          Engine. Programmatic access to billing orchestration, AI insights, and
          organizational auditing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            icon: Lock,
            label: 'Secure Authentication',
            desc: 'Ed25519 Signed JWTs',
          },
          {
            icon: Zap,
            label: 'Instant Settlement',
            desc: 'Real-time ledger updates',
          },
          {
            icon: Globe,
            label: 'Global Edge Runtime',
            desc: 'Sub-50ms latency',
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="bg-card/30 border-border/50 group hover:border-primary/40 rounded-3xl p-6 backdrop-blur-sm transition-all"
          >
            <item.icon className="text-primary mb-4 h-8 w-8 transition-transform group-hover:scale-110" />
            <h3 className="text-sm font-bold tracking-widest uppercase">
              {item.label}
            </h3>
            <p className="text-muted-foreground mt-1 text-xs font-medium">
              {item.desc}
            </p>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <h2 className="flex items-center gap-2 text-2xl font-black tracking-tight">
          <Terminal className="text-primary h-6 w-6" />
          Core Endpoints
        </h2>

        <div className="space-y-6">
          {endpoints.map((ep, i) => (
            <Card
              key={i}
              className="bg-card/10 border-border/40 group overflow-hidden rounded-[32px] backdrop-blur-md"
            >
              <div className="space-y-6 p-8">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${
                          ep.method === 'GET'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-emerald-500/10 text-emerald-500'
                        } border-transparent px-3 py-1 font-black`}
                      >
                        {ep.method}
                      </Badge>
                      <code className="text-foreground group-hover:text-primary text-lg font-black tracking-tight transition-colors">
                        {ep.path}
                      </code>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">
                      {ep.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/50 hover:bg-primary/5 rounded-xl transition-all"
                  >
                    Test Request
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="group/code relative">
                  <pre className="border-border/50 overflow-x-auto rounded-2xl border bg-black/80 p-6 font-mono text-xs leading-relaxed text-blue-400">
                    {ep.curl}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(ep.curl, ep.path)}
                    className="absolute top-4 right-4 rounded-lg bg-white/10 p-2 text-white opacity-0 transition-all group-hover/code:opacity-100 hover:bg-white/20"
                  >
                    {copied === ep.path ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="from-primary/20 via-card to-card border-primary/30 relative overflow-hidden rounded-[32px] bg-gradient-to-br p-8">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Code2 className="h-64 w-64" />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight">
              Need custom integrations?
            </h3>
            <p className="text-muted-foreground max-w-lg font-medium">
              Our engineering team provides dedicated support for high-volume
              enterprise API integrations.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="shadow-primary/20 h-12 rounded-xl px-8 font-bold shadow-xl">
              Contact Engineering
            </Button>
            <Button
              variant="outline"
              className="border-border/50 h-12 rounded-xl bg-transparent px-8 font-bold"
            >
              Developer Discord
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

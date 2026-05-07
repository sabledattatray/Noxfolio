'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Terminal, ChevronRight } from 'lucide-react';

const endpoints = [
  {
    method: 'GET',
    path: '/v1/customers',
    description: 'Retrieve a list of customers.',
    params: [
      { name: 'limit', type: 'integer', description: 'Number of results to return.' },
    ],
  },
  {
    method: 'POST',
    path: '/v1/subscriptions',
    description: 'Create a new subscription for a customer.',
    params: [
      { name: 'customer_id', type: 'string', required: true, description: 'The ID of the customer.' },
      { name: 'plan_id', type: 'string', required: true, description: 'The ID of the plan.' },
    ],
  },
];

export function APIDocumentation() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-4">Endpoints</h3>
        <nav className="space-y-1">
          {endpoints.map((ep) => (
            <button key={ep.path} className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg hover:bg-accent/50 text-left group">
              <span className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {ep.method}
                </span>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">{ep.path.split('/').pop()}</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </nav>
      </div>

      <div className="lg:col-span-3 space-y-12">
        {endpoints.map((ep) => (
          <div key={ep.path} className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {ep.method}
                </span>
                <h2 className="text-2xl font-bold tracking-tight">{ep.path}</h2>
              </div>
              <p className="text-muted-foreground">{ep.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold">Parameters</h4>
                <div className="space-y-4">
                  {ep.params.map((p) => (
                    <div key={p.name} className="flex gap-4 pb-4 border-b border-border/50 last:border-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-xs font-bold text-primary">{p.name}</code>
                          <span className="text-[10px] text-muted-foreground uppercase">{p.type}</span>
                          {('required' in p && p.required) && <span className="text-[10px] text-rose-500 font-bold">REQUIRED</span>}
                        </div>
                        <p className="text-xs text-muted-foreground">{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">Example Request</h4>
                <div className="rounded-2xl bg-zinc-950 p-6 font-mono text-xs text-zinc-400 relative group">
                  <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy className="w-4 h-4" />
                  </button>
                  <div className="space-y-2">
                    <p className="text-emerald-500">curl <span className="text-zinc-400">--request</span> {ep.method}</p>
                    <p><span className="text-emerald-500">--url</span> https://api.billforge.com{ep.path}</p>
                    <p><span className="text-emerald-500">--header</span> <span className="text-amber-500">'Authorization: Bearer YOUR_API_KEY'</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

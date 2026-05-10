'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Terminal, ChevronRight } from 'lucide-react';

const endpoints = [
  {
    method: 'GET',
    path: '/v1/customers',
    description: 'Retrieve a list of customers.',
    params: [
      {
        name: 'limit',
        type: 'integer',
        description: 'Number of results to return.',
      },
    ],
  },
  {
    method: 'POST',
    path: '/v1/subscriptions',
    description: 'Create a new subscription for a customer.',
    params: [
      {
        name: 'customer_id',
        type: 'string',
        required: true,
        description: 'The ID of the customer.',
      },
      {
        name: 'plan_id',
        type: 'string',
        required: true,
        description: 'The ID of the plan.',
      },
    ],
  },
];

export function APIDocumentation() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="space-y-4 lg:col-span-1">
        <h3 className="text-muted-foreground px-4 text-sm font-bold tracking-widest uppercase">
          Endpoints
        </h3>
        <nav className="space-y-1">
          {endpoints.map((ep) => (
            <button
              key={ep.path}
              className="hover:bg-accent/50 group flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-sm"
            >
              <span className="flex items-center gap-2">
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}
                >
                  {ep.method}
                </span>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {ep.path.split('/').pop()}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-12 lg:col-span-3">
        {endpoints.map((ep) => (
          <div key={ep.path} className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span
                  className={`rounded px-2 py-1 text-xs font-bold ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}
                >
                  {ep.method}
                </span>
                <h2 className="text-2xl font-bold tracking-tight">{ep.path}</h2>
              </div>
              <p className="text-muted-foreground">{ep.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-sm font-bold">Parameters</h4>
                <div className="space-y-4">
                  {ep.params.map((p) => (
                    <div
                      key={p.name}
                      className="border-border/50 flex gap-4 border-b pb-4 last:border-0"
                    >
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <code className="text-primary text-xs font-bold">
                            {p.name}
                          </code>
                          <span className="text-muted-foreground text-[10px] uppercase">
                            {p.type}
                          </span>
                          {'required' in p && p.required && (
                            <span className="text-[10px] font-bold text-rose-500">
                              REQUIRED
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold">Example Request</h4>
                <div className="group relative rounded-2xl bg-zinc-950 p-6 font-mono text-xs text-zinc-400">
                  <button className="absolute top-4 right-4 rounded-lg bg-white/5 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Copy className="h-4 w-4" />
                  </button>
                  <div className="space-y-2">
                    <p className="text-emerald-500">
                      curl <span className="text-zinc-400">--request</span>{' '}
                      {ep.method}
                    </p>
                    <p>
                      <span className="text-emerald-500">--url</span>{' '}
                      https://api.noxfolio.com{ep.path}
                    </p>
                    <p>
                      <span className="text-emerald-500">--header</span>{' '}
                      <span className="text-amber-500">
                        'Authorization: Bearer YOUR_API_KEY'
                      </span>
                    </p>
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

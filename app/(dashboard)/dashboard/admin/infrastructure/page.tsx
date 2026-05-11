'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Server,
  Activity,
  Globe,
  Database,
  Cpu,
  Zap,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Signal,
  Wifi,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InfrastructurePage() {
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState([
    {
      id: 'IN-WEST-01',
      name: 'Mumbai Edge Core',
      status: 'healthy',
      load: 14,
      latency: 42,
      up: '99.99%',
      region: 'Asia Pacific',
    },
    {
      id: 'US-EAST-01',
      name: 'Virginia Central',
      status: 'healthy',
      load: 32,
      latency: 12,
      up: '99.95%',
      region: 'North America',
    },
    {
      id: 'EU-CENT-01',
      name: 'Frankfurt Ledger',
      status: 'warning',
      load: 84,
      latency: 156,
      up: '98.42%',
      region: 'Europe',
    },
    {
      id: 'SG-CORE-01',
      name: 'Singapore Gateway',
      status: 'healthy',
      load: 45,
      latency: 28,
      up: '99.98%',
      region: 'Southeast Asia',
    },
  ]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          load: Math.max(5, Math.min(95, node.load + (Math.random() * 10 - 5))),
          latency: Math.max(
            10,
            Math.min(300, node.latency + (Math.random() * 20 - 10)),
          ),
        })),
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="animate-in fade-in space-y-8 duration-700">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">
            Infrastructure Core
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Real-time telemetry and global traffic orchestration.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-none border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase"
          >
            <Wifi className="mr-2 h-3 w-3 animate-pulse" /> Global Network
            Online
          </Badge>
          <Button
            variant="outline"
            className="border-primary/20 text-primary rounded-none font-bold"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Resync Clusters
          </Button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          {
            label: 'Total Node Capacity',
            value: '842.8 TB/s',
            icon: Zap,
            color: 'text-primary',
          },
          {
            label: 'Avg Global Latency',
            value: '48ms',
            icon: Signal,
            color: 'text-blue-500',
          },
          {
            label: 'Active Clusters',
            value: '12',
            icon: Server,
            color: 'text-emerald-500',
          },
          {
            label: 'DDoS Mitigations',
            value: '14,284',
            icon: Lock,
            color: 'text-amber-500',
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="border-border bg-card/50 rounded-none p-6 shadow-xl"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <stat.icon className={cn('h-5 w-5', stat.color)} />
                <Badge
                  variant="outline"
                  className="border-border/50 rounded-none text-[8px] font-black tracking-widest uppercase"
                >
                  Live
                </Badge>
              </div>
              <p className="mt-2 text-2xl font-black tracking-tight">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Node Registry */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-border bg-card/50 overflow-hidden rounded-none shadow-2xl">
            <CardHeader className="border-border/50 bg-muted/20 border-b">
              <CardTitle className="flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase">
                <Cpu className="text-primary h-4 w-4" /> Active Service Clusters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-border/50 divide-y">
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className="hover:bg-accent/30 group flex items-center justify-between p-6 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-none shadow-inner',
                          node.status === 'healthy'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-amber-500/10 text-amber-500',
                        )}
                      >
                        <Server className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black tracking-tight">
                            {node.name}
                          </h4>
                          <Badge
                            className={cn(
                              'rounded-none px-1.5 py-0 text-[8px] font-black tracking-[0.1em] uppercase',
                              node.status === 'healthy'
                                ? 'bg-emerald-500/20 text-emerald-500'
                                : 'bg-amber-500/20 text-amber-500',
                            )}
                          >
                            {node.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                          {node.id} • {node.region}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-12">
                      <div className="hidden md:block">
                        <p className="text-right text-xs font-black tracking-tight">
                          {node.latency}ms
                        </p>
                        <p className="text-muted-foreground text-right text-[9px] font-bold tracking-widest uppercase">
                          Latency
                        </p>
                      </div>
                      <div className="w-32">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-muted-foreground text-[9px] font-black tracking-widest uppercase">
                            Load
                          </span>
                          <span
                            className={cn(
                              'text-[10px] font-black',
                              node.load > 80
                                ? 'text-destructive'
                                : 'text-foreground',
                            )}
                          >
                            {Math.round(node.load)}%
                          </span>
                        </div>
                        <div className="bg-muted h-1.5 w-full overflow-hidden rounded-none">
                          <div
                            className={cn(
                              'h-full transition-all duration-1000 ease-in-out',
                              node.load > 80
                                ? 'bg-destructive'
                                : node.load > 60
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500',
                            )}
                            style={{ width: `${node.load}%` }}
                          />
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-primary/10 hover:text-primary rounded-none opacity-0 transition-all group-hover:opacity-100"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Logs / Traffic */}
        <div className="space-y-6">
          <Card className="border-border bg-card/50 flex h-full flex-col rounded-none shadow-2xl">
            <CardHeader className="border-border/50 bg-muted/20 border-b">
              <CardTitle className="text-primary flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase">
                <Activity className="h-4 w-4 animate-pulse" /> Planetary Edge
                Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-[500px] space-y-4 overflow-y-auto bg-black/20 p-4 font-mono text-[10px]">
                <div className="flex gap-3 text-emerald-500/80">
                  <span className="shrink-0 opacity-40">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span>SYNC: US-EAST-01 → EU-WEST-02 successful (12ms)</span>
                </div>
                <div className="flex gap-3 text-emerald-500/80">
                  <span className="shrink-0 opacity-40">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span>LOAD: IN-WEST-01 operating at 14% efficiency</span>
                </div>
                <div className="flex gap-3 text-amber-500/80">
                  <span className="shrink-0 opacity-40">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span>WARN: EU-CENT-01 latency spike detected (184ms)</span>
                </div>
                <div className="flex gap-3 text-emerald-500/80">
                  <span className="shrink-0 opacity-40">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span>ACL: Root override initiated for node RECOVERY-X</span>
                </div>
                <div className="flex gap-3 text-blue-500/80">
                  <span className="shrink-0 opacity-40">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span>
                    INFO: Traffic diverted from EU-CENT-01 to EU-WEST-01
                  </span>
                </div>
                <div className="flex gap-3 text-emerald-500/80 opacity-60">
                  <span className="shrink-0 opacity-40">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span>HEALTH: Global cluster integrity at 98.4%</span>
                </div>
                <div className="text-primary/80 flex animate-pulse gap-3">
                  <span className="shrink-0 opacity-40">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span>
                    SCAN: Detecting active penetration attempts... NULL
                  </span>
                </div>
              </div>
            </CardContent>
            <div className="border-border/50 bg-muted/10 border-t p-4">
              <Button className="bg-primary w-full rounded-none text-[10px] font-black tracking-widest text-white uppercase">
                Download Global Incident Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

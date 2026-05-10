import { MarketingPageLayout } from '@/components/marketing-layout';
import { Activity, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const systems = [
  { name: 'API Gateway', status: 'operational', uptime: '99.99%' },
  { name: 'Dashboard UI', status: 'operational', uptime: '100%' },
  { name: 'Billing Engine', status: 'operational', uptime: '99.95%' },
  { name: 'Analytics Pipeline', status: 'operational', uptime: '99.90%' },
  {
    name: 'Webhook Delivery',
    status: 'degraded',
    uptime: '98.50%',
    note: 'Slight latency in European regions.',
  },
];

const incidents = [
  {
    date: 'May 08, 2026',
    title: 'Minor Webhook Latency',
    status: 'Resolved',
    description:
      'We experienced minor delays in webhook delivery for approximately 15 minutes due to an upstream provider issue.',
  },
  {
    date: 'April 22, 2026',
    title: 'Scheduled Maintenance',
    status: 'Completed',
    description: 'Database optimization and indexing completed successfully.',
  },
];

export default function StatusPage() {
  return (
    <MarketingPageLayout
      title="System Status"
      subtitle="Real-time performance metrics and incident reports."
      icon={Activity}
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 duration-500">
        {/* Global Status Banner */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-[32px] border border-emerald-500/20 bg-emerald-500/10 p-8 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight italic">
                All Systems Operational
              </h2>
              <p className="text-muted-foreground font-medium">
                As of May 10, 2026 — 20:50 UTC
              </p>
            </div>
          </div>
          <Badge className="rounded-full bg-emerald-500 px-4 py-1.5 font-bold text-white">
            100% HEALTHY
          </Badge>
        </div>

        {/* System Breakdown */}
        <div className="space-y-4">
          <h3 className="px-4 text-xl font-bold tracking-tight">
            System Components
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {systems.map((s) => (
              <div
                key={s.name}
                className="bg-card border-border/50 group hover:border-primary/30 flex items-center justify-between rounded-2xl border p-6 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-2 w-2 rounded-full ${s.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'} shadow-[0_0_10px_rgba(16,185,129,0.5)]`}
                  />
                  <div>
                    <p className="font-bold">{s.name}</p>
                    {s.note && (
                      <p className="text-muted-foreground text-[10px] font-medium italic">
                        {s.note}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="hidden text-right sm:block">
                    <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                      Uptime
                    </p>
                    <p className="text-sm font-bold">{s.uptime}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`border-transparent font-bold capitalize ${
                      s.status === 'operational'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-amber-500/10 text-amber-500'
                    }`}
                  >
                    {s.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="space-y-6">
          <h3 className="px-4 text-xl font-bold tracking-tight">
            Incident History
          </h3>
          <div className="space-y-4">
            {incidents.map((i) => (
              <div
                key={i.title}
                className="bg-accent/30 border-border/50 space-y-4 rounded-[32px] border p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                    <Clock className="h-3 w-3" />
                    {i.date}
                  </div>
                  <Badge className="bg-primary/10 text-primary rounded-lg border-transparent font-bold">
                    {i.status}
                  </Badge>
                </div>
                <h4 className="text-lg font-bold">{i.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {i.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

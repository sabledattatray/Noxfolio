import { MarketingPageLayout } from '@/components/marketing-layout';
import { Rocket, Zap, Shield, Sparkles, Code2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const changes = [
  {
    version: 'v1.2.0',
    date: 'May 10, 2026',
    title: 'Autonomous Ecosystem Launch',
    description:
      'Introducing Phase 6: Autonomous agents and white-labeling foundation.',
    items: [
      {
        type: 'feature',
        icon: Sparkles,
        text: 'Revenue Guard AI agent for automated leak detection.',
      },
      {
        type: 'feature',
        icon: Zap,
        text: 'White-label branding engine for enterprise tenants.',
      },
      {
        type: 'improvement',
        icon: Shield,
        text: 'Hardened CSP headers and XSS protection layers.',
      },
      {
        type: 'api',
        icon: Code2,
        text: 'New Zapier verification and webhook endpoints.',
      },
    ],
  },
  {
    version: 'v1.1.0',
    date: 'April 25, 2026',
    title: 'Multi-Gateway Orchestration',
    description:
      'Unified billing support for international and domestic markets.',
    items: [
      {
        type: 'feature',
        icon: Rocket,
        text: 'Razorpay integration for high-performance Indian markets.',
      },
      {
        type: 'feature',
        icon: Zap,
        text: 'Real-time usage tracking and metered billing.',
      },
      {
        type: 'improvement',
        icon: Shield,
        text: 'Organization-based RBAC and data isolation.',
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <MarketingPageLayout
      title="Product Changelog"
      subtitle="Stay updated with the latest features and improvements to the Noxfolio platform."
      icon={Rocket}
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 space-y-16 duration-700">
        {changes.map((change) => (
          <div
            key={change.version}
            className="border-border/50 relative space-y-8 border-l pl-8 md:pl-12"
          >
            {/* Version Dot */}
            <div className="bg-primary border-background absolute top-0 -left-[9px] h-4 w-4 rounded-full border-4 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Badge className="bg-primary/10 text-primary rounded-lg border-transparent font-black">
                  {change.version}
                </Badge>
                <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                  {change.date}
                </span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">
                {change.title}
              </h2>
              <p className="text-muted-foreground max-w-2xl font-medium">
                {change.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {change.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-card border-border/50 group hover:border-primary/30 flex items-start gap-4 rounded-2xl border p-6 transition-all"
                >
                  <div className="bg-accent/50 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 rounded-xl p-3 transition-all">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase opacity-60">
                      {item.type}
                    </p>
                    <p className="text-sm leading-relaxed font-bold">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MarketingPageLayout>
  );
}

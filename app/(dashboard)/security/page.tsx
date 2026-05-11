import { MarketingPageLayout } from '@/components/marketing-layout';
import {
  Shield,
  ShieldAlert,
  Key,
  Globe,
  Database,
  Server,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const securityFeatures = [
  {
    title: 'Data Isolation',
    description:
      'Strict logical separation of organizational data using Row-Level Security (RLS) patterns.',
    icon: Database,
  },
  {
    title: 'SOC2 Compliance',
    description:
      'Our infrastructure is designed to meet SOC2 Type II standards for security and availability.',
    icon: ShieldAlert,
  },
  {
    title: 'Zero Trust Access',
    description:
      'All internal APIs require signed JWTs and are subject to strict RBAC controls.',
    icon: Key,
  },
  {
    title: 'Regional Residency',
    description:
      'Store your financial data in specific geographic regions to meet local compliance laws.',
    icon: Globe,
  },
];

export default function SecurityPage() {
  return (
    <MarketingPageLayout
      title="Security & Compliance"
      subtitle="Enterprise-grade protection for your financial infrastructure."
      icon={Shield}
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 space-y-16 duration-500">
        <section className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="mb-6 text-3xl font-black tracking-tight">
            Our Security Philosophy
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-medium">
            At Noxfolio, security isn't a feature—it's the foundation. We build
            with a "Secure by Default" mentality, ensuring that every
            transaction, API call, and log entry is protected by
            industry-leading encryption and auditing.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {securityFeatures.map((f) => (
            <Card
              key={f.title}
              className="bg-card border-border/50 group hover:border-primary/30 rounded-[32px] border p-8 shadow-sm transition-all"
            >
              <CardContent className="space-y-4 p-0">
                <div className="bg-primary/10 text-primary w-fit rounded-2xl p-3 transition-transform duration-500 group-hover:scale-110">
                  <f.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="bg-accent/30 border-border/50 group relative overflow-hidden rounded-[40px] border p-10">
          <div className="bg-primary/5 group-hover:bg-primary/10 absolute -top-20 -right-20 h-80 w-80 rounded-full blur-[100px] transition-all duration-1000" />
          <div className="relative z-10 space-y-6">
            <div className="text-primary flex items-center gap-3">
              <Server className="h-6 w-6" />
              <h2 className="text-foreground m-0 text-2xl font-black tracking-tight">
                Infrastructure Security
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Our cloud infrastructure is managed as code and deployed across
              multiple availability zones. We utilize automated vulnerability
              scanning and real-time intrusion detection to stay ahead of
              emerging threats.
            </p>
          </div>
        </section>
      </div>
    </MarketingPageLayout>
  );
}

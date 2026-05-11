'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import {
  CreditCard,
  Stethoscope,
  ShoppingBag,
  GraduationCap,
  Store,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap as ZapIcon,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const industryData: Record<string, any> = {
  fintech: {
    title: 'Fintech',
    icon: CreditCard,
    description:
      'Noxfolio provides bank-grade infrastructure for high-volume financial services and digital banking.',
    features: [
      'Real-time Reconciliation',
      'SOC2 Type II Compliance',
      'Multi-currency Settlement',
    ],
    image:
      'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80&w=2000',
  },
  healthtech: {
    title: 'Healthtech',
    icon: Stethoscope,
    description:
      'Secure, HIPAA-ready billing solutions for modern healthcare providers and telemedicine platforms.',
    features: [
      'HIPAA Compliant Vaulting',
      'Patient Payment Portals',
      'Insurance Integration',
    ],
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000',
  },
  ecommerce: {
    title: 'E-commerce',
    icon: ShoppingBag,
    description:
      'Scale your global retail brand with localized checkouts, automated taxes, and abandoned cart recovery.',
    features: [
      'Global Tax Automation',
      'Multi-currency Checkout',
      'Subscription Box Support',
    ],
    image:
      'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2000',
  },
  edtech: {
    title: 'EdTech',
    icon: GraduationCap,
    description:
      'Flexible billing models for online courses, universities, and learning management systems.',
    features: [
      'Tiered Seat Pricing',
      'Automated Certificate Issuance',
      'Scholarship Discount Logic',
    ],
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000',
  },
  marketplaces: {
    title: 'Marketplaces',
    icon: Store,
    description:
      'Orchestrate complex multi-party payments, seller commissions, and global payouts seamlessly.',
    features: [
      'Split Payment Logic',
      'Seller Onboarding KYC',
      'Commission Engine',
    ],
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
  },
  saas: {
    title: 'AI & SaaS',
    icon: Zap,
    description:
      'The preferred billing engine for modern software companies using usage-based and hybrid pricing models.',
    features: [
      'Usage-based Metering',
      'Feature Flag Integration',
      'Customer Success Sync',
    ],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
  },
};

export default function IndustryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = industryData[slug];

  if (!data) {
    notFound();
  }

  const Icon = data.icon;

  return (
    <main className="bg-background text-foreground min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[1000px] w-full -translate-x-1/2">
        <div className="absolute top-0 left-1/2 h-full w-[150%] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.03)_0%,transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Breadcrumb-ish Hero */}
        <div className="mx-auto mb-20 flex max-w-4xl flex-col items-center space-y-8 text-center">
          <div className="bg-primary/10 text-primary border-primary/20 flex items-center gap-2 rounded-full border px-4 py-2">
            <Icon className="h-5 w-5" />
            <span className="text-xs font-black tracking-[0.2em] uppercase">
              {data.title} Solutions
            </span>
          </div>

          <h1 className="text-5xl leading-[1.05] font-extrabold tracking-tighter md:text-8xl">
            Revolutionizing <br />
            <span className="text-brand-gradient font-medium">
              {data.title}.
            </span>
          </h1>

          <p className="text-muted-foreground text-xl leading-relaxed font-medium md:text-2xl">
            {data.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-brand-gradient shadow-primary/20 h-16 rounded-full border-0 px-10 font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                Build your {data.title} Platform
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mb-32 grid gap-8 md:grid-cols-3">
          {data.features.map((feature: string, idx: number) => (
            <div
              key={feature}
              className="bg-card border-border hover:border-primary/50 group rounded-[2.5rem] border p-10 transition-all"
            >
              <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{feature}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Seamlessly integrated into your {data.title} infrastructure with
                enterprise-grade reliability.
              </p>
            </div>
          ))}
        </div>

        {/* Visual Narrative */}
        <div className="border-border group relative mb-32 aspect-[21/9] overflow-hidden rounded-[3rem] border shadow-2xl">
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute right-12 bottom-12 left-12 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Built for Scale. Designed for Growth.
              </h2>
              <p className="text-lg leading-relaxed font-medium text-white/80">
                Our infrastructure is optimized to handle the extreme
                reliability requirements of the {data.title} industry.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-white">99.99%</span>
                <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">
                  Uptime SLA
                </span>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-white">256-bit</span>
                <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">
                  Encryption
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Trust Section */}
        <div className="space-y-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Join leading {data.title} companies.
          </h2>
          <div className="flex flex-wrap justify-center gap-16 opacity-40 grayscale">
            {/* Placeholder for industry logos */}
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter">
              GLOBAL_PAY
            </div>
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter">
              FIN_TECH
            </div>
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter">
              SECURE_HEALTH
            </div>
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter">
              ED_POWER
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

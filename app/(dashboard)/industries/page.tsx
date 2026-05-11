'use client';

import React from 'react';
import {
  Globe,
  Rocket,
  ShoppingCart,
  Landmark,
  Building2,
  Smartphone,
  Globe2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function IndustriesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[1200px] w-full -translate-x-1/2">
        <div className="absolute top-0 left-1/2 h-full w-[160%] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.04)_0%,transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-24 max-w-3xl space-y-6 text-center">
          <div className="bg-primary/5 border-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase">
            Global Solutions
          </div>
          <h1 className="text-5xl leading-[1.1] font-extrabold tracking-tighter md:text-7xl">
            Tailored for Every <br />
            <span className="text-brand-gradient font-medium">Vertical.</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed font-medium">
            Noxfolio provides specialized billing infrastructure designed for{' '}
            <br className="hidden md:block" />
            the unique challenges of your specific industry.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="mb-40 grid gap-8 md:grid-cols-2">
          <IndustryHeroCard
            icon={Rocket}
            title="SaaS & Software"
            description="Manage complex subscription lifecycles, tiered pricing, and seat-based billing with zero overhead."
            benefits={[
              'Usage-based billing',
              'Churn prevention AI',
              'Seat management',
            ]}
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
          />
          <IndustryHeroCard
            icon={ShoppingCart}
            title="E-commerce"
            description="Scale global sales with localized tax automation, multi-currency checkouts, and split payments."
            benefits={[
              'Global tax compliance',
              'One-click checkout',
              'Inventory sync',
            ]}
            image="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800"
          />
          <IndustryHeroCard
            icon={Landmark}
            title="Fintech & Banking"
            description="Bank-grade security for high-volume transactions with integrated compliance and fraud detection."
            benefits={[
              'SOC2 Type II security',
              'Fraud scoring',
              'Reconciliation engine',
            ]}
            image="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80&w=800"
          />
          <IndustryHeroCard
            icon={Building2}
            title="Marketplaces"
            description="Orchestrate complex payouts between buyers and sellers with automated commission management."
            benefits={['Seller payouts', 'Commission logic', 'Split payments']}
            image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
          />
        </div>

        {/* Special Case Section */}
        <div className="bg-card border-border relative flex flex-col items-center gap-16 overflow-hidden rounded-[3rem] border p-12 md:p-24 lg:flex-row">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(var(--primary-rgb),0.05)_0%,transparent_50%)]" />

          <div className="relative z-10 flex-1 space-y-8">
            <h2 className="text-4xl font-bold tracking-tighter md:text-5xl">
              Your Industry isn't listed?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              Noxfolio's API-first architecture makes it adaptable to any
              business model. From IoT to Healthcare, we help you build the
              billing infrastructure you need.
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 h-14 rounded-full px-10 font-bold transition-all"
                >
                  Consult with Experts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative z-10 grid flex-1 grid-cols-2 gap-4">
            <MiniCard icon={Smartphone} title="Mobile Apps" />
            <MiniCard icon={Globe2} title="Digital Agencies" />
            <MiniCard icon={Rocket} title="Web3 & Crypto" />
            <MiniCard icon={Building2} title="Real Estate" />
          </div>
        </div>
      </div>
    </main>
  );
}

function IndustryHeroCard({
  icon: Icon,
  title,
  description,
  benefits,
  image,
}: any) {
  return (
    <div className="group border-border bg-card hover:border-primary/50 shadow-primary/0 hover:shadow-primary/5 relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-500">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="from-card absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      <div className="relative z-10 -mt-20 p-10">
        <div className="bg-primary text-primary-foreground shadow-primary/20 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-110">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="mb-4 text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-muted-foreground mb-8 leading-relaxed font-medium">
          {description}
        </p>

        <ul className="space-y-3">
          {benefits.map((b: string) => (
            <li
              key={b}
              className="text-foreground/80 flex items-center gap-3 text-sm font-bold"
            >
              <CheckCircle2 className="text-primary h-4 w-4" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MiniCard({ icon: Icon, title }: any) {
  return (
    <div className="border-border bg-background/50 hover:border-primary/30 rounded-2xl border p-6 backdrop-blur-sm transition-colors">
      <Icon className="text-primary mb-3 h-6 w-6" />
      <span className="text-sm font-bold tracking-tight">{title}</span>
    </div>
  );
}

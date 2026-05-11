'use client';

import React from 'react';
import {
  Check,
  Sparkles,
  Calculator,
  ArrowRight,
  Zap,
  Trophy,
  Crown,
  Globe,
  ShieldCheck,
  HelpCircle,
  Minus,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function PricingPage() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="bg-background text-foreground selection:bg-primary/30 min-h-screen overflow-x-hidden pt-40 pb-32 transition-colors duration-500">
      {/* Refined Background Decor */}
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-[1200px] w-full overflow-hidden">
        <div className="absolute top-0 left-1/2 h-full w-[150%] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Enterprise Header */}
        <div className="mx-auto mb-24 max-w-3xl space-y-6 text-center">
          <div className="bg-primary/5 border-primary/10 text-primary animate-in fade-in slide-in-from-bottom-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
            <ShieldCheck className="h-3.5 w-3.5" />
            Flexible Billing for Global Scale
          </div>
          <h1 className="text-foreground text-5xl leading-[1.1] font-extrabold tracking-tighter md:text-7xl">
            Simple Pricing. <br />
            <span className="text-muted-foreground font-medium">
              Zero Surprises.
            </span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed font-medium">
            Choose the plan that fits your current needs.{' '}
            <br className="hidden md:block" />
            Scale seamlessly as your transaction volume grows.
          </p>
        </div>

        {/* Dynamic Pricing Calculator CTA */}
        <div className="from-primary/20 via-border to-primary/20 mx-auto mb-24 max-w-4xl rounded-[2.5rem] bg-gradient-to-r p-1 shadow-2xl">
          <div className="bg-card flex flex-col items-center justify-between gap-8 rounded-[2.4rem] p-8 md:flex-row md:p-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight">
                Not sure which plan to pick?
              </h3>
              <p className="text-muted-foreground font-medium">
                Use our interactive calculator to estimate your monthly credit
                needs based on your exact usage.
              </p>
            </div>
            <Link href="/pricing-calculator">
              <Button
                size="lg"
                className="group shadow-primary/10 h-14 rounded-2xl px-8 font-bold shadow-xl"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Open Calculator
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="border-border/50 mb-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-y py-10">
          <HighlightItem icon={Zap} text="50 Free Credits" />
          <HighlightItem icon={Globe} text="Unlimited Seats" />
          <HighlightItem icon={Sparkles} text="All Features Included" />
          <HighlightItem icon={Trophy} text="Pay Only What You Use" />
        </div>

        {/* High-End Pricing Cards */}
        <div className="mb-32 grid items-end gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PricingCard
            name="Starter"
            price="₹2,500"
            credits="2,500"
            description="Perfect for startups and small developer teams."
            features={[
              '50 Free Credits',
              'Standard API Support',
              'Community Access',
            ]}
            icon={Zap}
          />
          <PricingCard
            name="Growth"
            price="₹6,500"
            credits="6,500"
            description="Our most popular choice for scaling companies."
            features={[
              'Priority Support',
              'Custom Domain',
              'Team Collaboration',
            ]}
            icon={Trophy}
            popular
          />
          <PricingCard
            name="Professional"
            price="₹15,000"
            credits="15,000"
            description="Advanced tools for large-scale operations."
            features={[
              'SLA Guarantee',
              'Dedicated Manager',
              'Advanced Security',
            ]}
            icon={Crown}
          />
          <PricingCard
            name="Custom"
            price="Contact Us"
            credits="Custom"
            description="Tailored architecture for global enterprises."
            features={[
              'White-labeling',
              'On-premise Options',
              'Unlimited Scale',
            ]}
            icon={Globe}
            isCustom
          />
        </div>

        {/* Trust Signals */}
        <div className="text-muted-foreground/60 border-border/30 mb-40 flex flex-wrap items-center justify-center gap-x-16 gap-y-6 border-t pt-10 text-[10px] font-black tracking-[0.25em] uppercase">
          <span>No credit card required</span>
          <span>Cancel anytime</span>
          <span>No hidden fees</span>
          <span>Secure checkout</span>
        </div>

        {/* Professional Credit Breakdown */}
        <div className="bg-card border-border shadow-primary/5 mb-32 overflow-hidden rounded-[3rem] border shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="bg-muted/20 space-y-12 p-12 md:p-20">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight">
                  How Credits Work
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We use a transparent credit-based model. You only pay for the
                  specific resources your infrastructure consumes.
                </p>
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                <div className="space-y-6">
                  <h4 className="text-primary text-xs font-black tracking-widest uppercase">
                    Consumption
                  </h4>
                  <ul className="space-y-4">
                    <FeatureItem text="Workflow Automations" />
                    <FeatureItem text="AI Feature Usage" />
                    <FeatureItem text="Chatbot Responses" />
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-black tracking-widest text-emerald-500 uppercase">
                    Free Features
                  </h4>
                  <ul className="space-y-4">
                    <FeatureItem text="CRM & Leads" />
                    <FeatureItem text="Communication Hub" />
                    <FeatureItem text="Advanced Analytics" />
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border-border/50 border-l p-12 md:p-20">
              <div className="mb-12 flex items-center gap-4">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl">
                  <span className="text-2xl font-bold">₹</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Credit Cost Table
                </h3>
              </div>

              <div className="space-y-1">
                <CostRow
                  label="Workflow Execution"
                  cost="0.50 - 1.25 credits"
                />
                <CostRow label="AI Features" cost="At cost (No Markup)" />
                <CostRow label="AI Voice Call" cost="3 credits / min" />
                <CostRow label="Carrier Costs" cost="At actual rates" />
              </div>

              <div className="bg-muted/50 border-border mt-12 rounded-3xl border p-8">
                <div className="flex items-start gap-4">
                  <HelpCircle className="text-primary mt-1 h-5 w-5" />
                  <div>
                    <p className="text-foreground mb-1 text-sm font-bold">
                      Need more credits?
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Top up your account anytime at{' '}
                      <span className="text-foreground font-bold">
                        ₹1 per credit
                      </span>
                      . Custom plans can increase your base limits instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mb-32 max-w-4xl">
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            <FAQItem
              q="Can I change my plan anytime?"
              a="Yes, you can upgrade or downgrade your plan at any moment. Credit limits will be adjusted immediately."
            />
            <FAQItem
              q="What happens to unused credits?"
              a="Unused credits from your monthly plan do not roll over. However, purchased top-up credits never expire."
            />
            <FAQItem
              q="Do you offer volume discounts?"
              a="Absolutely. For high-volume transaction teams, we offer custom pricing tiers tailored to your scale."
            />
            <FAQItem
              q="Is there a setup fee?"
              a="No. Noxfolio is self-serve with zero setup or hidden activation fees on any of our standard plans."
            />
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-primary relative overflow-hidden rounded-[4rem] p-12 text-center shadow-[0_40px_100px_-20px_rgba(var(--primary-rgb),0.3)] md:p-24">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-primary-foreground text-4xl leading-none font-black tracking-tighter md:text-6xl">
              Ready to automate your <br /> revenue infrastructure?
            </h2>
            <p className="text-primary-foreground/80 mx-auto max-w-2xl text-lg font-medium md:text-xl">
              Start your free 3-day trial today. 50 Free Credits included. No
              credit card required.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-muted h-16 rounded-full px-12 text-lg font-bold shadow-2xl transition-all active:scale-95"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground h-16 rounded-full bg-transparent px-12 text-lg font-bold hover:bg-white/10"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  credits,
  description,
  features,
  icon: Icon,
  popular = false,
  isCustom = false,
}: any) {
  return (
    <div
      className={`group relative flex h-full flex-col rounded-[2.5rem] border p-8 transition-all duration-500 ${
        popular
          ? 'bg-card border-primary shadow-primary/10 z-10 scale-105 shadow-2xl'
          : 'bg-card/50 border-border hover:border-primary/30'
      } `}
    >
      {popular && (
        <div className="bg-primary text-primary-foreground absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-black tracking-widest uppercase">
          Most Popular
        </div>
      )}

      <div
        className={`bg-primary/10 text-primary mb-8 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold tracking-tight">{name}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed font-medium">
          {description}
        </p>
      </div>

      <div className="mb-10">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          {!isCustom && (
            <span className="text-muted-foreground ml-1 text-sm font-medium tracking-widest uppercase">
              /mo
            </span>
          )}
        </div>
        <div className="text-primary mt-1 text-sm font-bold tracking-widest uppercase">
          {credits} credits/mo
        </div>
      </div>

      <ul className="mb-12 space-y-4">
        {features.map((feature: string) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="h-4 w-4 text-emerald-500" />
            <span className="text-muted-foreground text-sm font-medium">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Link href={isCustom ? '/contact' : '/sign-up'} className="w-full">
          <Button
            className={`h-14 w-full rounded-2xl text-lg font-bold ${popular ? 'bg-primary shadow-primary/20 shadow-lg' : 'bg-muted text-foreground hover:bg-muted/80'}`}
            variant={popular ? 'default' : 'outline'}
          >
            {isCustom ? 'Contact Sales' : 'Get Started'}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function HighlightItem({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-xl">
        <Icon className="text-primary h-5 w-5" />
      </div>
      <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
        {text}
      </span>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="group flex items-center gap-3">
      <div className="bg-primary h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125" />
      <span className="text-foreground text-sm font-medium">{text}</span>
    </li>
  );
}

function CostRow({ label, cost }: { label: string; cost: string }) {
  return (
    <div className="border-border/50 hover:bg-muted/10 group flex items-center justify-between rounded-xl border-b px-4 py-5 transition-colors">
      <span className="text-muted-foreground group-hover:text-foreground text-sm font-bold tracking-widest uppercase transition-colors">
        {label}
      </span>
      <span className="text-foreground text-sm font-black">{cost}</span>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="space-y-3">
      <h4 className="text-foreground text-lg font-bold tracking-tight">{q}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
    </div>
  );
}

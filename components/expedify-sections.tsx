'use client';

import React from 'react';
import {
  Brain,
  Users,
  MessageSquare,
  Check,
  ArrowRight,
  Zap,
  Globe,
  Shield,
  Cpu,
  Layout,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NoxfolioFeatures() {
  return (
    <section className="bg-background relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 space-y-6 text-center">
          <h2 className="text-4xl leading-tight font-extrabold tracking-tighter md:text-7xl">
            The Only CRM That <br />
            <span className="text-brand-gradient font-medium italic">
              Thinks, Talks, and Acts.
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed font-medium">
            Noxfolio connects memory, intelligence, and action—creating a CRM
            that evolves with your business.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <FeatureColumn
            icon={Brain}
            title="The Brain"
            description="Learns from every interaction and evolves continuously."
            features={[
              'Learns from every interaction and evolves continuously',
              "Remembers every customer's context, preferences & history",
              'Updates insights automatically—no manual data entry',
            ]}
            color="from-blue-500/20 to-indigo-500/20"
          />
          <FeatureColumn
            icon={Users}
            title="The Workforce"
            description="Specialized AI agents working 24/7 across sales, service & marketing."
            features={[
              'Specialized AI agents working 24/7 across sales, service & marketing',
              'Each agent handles a task—calling, follow-ups, payments & analytics',
              'Seamlessly coordinated by the Noxfolio Brain',
            ]}
            color="from-purple-500/20 to-pink-500/20"
          />
          <FeatureColumn
            icon={MessageSquare}
            title="The Interface"
            description="Trigger any workflow through simple WhatsApp or chat commands."
            features={[
              'Trigger any workflow through simple WhatsApp or chat commands',
              'No dashboards, no learning curve—just conversation',
              'Talk to your CRM like you talk to your team',
            ]}
            color="from-emerald-500/20 to-teal-500/20"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureColumn({
  icon: Icon,
  title,
  description,
  features,
  color,
}: any) {
  return (
    <div className="group border-border bg-card/50 hover:border-primary/50 shadow-primary/0 hover:shadow-primary/5 relative flex h-full flex-col rounded-[3rem] border p-10 shadow-2xl transition-all duration-500">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} -z-10 rounded-[3rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="bg-background border-border mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-xl transition-transform duration-500 group-hover:scale-110">
        <Icon className="text-primary h-8 w-8" />
      </div>

      <h3 className="mb-4 text-3xl font-bold tracking-tight">{title}</h3>
      <p className="text-muted-foreground mb-10 text-sm leading-relaxed font-medium">
        {description}
      </p>

      <ul className="mb-12 space-y-5">
        {features.map((f: string) => (
          <li key={f} className="flex items-start gap-4">
            <div className="bg-primary/10 text-primary mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
              <Check className="h-3 w-3" />
            </div>
            <span className="text-foreground/80 text-sm leading-tight font-bold">
              {f}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Link href="/sign-up">
          <Button
            size="lg"
            className="bg-foreground text-background group-hover:bg-brand-gradient h-14 w-full rounded-2xl border-0 font-bold transition-all group-hover:text-white hover:opacity-90"
          >
            Start Free Trial
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function IntegrationMarquee() {
  const integrations = [
    { name: 'Stripe', domain: 'stripe.com' },
    { name: 'Razorpay', domain: 'razorpay.com' },
    { name: 'WhatsApp', domain: 'whatsapp.com' },
    { name: 'Slack', domain: 'slack.com' },
    { name: 'Zapier', domain: 'zapier.com' },
    { name: 'Salesforce', domain: 'salesforce.com' },
    { name: 'Hubspot', domain: 'hubspot.com' },
    { name: 'Mailchimp', domain: 'mailchimp.com' },
    { name: 'Shopify', domain: 'shopify.com' },
    { name: 'Twilio', domain: 'twilio.com' },
    { name: 'Zendesk', domain: 'zendesk.com' },
    { name: 'Discord', domain: 'discord.com' },
    { name: 'Google', domain: 'google.com' },
    { name: 'Trello', domain: 'trello.com' },
    { name: 'Asana', domain: 'asana.com' },
    { name: 'Notion', domain: 'notion.so' },
    { name: 'Calendly', domain: 'calendly.com' },
    { name: 'Zoom', domain: 'zoom.us' },
    { name: 'Intercom', domain: 'intercom.com' },
    { name: 'Paypal', domain: 'paypal.com' },
    { name: 'Quickbooks', domain: 'intuit.com' },
    { name: 'Xero', domain: 'xero.com' },
    { name: 'Pipedrive', domain: 'pipedrive.com' },
    { name: 'Airtable', domain: 'airtable.com' },
    { name: 'Typeform', domain: 'typeform.com' },
  ];

  return (
    <section className="bg-background overflow-hidden py-32">
      <div className="mx-auto mb-20 max-w-7xl space-y-6 px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
          One Platform. 40+ Integrations.
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg font-medium">
          Unify your data, automate your workflows, and supercharge your
          business with 40+ integrations.
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Gradient Masks for Faded Edges */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l to-transparent" />

        <div className="flex flex-col gap-10 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          {/* Top Row - Fast Forward */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex gap-10 py-4 whitespace-nowrap">
              {[...integrations, ...integrations].map((item, i) => (
                <div
                  key={i}
                  className="border-border bg-card shadow-primary/0 hover:shadow-primary/5 hover:border-primary/50 group/logo flex items-center gap-4 rounded-[2rem] border px-8 py-5 shadow-2xl transition-all"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-2 shadow-inner transition-transform duration-500 group-hover/logo:scale-110">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`}
                      alt={item.name}
                      className="h-full w-full object-contain"
                      onError={(e: any) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${item.name}&background=ED0600&color=fff&bold=true`;
                      }}
                    />
                  </div>
                  <span className="text-foreground text-sm font-black tracking-[0.15em] uppercase">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Fast Reverse */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee-reverse flex gap-10 py-4 whitespace-nowrap">
              {[
                ...[...integrations].reverse(),
                ...[...integrations].reverse(),
              ].map((item, i) => (
                <div
                  key={i}
                  className="border-border bg-card shadow-primary/0 hover:shadow-primary/5 hover:border-primary/50 group/logo flex items-center gap-4 rounded-[2rem] border px-8 py-5 shadow-2xl transition-all"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-2 shadow-inner transition-transform duration-500 group-hover/logo:scale-110">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`}
                      alt={item.name}
                      className="h-full w-full object-contain"
                      onError={(e: any) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${item.name}&background=ED0600&color=fff&bold=true`;
                      }}
                    />
                  </div>
                  <span className="text-foreground text-sm font-black tracking-[0.15em] uppercase">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PremiumPricing() {
  return (
    <section className="bg-background relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 space-y-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            Simple Pricing.{' '}
            <span className="text-brand-gradient italic">Zero Surprises.</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Start free. Scale as you grow. Pay only for what you use.
          </p>
        </div>

        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PricingHighlightCard
            title="1 Credit = ₹1"
            desc="Simple, transparent pricing. No hidden costs."
            icon={Zap}
          />
          <PricingHighlightCard
            title="Pay Per Workflow"
            desc="Only charged when automations run."
            icon={Workflow}
          />
          <PricingHighlightCard
            title="AI At Cost"
            desc="No markup on AI features. We pass on what we pay."
            icon={Cpu}
          />
          <PricingHighlightCard
            title="Unlimited Seats"
            desc="No per-user fees. Add your entire team."
            icon={Users}
          />
        </div>

        <div className="text-muted-foreground/60 border-border/50 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t pt-10 text-[10px] font-black tracking-[0.25em] uppercase">
          <span className="flex items-center gap-2">
            <Check className="h-3 w-3 text-emerald-500" /> No credit card
            required
          </span>
          <span className="opacity-30">|</span>
          <span className="flex items-center gap-2">
            <Check className="h-3 w-3 text-emerald-500" /> Cancel anytime
          </span>
          <span className="opacity-30">|</span>
          <span className="flex items-center gap-2">
            <Check className="h-3 w-3 text-emerald-500" /> No hidden fees
          </span>
        </div>
      </div>
    </section>
  );
}

function PricingHighlightCard({ title, desc, icon: Icon }: any) {
  return (
    <div className="border-border bg-card hover:border-primary/50 group flex flex-col items-center rounded-[2.5rem] border p-10 text-center transition-all duration-500">
      <div className="bg-primary/10 text-primary mb-8 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-6">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-4 text-2xl font-bold tracking-tight">{title}</h3>
      <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-medium">
        {desc}
      </p>
      <Link href="/sign-up" className="mt-auto w-full">
        <Button
          variant="outline"
          className="border-border hover:bg-muted h-12 w-full rounded-xl font-bold transition-all"
        >
          Start 3-Day Trial
        </Button>
      </Link>
    </div>
  );
}

'use client';

import React from 'react';
import {
  Zap,
  Shield,
  Globe,
  Cpu,
  BarChart3,
  Users,
  Layers,
  Workflow,
  MessageSquare,
  Database,
  Lock,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[1000px] w-full -translate-x-1/2">
        <div className="absolute top-0 left-1/2 h-full w-[150%] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.03)_0%,transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-24 max-w-3xl space-y-6 text-center">
          <div className="bg-primary/5 border-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase">
            Platform Capabilities
          </div>
          <h1 className="text-5xl leading-[1.1] font-extrabold tracking-tighter md:text-7xl">
            Powerful Features for <br />
            <span className="text-brand-gradient font-medium italic">
              Next-Gen Revenue.
            </span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed font-medium">
            Everything you need to build, scale, and manage global billing{' '}
            <br className="hidden md:block" />
            infrastructure with zero friction.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mb-32 grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={Workflow}
            title="Automated Workflows"
            description="Build complex billing cycles with our visual workflow engine. Automate renewals, retries, and provisioning without code."
            delay="0"
          />
          <FeatureCard
            icon={Cpu}
            title="AI-Powered Analytics"
            description="Predict churn, optimize pricing tiers, and identify revenue leaks with our integrated machine learning models."
            delay="100"
          />
          <FeatureCard
            icon={Globe}
            title="Global Compliance"
            description="Native support for VAT, GST, and localized tax laws in 150+ countries. Stay compliant automatically as you scale."
            delay="200"
          />
          <FeatureCard
            icon={Shield}
            title="Enterprise Security"
            description="Bank-grade encryption, SOC2 Type II compliance, and detailed audit logs for every transaction."
            delay="300"
          />
          <FeatureCard
            icon={Layers}
            title="Multi-Gateway Sync"
            description="Connect multiple payment gateways like Stripe, Razorpay, and PayPal. Unified data and reporting in one place."
            delay="400"
          />
          <FeatureCard
            icon={MessageSquare}
            title="Communication Hub"
            description="Integrated email, SMS, and WhatsApp alerts for invoices, failed payments, and account notifications."
            delay="500"
          />
        </div>

        {/* Deep Dive Section */}
        <div className="mb-32 space-y-32">
          <DetailSection
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
            tag="Analytics"
            title="Real-time Revenue Intelligence"
            description="Get a 360-degree view of your financial health. Track MRR, LTV, and Churn in real-time with beautiful, interactive dashboards that your whole team will love."
            features={[
              'Custom Report Builder',
              'Anomaly Detection',
              'Export to CSV/Excel',
            ]}
          />
          <DetailSection
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
            tag="Integration"
            title="Developer-First API & SDKs"
            description="Integrate Noxfolio into your existing stack in minutes. Our REST API and SDKs for React, Node, Python, and Go are designed for maximum developer velocity."
            features={[
              'Webhook Management',
              'Sandboxed Testing',
              'Automated Documentation',
            ]}
            reverse
          />
        </div>

        {/* Final CTA */}
        <div className="bg-card border-border relative overflow-hidden rounded-[3rem] border p-12 text-center md:p-20">
          <div className="bg-primary/10 absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full blur-3xl" />
          <div className="bg-primary/5 absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full blur-3xl" />

          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
            Experience the future of billing.
          </h2>
          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg font-medium">
            Join 5,000+ businesses who have streamlined their revenue operations
            with Noxfolio.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-brand-gradient shadow-primary/20 h-14 rounded-full border-0 px-10 font-bold text-white shadow-xl transition-all hover:scale-105"
              >
                Get Started Now
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-muted h-14 rounded-full px-10 font-bold transition-all"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }: any) {
  return (
    <div className="group bg-card border-border hover:border-primary/50 hover:shadow-primary/5 rounded-[2rem] border p-8 transition-all duration-500 hover:shadow-2xl">
      <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-3 text-xl font-bold tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}

function DetailSection({
  image,
  tag,
  title,
  description,
  features,
  reverse = false,
}: any) {
  return (
    <div
      className={`flex flex-col items-center gap-16 lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className="flex-1 space-y-8">
        <div className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase">
          {tag}
        </div>
        <h2 className="text-4xl leading-tight font-bold tracking-tighter md:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed font-medium">
          {description}
        </p>
        <ul className="space-y-4">
          {features.map((f: string) => (
            <li key={f} className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full">
                <Zap className="h-3 w-3 fill-current" />
              </div>
              <span className="text-sm font-bold">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex-1">
        <div className="border-border group relative aspect-video overflow-hidden rounded-[2.5rem] border shadow-2xl">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

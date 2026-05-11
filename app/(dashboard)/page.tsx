'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Shield,
  Layout,
  Cpu,
  Globe,
  Github,
  Zap,
} from 'lucide-react';
import { Terminal } from './terminal';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { IndustriesMegaMenu } from '@/components/industries-mega-menu';
import { useTheme } from 'next-themes';

import { FAQSection } from '@/components/faq-section';
import {
  NoxfolioFeatures,
  IntegrationMarquee,
  PremiumPricing,
} from '@/components/noxfolio-sections';

export default function HomePage() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navBg = mounted && resolvedTheme === 'dark' ? '#09090b' : '#ffffff';

  return (
    <main className="bg-background text-foreground selection:bg-brand-red min-h-screen overflow-x-hidden selection:text-white">
      {/* Hero Section (Split Layout) */}

      {/* Hero Section (Split Layout) */}
      <section className="bg-background relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background Effects */}
        <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2">
          <div className="absolute top-0 left-1/2 h-full w-[140%] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.02)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:40px_40px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Column: Text Content */}
            <div className="animate-in fade-in slide-in-from-left-8 text-left duration-1000">
              <div className="bg-brand-deep/5 dark:bg-brand-deep/20 border-brand-blue/20 text-brand-blue mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="bg-brand-pink absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                  <span className="bg-brand-pink relative inline-flex h-2 w-2 rounded-full"></span>
                </span>
                Now in Private Beta
              </div>

              <h1 className="mb-8 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                The Billing Infrastructure <br />
                <span className="text-brand-gradient">for Modern SaaS.</span>
              </h1>

              <p className="text-muted-foreground mb-12 max-w-xl text-lg leading-relaxed text-balance md:text-xl">
                Noxfolio is a sovereign financial stack for modern software
                companies. Engineered for high-performance revenue management
                and enterprise scale.
              </p>

              <div className="flex flex-col items-center justify-start gap-4 sm:flex-row">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="group shadow-primary/30 bg-brand-gradient h-14 w-full rounded-xl border-0 px-10 text-base font-bold text-white shadow-xl transition-all hover:scale-105 hover:opacity-90 sm:w-auto"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="#overview" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 w-full rounded-xl border-zinc-200 bg-white/50 px-10 text-base font-bold text-black backdrop-blur-sm transition-all hover:bg-zinc-50 sm:w-auto dark:border-zinc-800 dark:bg-black/50 dark:text-white dark:hover:bg-zinc-900"
                  >
                    Watch Overview
                  </Button>
                </Link>
              </div>

              <div className="mt-16 flex items-center gap-8 opacity-50 grayscale transition-opacity duration-500 hover:opacity-100">
                <span className="text-xl font-black tracking-tighter">
                  Acme
                </span>
                <span className="text-xl font-black tracking-tighter">
                  Global
                </span>
                <span className="text-xl font-black tracking-tighter">
                  Pulsar
                </span>
                <span className="text-xl font-black tracking-tighter">
                  Vertex
                </span>
              </div>
            </div>

            {/* Right Column: Hero Image / Visuals */}
            <div className="animate-in fade-in slide-in-from-right-12 relative z-20 delay-200 duration-1000 lg:-ml-12">
              <div className="group perspective-1000 relative">
                <img
                  src="/hero-billing.png"
                  alt="Noxfolio Dashboard"
                  className="h-auto w-[90%] drop-shadow-2xl transition-all duration-1000 dark:drop-shadow-[0_35px_35px_rgba(255,255,255,0.05)]"
                />

                {/* Static Stats Cards integrated with the image */}
                <div className="absolute top-1/4 -right-12 rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold tracking-widest text-zinc-500 uppercase">
                        Latency
                      </p>
                      <p className="text-sm font-black tracking-tight">14ms</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background/80 border-border absolute bottom-1/4 -left-12 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[8px] font-bold tracking-widest uppercase">
                        Security
                      </p>
                      <p className="text-sm font-black tracking-tight">
                        SOC2 V2
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Elements */}
              <div className="bg-brand-red/20 absolute top-0 right-0 -z-10 h-64 w-64 rounded-full blur-[100px]" />
              <div className="bg-brand-pink/10 absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full blur-[100px]" />
              <div className="bg-brand-blue/10 absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section (Destination for 'Watch Overview') */}
      <section
        id="overview"
        className="border-border bg-muted/30 relative border-y py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="group border-border relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl border bg-black shadow-2xl">
              <div className="from-primary/20 to-primary/5 absolute inset-0 bg-gradient-to-tr opacity-40 transition-opacity group-hover:opacity-60" />
              <Button
                size="lg"
                className="text-primary relative z-10 h-20 w-20 rounded-full bg-white transition-transform hover:scale-110"
              >
                <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Button>
              <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between text-[10px] font-bold tracking-widest text-white/50 uppercase">
                <span>Platform Walkthrough — 2:45</span>
                <span>Noxfolio OS v1.0</span>
              </div>
            </div>

            <div className="text-left">
              <h2 className="mb-6 text-3xl font-black tracking-tight md:text-5xl">
                Engineered for <br />
                <span className="text-brand-cool-gradient">
                  Total Visibility.
                </span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Stop guessing where your revenue goes. Noxfolio provides a
                single source of truth for your entire financial lifecycle, from
                the first API call to the final audit.
              </p>
              <ul className="space-y-4">
                {[
                  'Unified multi-gateway analytics',
                  'Real-time tax compliance monitoring',
                  'Automated reconciliation engine',
                ].map((item) => (
                  <li
                    key={item}
                    className="text-foreground flex items-center gap-3 text-sm font-bold"
                  >
                    <div className="bg-brand-pink/10 text-brand-pink flex h-5 w-5 items-center justify-center rounded-full">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Noxfolio Sections */}
      <NoxfolioFeatures />
      <IntegrationMarquee />
      <PremiumPricing />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="border-border bg-background relative overflow-hidden border-t py-48 text-center">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-5xl font-bold tracking-tight md:text-7xl">
            Build your <br />
            Revenue Engine.
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-brand-gradient h-12 rounded-md border-0 px-10 text-base font-medium text-white shadow-2xl hover:opacity-90"
              >
                Get Started for Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-muted h-12 rounded-md px-10 text-base font-medium"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

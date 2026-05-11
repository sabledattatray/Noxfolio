'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  CreditCard,
  Stethoscope,
  ShoppingBag,
  GraduationCap,
  Store,
  Zap,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sparkles,
} from 'lucide-react';

const industries = [
  {
    title: 'Fintech',
    description: 'Bank-grade infrastructure for digital banking.',
    icon: CreditCard,
    href: '/industries/fintech',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]',
  },
  {
    title: 'Healthtech',
    description: 'HIPAA-ready billing for modern healthcare.',
    icon: Stethoscope,
    href: '/industries/healthtech',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]',
  },
  {
    title: 'E-commerce',
    description: 'Global checkout and automated tax logic.',
    icon: ShoppingBag,
    href: '/industries/ecommerce',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]',
  },
  {
    title: 'AI & SaaS',
    description: 'Usage-based models for software companies.',
    icon: Zap,
    href: '/industries/saas',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]',
  },
  {
    title: 'Marketplaces',
    description: 'Multi-party payouts and commission engines.',
    icon: Store,
    href: '/industries/marketplaces',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]',
  },
  {
    title: 'EdTech',
    description: 'Scalable subscription models for learning.',
    icon: GraduationCap,
    href: '/industries/edtech',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]',
  },
];

export function IndustriesMegaMenu() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const bgColor = mounted && resolvedTheme === 'dark' ? '#000000' : '#ffffff';

  return (
    <div className="absolute top-full left-1/2 z-[100] hidden w-[840px] -translate-x-1/2 pt-4 group-hover:block">
      <div
        className="border-border relative overflow-hidden rounded-[2.5rem] border p-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.35)] transition-all duration-500 dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)]"
        style={{ backgroundColor: bgColor }}
      >
        {/* Background Accents */}
        <div className="bg-primary/5 absolute top-0 right-0 -z-10 h-64 w-64 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />

        <div className="grid grid-cols-12 gap-10">
          {/* Featured Section */}
          <div className="col-span-4 space-y-6">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase">
                Featured Industry
              </h3>
              <h2 className="text-2xl font-black tracking-tight">
                Global Fintech <br />
                Infrastrucutre
              </h2>
            </div>

            <Link
              href="/industries/fintech"
              className="group/feat relative block aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl transition-all hover:-translate-y-1"
            >
              <img
                src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80&w=800"
                alt="Fintech"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/feat:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute right-6 bottom-6 left-6 space-y-2">
                <p className="text-xs font-black tracking-widest text-white/60 uppercase">
                  Case Study
                </p>
                <h4 className="text-lg font-bold text-white">
                  Scaling Neo-banks to 10M+ users
                </h4>
                <div className="flex items-center gap-2 text-xs font-black text-blue-400">
                  READ MORE <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          </div>

          {/* Grid Section */}
          <div className="col-span-8">
            <div className="mb-6 flex items-center justify-between px-2">
              <h3 className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
                Industry Verticals
              </h3>
              <Link
                href="/industries"
                className="text-primary text-[10px] font-black tracking-widest uppercase hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {industries.map((ind) => (
                <Link
                  key={ind.title}
                  href={ind.href}
                  className={`group hover:border-border/50 hover:bg-muted/30 relative flex items-start gap-4 rounded-3xl border border-transparent p-5 transition-all duration-300 ${ind.glow}`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${ind.bg} ${ind.color} transition-transform duration-500 group-hover:scale-110`}
                  >
                    <ind.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-foreground flex items-center text-sm font-bold">
                      {ind.title}
                      <ArrowRight className="ml-2 h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {ind.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-muted/50 border-border/50 mt-10 flex items-center justify-between rounded-[2rem] border p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black tracking-tight uppercase">
                  Enterprise Grade
                </p>
                <p className="text-muted-foreground text-[10px]">
                  SOC2 Type II & HIPAA Compliant
                </p>
              </div>
            </div>
            <div className="bg-border/50 h-8 w-px" />
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black tracking-tight uppercase">
                  Global Scale
                </p>
                <p className="text-muted-foreground text-[10px]">
                  Settlement in 130+ currencies
                </p>
              </div>
            </div>
          </div>

          <Link href="/contact">
            <button className="bg-primary shadow-primary/20 flex items-center gap-2 rounded-xl px-6 py-3 text-[10px] font-black tracking-widest text-white uppercase shadow-lg transition-all hover:-translate-y-0.5 active:scale-95">
              <Sparkles className="h-3 w-3" />
              Custom Quote
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

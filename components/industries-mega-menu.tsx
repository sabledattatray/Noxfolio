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
} from 'lucide-react';

const industries = [
  {
    title: 'Fintech',
    description: 'High-volume transaction processing and compliance.',
    icon: CreditCard,
    href: '/industries/fintech',
    color: 'text-brand-red',
    bgColor: 'bg-brand-red/10',
  },
  {
    title: 'Healthtech',
    description: 'Secure, HIPAA-ready billing for healthcare platforms.',
    icon: Stethoscope,
    href: '/industries/healthtech',
    color: 'text-brand-pink',
    bgColor: 'bg-brand-pink/10',
  },
  {
    title: 'E-commerce',
    description: 'Global checkout and automated tax calculation.',
    icon: ShoppingBag,
    href: '/industries/ecommerce',
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
  },
  {
    title: 'EdTech',
    description: 'Scalable subscription models for learning platforms.',
    icon: GraduationCap,
    href: '/industries/edtech',
    color: 'text-brand-pink',
    bgColor: 'bg-brand-pink/10',
  },
  {
    title: 'Marketplaces',
    description: 'Multi-party payouts and split payment orchestration.',
    icon: Store,
    href: '/industries/marketplaces',
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
  },
  {
    title: 'AI & SaaS',
    description: 'Usage-based pricing for modern software companies.',
    icon: Zap,
    href: '/industries/saas',
    color: 'text-brand-red',
    bgColor: 'bg-brand-red/10',
  },
];

export function IndustriesMegaMenu() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const bgColor = mounted && resolvedTheme === 'dark' ? '#09090b' : '#ffffff';

  return (
    <div
      className="border-border absolute top-full left-1/2 z-[100] hidden w-[600px] -translate-x-1/2 overflow-hidden rounded-[2.5rem] border p-10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 group-hover:block before:absolute before:-top-8 before:left-0 before:h-8 before:w-full before:content-[''] dark:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)] dark:ring-white/10"
      style={{ backgroundColor: bgColor, opacity: 1 }}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {industries.map((industry) => (
          <Link
            key={industry.title}
            href={industry.href}
            className="group/item hover:bg-accent/50 flex items-start gap-4 rounded-[1.5rem] p-4 transition-all duration-300"
          >
            <div
              className={`rounded-lg p-2 ${industry.bgColor} ${industry.color} transition-transform group-hover/item:scale-110`}
            >
              <industry.icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-foreground mb-1 flex items-center text-sm font-bold">
                {industry.title}
                <ArrowRight className="ml-2 h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {industry.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="border-border mt-8 flex items-center justify-between border-t pt-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-gradient shadow-primary/20 flex h-10 w-10 items-center justify-center rounded-full shadow-md">
            <span className="text-[10px] font-black text-white uppercase">
              New
            </span>
          </div>
          <div>
            <p className="text-foreground text-xs font-bold">
              Enterprise Solutions
            </p>
            <p className="text-muted-foreground text-[10px]">
              Custom billing architecture for global scale.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="text-primary hover:text-primary/80 group/sales flex items-center text-xs font-black tracking-widest uppercase transition-colors"
        >
          Talk to Sales
          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/sales:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

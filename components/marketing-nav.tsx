'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { IndustriesMegaMenu } from '@/components/industries-mega-menu';
import { useTheme } from 'next-themes';
import useSWR from 'swr';
import { User } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserActions() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-40" />;

  return (
    <div className="flex items-center gap-6">
      <Link href="/#overview">
        <Button
          variant="outline"
          size="sm"
          className="border-border hover:bg-muted rounded-full px-4 font-medium"
        >
          <Play className="mr-2 h-3 w-3 fill-current" />
          Watch Overview
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button
          size="sm"
          className="bg-brand-gradient shadow-primary/20 rounded-full border-0 px-5 font-bold text-white shadow-lg"
        >
          Start Free Trial
        </Button>
      </Link>
    </div>
  );
}

export function MarketingNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show marketing nav on dashboard routes
  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <>
      <header
        className="border-border sticky top-0 z-50 flex h-16 items-center border-b transition-all duration-300"
        style={{
          backgroundColor:
            mounted && resolvedTheme === 'dark' ? '#000000' : '#ffffff',
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <Link href="/" className="group flex items-center gap-1">
              <img
                src="/logo.svg"
                alt="Noxfolio Logo"
                className="h-9 w-9 transition-transform group-hover:scale-110"
              />
              <span className="text-foreground text-xl font-bold tracking-tighter">
                Noxfolio
              </span>
            </Link>

            <nav className="text-muted-foreground hidden items-center gap-8 text-sm font-medium lg:flex">
              <Link
                href="/features"
                className="hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <div className="group relative py-4">
                <Link
                  href="/industries"
                  className="hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  Industries
                  <svg
                    className="h-4 w-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <IndustriesMegaMenu />
              </div>
              <Link
                href="/pricing"
                className="hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/pricing-calculator"
                className="hover:text-foreground transition-colors"
              >
                Pricing Calculator
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <ThemeToggle />

            <Link href="/sign-up" className="lg:hidden">
              <Button
                size="sm"
                className="bg-brand-gradient shadow-primary/20 h-9 rounded-full border-0 px-4 text-xs font-bold text-white shadow-xl transition-all active:scale-95"
              >
                Free Trial
              </Button>
            </Link>

            <div className="hidden lg:block">
              <Suspense
                fallback={
                  <div className="bg-muted h-9 w-40 animate-pulse rounded-full" />
                }
              >
                <UserActions />
              </Suspense>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-muted/50 text-foreground hover:bg-muted rounded-xl p-2 transition-all lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`border-border fixed inset-0 top-16 z-[99999] border-t transition-transform duration-500 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          backgroundColor:
            mounted && resolvedTheme === 'dark' ? '#050510' : '#ffffff',
          opacity: 1,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
        }}
      >
        <div className="flex h-[calc(100vh-64px)] flex-col p-8">
          <div className="text-muted-foreground/50 mb-4 text-[10px] font-black tracking-[0.2em] uppercase">
            Navigation
          </div>
          <nav className="flex flex-col space-y-5">
            {[
              { label: 'Features', href: '/features' },
              { label: 'Industries', href: '/industries' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Calculator', href: '/pricing-calculator' },
              { label: 'Contact Us', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group hover:text-primary flex items-center justify-between text-2xl font-black tracking-tight transition-colors"
              >
                {item.label}
                <ArrowRight className="h-5 w-5 -translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="h-14 w-full rounded-2xl border-2 font-bold transition-all active:scale-95"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="bg-brand-gradient shadow-primary/20 h-14 w-full rounded-2xl border-0 font-bold text-white shadow-xl transition-all active:scale-95">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

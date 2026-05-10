'use client';

import React from 'react';
import Link from 'next/link';
import { useState, Suspense, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR from 'swr';
import { Footer } from '@/components/footer';
import { IndustriesMegaMenu } from '@/components/industries-mega-menu';
import { ThemeToggle } from '@/components/theme-toggle';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserActions() {
  const { data: user } = useSWR<User>('/api/user', fetcher);

  return (
    <div className="flex items-center gap-6">
      <Link
        href={user ? '/dashboard' : '/sign-in'}
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        Sign In
      </Link>
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

function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="border-border bg-background/80 sticky top-0 z-50 flex h-16 items-center border-b backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <Link href="/" className="group flex items-center gap-1">
              <img
                src="/logo.svg"
                alt="Noxfolio Logo"
                className="h-9 w-9 transition-transform group-hover:scale-110"
              />
              <span className="text-brand-gradient text-xl font-bold tracking-tighter">
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

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <div className="hidden lg:block">
              <Suspense
                fallback={
                  <div className="bg-muted h-9 w-40 animate-pulse rounded-full" />
                }
              >
                <UserActions />
              </Suspense>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-muted/50 text-foreground hover:bg-muted rounded-xl p-2 transition-all lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer - Optimized for Pro Dark/Light Themes */}
      <div
        className={`bg-background text-foreground border-border fixed inset-0 top-16 z-[100] border-t transition-transform duration-500 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-[calc(100vh-64px)] flex-col p-8">
          <div className="text-muted-foreground/50 mb-4 text-[10px] font-black tracking-[0.2em] uppercase">
            Navigation
          </div>
          <nav className="flex flex-col space-y-5">
            <Link
              href="/features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group hover:text-primary flex items-center justify-between text-2xl font-black tracking-tight transition-colors"
            >
              Features
              <ArrowRight className="h-5 w-5 -translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
            <Link
              href="/industries"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group hover:text-primary flex items-center justify-between text-2xl font-black tracking-tight transition-colors"
            >
              Industries
              <ArrowRight className="h-5 w-5 -translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group hover:text-primary flex items-center justify-between text-2xl font-black tracking-tight transition-colors"
            >
              Pricing
              <ArrowRight className="h-5 w-5 -translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
            <Link
              href="/pricing-calculator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group hover:text-primary flex items-center justify-between text-2xl font-black tracking-tight transition-colors"
            >
              Calculator
              <ArrowRight className="h-5 w-5 -translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group hover:text-primary flex items-center justify-between text-2xl font-black tracking-tight transition-colors"
            >
              Contact Us
              <ArrowRight className="h-5 w-5 -translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          </nav>

          <div className="border-border/50 mt-auto space-y-6 border-t pt-8 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Theme</span>
                <span className="text-muted-foreground text-[10px]">
                  Switch between light and dark
                </span>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex flex-col gap-3">
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
      </div>
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <section className="flex min-h-screen flex-col">
      {!isDashboardRoute && <Header />}
      <main className="flex-grow">{children}</main>
      {!isDashboardRoute && <Footer />}
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useState, Suspense, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
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

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Suspense
            fallback={
              <div className="bg-muted h-9 w-40 animate-pulse rounded-full" />
            }
          >
            <UserActions />
          </Suspense>
        </div>
      </div>
    </header>
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

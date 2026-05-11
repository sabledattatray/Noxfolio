'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  Activity,
  Shield,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Command,
  Zap,
  Puzzle,
} from 'lucide-react';
import { signOut } from '@/app/(dashboard)/actions';
import { useRouter } from 'next/navigation';

const sidebarItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/organization', icon: Users, label: 'Organization' },
  { href: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
  { href: '/dashboard/marketplace', icon: Puzzle, label: 'Marketplace' },
  { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
  { href: '/dashboard/security', icon: Shield, label: 'Security' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  return (
    <aside
      className={cn(
        'border-border bg-card relative sticky top-0 flex h-screen flex-col border-r transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-[80px]' : 'w-[280px]',
        className,
      )}
    >
      <div className="flex items-center justify-between p-6">
        {!isCollapsed && (
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-xl font-bold tracking-tight"
          >
            <img
              src="/logo.svg"
              alt="Noxfolio Logo"
              className="h-10 w-10 rounded-lg"
            />
            <span className="text-foreground">Noxfolio</span>
          </Link>
        )}
        {isCollapsed && (
          <img
            src="/logo.svg"
            alt="Noxfolio Logo"
            className="mx-auto h-10 w-10 rounded-lg"
          />
        )}
      </div>

      <div className="flex-1 space-y-2 px-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'group relative h-11 w-full justify-start gap-4 overflow-hidden rounded-xl px-4 transition-all duration-300',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-inner'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                  isCollapsed && 'justify-center px-0',
                )}
              >
                {isActive && (
                  <div className="bg-primary animate-in slide-in-from-left-full absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full duration-500" />
                )}
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-all duration-300',
                    !isActive && 'group-hover:scale-110 group-hover:rotate-3',
                    isActive && 'scale-110',
                  )}
                />
                {!isCollapsed && (
                  <span className="font-medium tracking-tight">
                    {item.label}
                  </span>
                )}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="border-border mt-auto space-y-2 border-t p-4">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={cn(
            'text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-11 w-full justify-start gap-4 rounded-xl px-4 transition-all duration-200',
            isCollapsed && 'justify-center px-0',
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Sign Out</span>}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="border-border bg-background hover:bg-accent absolute top-20 -right-3 hidden h-6 w-6 items-center justify-center rounded-full border shadow-sm lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>
    </aside>
  );
}

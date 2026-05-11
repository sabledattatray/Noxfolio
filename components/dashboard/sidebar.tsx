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
  Globe,
  ExternalLink,
  ShieldCheck,
  Server,
  UserCog,
} from 'lucide-react';
import { signOut } from '@/app/(dashboard)/actions';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Organization, User } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data: org } = useSWR<Organization>('/api/organization', fetcher);
  const { data: user } = useSWR<User & { role: string }>('/api/user', fetcher);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveRole = mounted
    ? localStorage.getItem('noxfolio_role_override') || user?.role
    : user?.role;

  const isAdmin = effectiveRole === 'admin';

  const sidebarItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { href: '/dashboard/organization', icon: Users, label: 'Organization' },
    { href: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
    { href: '/dashboard/marketplace', icon: Puzzle, label: 'Marketplace' },
    { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
    { href: '/dashboard/security', icon: Shield, label: 'Security' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  // Admin-only Items
  const adminItems = [
    { href: '/dashboard/admin/users', icon: UserCog, label: 'Platform Users' },
    {
      href: '/dashboard/admin/infrastructure',
      icon: Server,
      label: 'Global Infrastructure',
    },
  ];

  async function handleSignOut() {
    localStorage.removeItem('noxfolio_role_override');
    await signOut();
    router.refresh();
    router.push('/sign-in');
  }

  return (
    <aside
      className={cn(
        'border-border bg-card relative sticky top-0 flex h-screen flex-col rounded-none border-r transition-all duration-300 ease-in-out',
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
              className="h-10 w-10 rounded-none"
            />
            <span className="text-foreground">Noxfolio</span>
          </Link>
        )}
        {isCollapsed && (
          <img
            src="/logo.svg"
            alt="Noxfolio Logo"
            className="mx-auto h-10 w-10 rounded-none"
          />
        )}
      </div>

      <div className="flex-1 space-y-8 overflow-x-hidden overflow-y-auto px-4 py-2">
        {/* Regular Menu */}
        <div className="space-y-1">
          <p
            className={cn(
              'text-muted-foreground/60 mb-4 px-4 text-[10px] font-black tracking-widest uppercase',
              isCollapsed && 'px-0 text-center',
            )}
          >
            Menu
          </p>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'group relative h-11 w-full justify-start gap-4 overflow-hidden rounded-none px-4 transition-all duration-300',
                    isActive
                      ? 'bg-primary/10 text-primary shadow-inner'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                    isCollapsed && 'justify-center px-0',
                  )}
                >
                  {isActive && (
                    <div className="bg-primary animate-in slide-in-from-left-full absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-none duration-500" />
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

        {/* Admin Console (Conditional) */}
        {isAdmin && (
          <div className="animate-in fade-in slide-in-from-left-4 space-y-1 duration-500">
            <p
              className={cn(
                'text-primary mb-4 px-4 text-[10px] font-black tracking-widest uppercase',
                isCollapsed && 'px-0 text-center',
              )}
            >
              Admin Console
            </p>
            {adminItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'group relative h-11 w-full justify-start gap-4 overflow-hidden rounded-none px-4 transition-all duration-300',
                      isActive
                        ? 'bg-primary/10 text-primary shadow-inner'
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/5',
                      isCollapsed && 'justify-center px-0',
                    )}
                  >
                    {isActive && (
                      <div className="bg-primary animate-in slide-in-from-left-full absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-none duration-500" />
                    )}
                    <item.icon
                      className={cn(
                        'text-primary h-5 w-5 transition-all duration-300',
                        !isActive && 'group-hover:scale-110',
                        isActive && 'scale-110',
                      )}
                    />
                    {!isCollapsed && (
                      <span className="text-xs font-black tracking-tight uppercase">
                        {item.label}
                      </span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Linked Website Section */}
      {!isCollapsed && org?.website && (
        <div className="bg-primary/5 border-primary/10 group hover:bg-primary/10 mx-4 mb-4 rounded-none border p-4 transition-colors">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-primary/60 text-[9px] font-black tracking-widest uppercase">
              Linked Site
            </span>
            <div className="h-1.5 w-1.5 animate-pulse rounded-none bg-emerald-500" />
          </div>
          <a
            href={
              org.website.startsWith('http')
                ? org.website
                : `https://${org.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary flex items-center justify-between gap-2 truncate text-xs font-bold transition-colors"
          >
            {org.website.replace(/^https?:\/\//, '')}
            <ExternalLink className="h-3 w-3 shrink-0 opacity-40" />
          </a>
        </div>
      )}

      <div className="border-border mt-auto space-y-2 border-t p-4">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={cn(
            'text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-11 w-full justify-start gap-4 rounded-none px-4 transition-all duration-200',
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
          className="border-border bg-background hover:bg-accent absolute top-20 -right-3 hidden h-6 w-6 items-center justify-center rounded-none border shadow-sm lg:flex"
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

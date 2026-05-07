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
import { signOut } from '@/app/(login)/actions';
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
        'relative flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out h-screen sticky top-0',
        isCollapsed ? 'w-[80px]' : 'w-[280px]',
        className
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <Shield className="w-5 h-5" />
            </div>
            <span>BillForge</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 mx-auto">
            <Shield className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex-1 px-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-4 h-11 px-4 rounded-xl transition-all duration-300 group relative overflow-hidden',
                  isActive 
                    ? 'bg-primary/10 text-primary shadow-inner' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                  isCollapsed && 'justify-center px-0'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full animate-in slide-in-from-left-full duration-500" />
                )}
                <item.icon className={cn(
                  'w-5 h-5 transition-all duration-300',
                  !isActive && 'group-hover:scale-110 group-hover:rotate-3',
                  isActive && 'scale-110'
                )} />
                {!isCollapsed && <span className="font-medium tracking-tight">{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border mt-auto space-y-2">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={cn(
            'w-full justify-start gap-4 h-11 px-4 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200',
            isCollapsed && 'justify-center px-0'
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Sign Out</span>}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-border bg-background shadow-sm hover:bg-accent hidden lg:flex items-center justify-center"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </Button>
      </div>
    </aside>
  );
}

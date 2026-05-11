'use client';

import { useState, useEffect } from 'react';

import {
  Search,
  Bell,
  Command,
  Settings,
  LogOut,
  User,
  Shield,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { signOut } from '@/app/(dashboard)/actions';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { User as DBUser } from '@/lib/db/schema';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Topbar() {
  const { data: user } = useSWR<DBUser>('/api/user', fetcher);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [effectiveRole, setEffectiveRole] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setEffectiveRole(
        localStorage.getItem('noxfolio_role_override') || user.role,
      );
    }
  }, [user]);

  async function handleSignOut() {
    localStorage.removeItem('noxfolio_role_override');
    await signOut();
    router.refresh();
    router.push('/sign-in');
  }

  return (
    <header className="border-border bg-card/50 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-8 backdrop-blur-xl">
      <div className="flex max-w-xl flex-1 items-center gap-4">
        <div className="group relative w-full">
          <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
          <Input
            placeholder="Search anything... (⌘K)"
            className="bg-accent/50 focus-visible:bg-background h-10 rounded-xl border-transparent pr-12 pl-10 transition-all duration-200"
          />
          <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1">
            <kbd className="bg-muted pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {mounted ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground relative rounded-xl"
              >
                <Bell className="h-5 w-5" />
                <span className="bg-primary border-card absolute top-2.5 right-2.5 h-2 w-2 rounded-full border-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-border/50 bg-card/80 w-80 rounded-2xl p-2 backdrop-blur-xl"
            >
              <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-bold tracking-wider uppercase">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 py-8 text-center">
                <Bell className="text-muted-foreground/20 mx-auto h-8 w-8" />
                <p className="text-muted-foreground text-sm">
                  No new notifications
                </p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground relative rounded-xl"
          >
            <Bell className="h-5 w-5" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'rounded-xl transition-all duration-300',
            effectiveRole === 'admin'
              ? 'text-primary bg-primary/5 shadow-inner'
              : 'text-muted-foreground hover:text-foreground',
          )}
          onClick={() => {
            const currentRole =
              localStorage.getItem('noxfolio_role_override') ||
              user?.role ||
              'member';
            const nextRole = currentRole === 'admin' ? 'member' : 'admin';
            localStorage.setItem('noxfolio_role_override', nextRole);
            window.location.reload();
          }}
          title="Toggle Admin/User Simulation"
        >
          <Shield
            className={cn(
              'h-5 w-5',
              effectiveRole === 'admin' && 'animate-pulse',
            )}
          />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground rounded-xl"
          asChild
        >
          <Link href="/dashboard/settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>

        <div className="bg-border mx-1 h-6 w-px" />

        <ThemeToggle />

        {mounted ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-accent/50 flex h-10 items-center gap-2 rounded-xl py-1 pr-3 pl-1"
              >
                <Avatar className="h-8 w-8 rounded-lg shadow-inner">
                  <AvatarImage src={user?.image || ''} />
                  <AvatarFallback className="from-primary to-primary/60 text-primary-foreground bg-gradient-to-tr text-xs font-bold uppercase">
                    {user?.name?.substring(0, 2) ||
                      user?.email?.substring(0, 2) ||
                      'JD'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left text-xs">
                  <span className="text-foreground max-w-[100px] truncate font-semibold">
                    {user?.name || user?.email?.split('@')[0] || 'John Doe'}
                  </span>
                  <span className="text-muted-foreground capitalize">
                    {effectiveRole || 'Member'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-border/50 bg-card/80 w-56 rounded-2xl p-2 backdrop-blur-xl"
            >
              <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-bold tracking-wider uppercase">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer rounded-xl py-2"
                asChild
              >
                <Link
                  href="/dashboard/settings"
                  className="flex w-full items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-xl py-2"
                asChild
              >
                <Link
                  href="/dashboard/organization"
                  className="flex w-full items-center"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Organization</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-xl py-2"
                asChild
              >
                <Link
                  href="/dashboard/billing"
                  className="flex w-full items-center"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer rounded-xl py-2"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="bg-accent h-10 w-10 animate-pulse rounded-xl" />
        )}
      </div>
    </header>
  );
}

'use client';
 
import { useState, useEffect } from 'react';

import { Search, Bell, Command, Settings, LogOut, User, Shield, CreditCard } from 'lucide-react';
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
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { User as DBUser } from '@/lib/db/schema';
import { ThemeToggle } from '@/components/theme-toggle';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Topbar() {
  const { data: user } = useSWR<DBUser>('/api/user', fetcher);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input 
            placeholder="Search anything... (⌘K)" 
            className="pl-10 pr-12 h-10 bg-accent/50 border-transparent focus-visible:bg-background transition-all duration-200 rounded-xl"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {mounted ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-xl text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-card" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl border-border/50 backdrop-blur-xl bg-card/80">
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-8 text-center space-y-2">
                <Bell className="w-8 h-8 text-muted-foreground/20 mx-auto" />
                <p className="text-sm text-muted-foreground">No new notifications</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" size="icon" className="relative rounded-xl text-muted-foreground">
            <Bell className="w-5 h-5" />
          </Button>
        )}

        <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground hover:text-foreground" asChild>
          <Link href="/dashboard/settings">
            <Settings className="w-5 h-5" />
          </Link>
        </Button>



        {mounted ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="pl-1 pr-3 py-1 h-10 rounded-xl hover:bg-accent/50 flex items-center gap-2">
                <Avatar className="w-8 h-8 rounded-lg shadow-inner">
                  <AvatarImage src={user?.image || ''} />
                  <AvatarFallback className="bg-gradient-to-tr from-primary to-primary/60 text-primary-foreground font-bold text-xs uppercase">
                    {user?.name?.substring(0, 2) || user?.email?.substring(0, 2) || 'JD'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-xs text-left">
                  <span className="font-semibold text-foreground truncate max-w-[100px]">
                    {user?.name || user?.email?.split('@')[0] || 'John Doe'}
                  </span>
                  <span className="text-muted-foreground capitalize">{user?.role || 'Admin'}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-border/50 backdrop-blur-xl bg-card/80">
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-xl cursor-pointer py-2" asChild>
                <Link href="/dashboard/settings" className="flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer py-2" asChild>
                <Link href="/dashboard/organization" className="flex w-full items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Organization</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer py-2" asChild>
                <Link href="/dashboard/billing" className="flex w-full items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="rounded-xl cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-accent animate-pulse" />
        )}
      </div>
    </header>
  );
}

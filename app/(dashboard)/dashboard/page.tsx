'use client';

import useSWR from 'swr';
import { User } from '@/lib/db/schema';
import { DashboardAdmin } from '@/components/dashboard/admin-view';
import { DashboardUser } from '@/components/dashboard/user-view';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { data: user, error, isLoading } = useSWR<User & { isVerified?: boolean }>('/api/user', fetcher);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-bold">Failed to load dashboard</h2>
        <p className="text-muted-foreground">Please try refreshing the page or signing in again.</p>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>
    );
  }

  // Security check: Email verification
  const isVerified = user.emailVerifiedAt !== null;

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-[600px] p-4">
        <Card className="w-full max-w-md bg-card border-border/50 shadow-2xl rounded-[32px] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />
          <CardContent className="pt-12 pb-8 px-8 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
              <Mail className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black italic tracking-tight">Verify your email</h2>
              <p className="text-muted-foreground font-medium">
                We've sent a verification link to <span className="text-foreground font-bold">{user.email}</span>. Please verify your account to access the dashboard.
              </p>
            </div>
            <div className="w-full pt-4 space-y-3">
              <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20">
                Resend Verification Link
              </Button>
              <Button variant="ghost" className="w-full h-12 rounded-xl font-bold text-muted-foreground hover:text-foreground">
                Change Email Address
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Branching based on role
  if (user.role === 'admin') {
    return <DashboardAdmin />;
  }

  return <DashboardUser user={user} />;
}

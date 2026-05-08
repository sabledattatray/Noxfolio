'use client';

import useSWR from 'swr';
import { User } from '@/lib/db/schema';
import { DashboardAdmin } from '@/components/dashboard/admin-view';
import { DashboardUser } from '@/components/dashboard/user-view';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { resendVerificationAction, verifyOTP, signOut } from '@/app/(login)/actions';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { data: user, error, isLoading, mutate } = useSWR<User & { isVerified?: boolean }>('/api/user', fetcher);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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

  async function handleVerify() {
    if (otp.length !== 6) return;
    setIsVerifying(true);
    const formData = new FormData();
    formData.append('email', user!.email);
    formData.append('otp', otp);
    
    const result = await verifyOTP({}, formData);
    if (result && 'success' in result && result.success) {
      mutate();
    } else {
      setMessage({ type: 'error', text: (result as any)?.error || 'Invalid OTP' });
    }
    setIsVerifying(false);
  }

  async function handleResend() {
    const formData = new FormData();
    formData.append('email', user!.email);
    const result = await resendVerificationAction({}, formData);
    if (result && 'success' in result && result.success) {
      setMessage({ type: 'success', text: result.success as string });
    } else {
      setMessage({ type: 'error', text: (result as any)?.error || 'Failed to resend' });
    }
  }

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

            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-12 text-center text-2xl tracking-[0.5em] font-bold rounded-xl"
                />
                <p className="text-[10px] text-muted-foreground font-bold">
                  Check server logs for your verification code
                </p>
              </div>

              {message && (
                <p className={`text-sm font-bold ${message.type === 'error' ? 'text-destructive' : 'text-emerald-500'}`}>
                  {message.text}
                </p>
              )}

              <Button 
                onClick={handleVerify}
                disabled={isVerifying || otp.length !== 6}
                className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
              >
                {isVerifying ? 'Verifying...' : 'Verify Account'}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleResend}
                  className="h-11 rounded-xl font-bold"
                >
                  Resend Code
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                  className="h-11 rounded-xl font-bold text-muted-foreground"
                >
                  Sign Out
                </Button>
              </div>
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

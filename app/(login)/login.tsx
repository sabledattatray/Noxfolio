'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Loader2, Github, Mail, Lock, ArrowLeft } from 'lucide-react';
import { signIn, signUp, googleSignInAction } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
    <div className="min-h-screen flex items-center justify-center p-4 bg-background overflow-hidden relative">
      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group z-20"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[440px] space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20 mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'signin' 
              ? 'Enter your credentials to access your dashboard' 
              : 'Join the next generation of SaaS billing management'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-11 rounded-xl border-border/50 hover:bg-accent/50 transition-all">
              <a href="/api/auth/github">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <div className="h-11 overflow-hidden rounded-xl border border-border/50 transition-all">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (credentialResponse.credential) {
                    const result = await googleSignInAction(credentialResponse.credential, redirect || '/dashboard');
                    if (result && 'success' in result && result.success) {
                      window.location.href = redirect || '/dashboard';
                    }
                  }
                }}
                onError={() => {
                  console.error('Google Login Failed');
                }}
                useOneTap
                theme="outline"
                shape="rectangular"
                width="100%"
                text="continue_with"
              />
            </div>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-bold tracking-widest">or continue with email</span>
            </div>
          </div>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="redirect" value={redirect || ''} />
            <input type="hidden" name="priceId" value={priceId || ''} />
            <input type="hidden" name="inviteId" value={inviteId || ''} />
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  defaultValue={state.email}
                  required
                  className="h-11 pl-10 rounded-xl border-border/50 bg-accent/20 focus-visible:bg-background transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode === 'signin' && (
                  <Link href="#" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  defaultValue={state.password}
                  required
                  className="h-11 pl-10 rounded-xl border-border/50 bg-accent/20 focus-visible:bg-background transition-all"
                />
              </div>
            </div>

            {state?.error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
                {state.error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 rounded-xl shadow-lg shadow-primary/20 font-bold"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Please wait...
                </>
              ) : mode === 'signin' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
              redirect ? `?redirect=${redirect}` : ''
            }${priceId ? `&priceId=${priceId}` : ''}`}
            className="font-bold text-primary hover:underline"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
}

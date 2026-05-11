'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Shield,
  Loader2,
  Mail,
  Lock,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  Zap,
  Layout,
  Globe,
  Activity,
  Database,
  Check,
} from 'lucide-react';
import { signIn, signUp, googleSignInAction, verifyOTP } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from '@react-oauth/google';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      onScriptLoadError={() =>
        console.error('Google Sign-In Script failed to load')
      }
    >
      <LoginContent mode={mode} />
    </GoogleOAuthProvider>
  );
}

function LoginContent({ mode }: { mode: 'signin' | 'signup' }) {
  // Clear simulation overrides on new login to prevent role leakage between accounts
  useEffect(() => {
    localStorage.removeItem('noxfolio_role_override');
  }, []);

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' },
  );

  const [otpState, otpAction, otpPending] = useActionState<
    ActionState,
    FormData
  >(verifyOTP, { error: '' });

  const isOTPMode = state?.requiresOTP || otpState?.error;
  const userEmail = state?.email;

  // Automatic One Tap is disabled temporarily to resolve persistent FedCM NetworkErrors
  // on localhost. Use the manual Google button below for a stable login experience.
  /*
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      if (credentialResponse.credential) {
        const result = await googleSignInAction(
          credentialResponse.credential,
          redirect || '/dashboard',
        );
        if (result && result.success) {
          window.location.href = redirect || '/dashboard';
        }
      }
    },
    onError: () => console.log('One Tap Login Failed'),
    use_fedcm_for_prompt: false,
  });
  */

  return (
    <div className="bg-background flex min-h-[calc(100vh-64px)] flex-col md:flex-row">
      {/* Left Column: Branding & Features (Visible on Desktop) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-white/5 bg-[#050505] p-12 text-white lg:flex">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 -z-10 h-full w-full">
          <div className="bg-primary/20 absolute top-[-10%] left-[-10%] h-[60%] w-[60%] animate-pulse rounded-full blur-[150px]" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="relative z-10">
          <div className="max-w-lg space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl leading-[1.1] font-black tracking-tight md:text-5xl">
                AI Workforce for <br />
                <span className="text-primary">Sales and Marketing</span>
              </h1>
              <p className="text-lg font-medium text-zinc-400">
                The sovereign financial stack for modern software companies.
                Engineered for high-performance revenue management.
              </p>
            </div>

            <div className="space-y-6">
              <BenefitItem
                icon={Zap}
                title="Intelligent AI agents"
                desc="Handle customer interactions 24/7 across all channels."
              />
              <BenefitItem
                icon={Layout}
                title="No-code workflow builder"
                desc="Automate any business process with drag-and-drop ease."
              />
              <BenefitItem
                icon={Globe}
                title="Multi-channel campaigns"
                desc="WhatsApp, Email, SMS & Voice reach with smart orchestration."
              />
              <BenefitItem
                icon={Activity}
                title="Real-time analytics"
                desc="Deep insights into every transaction and customer touchpoint."
              />
              <BenefitItem
                icon={Database}
                title="Smart CRM"
                desc="A system that thinks, talks and acts on your behalf."
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-12">
          <p className="mb-8 text-xs font-black tracking-[0.2em] text-zinc-500 uppercase">
            Trusted by leading businesses worldwide
          </p>
          <div className="flex flex-wrap items-center gap-8 opacity-40 grayscale transition-all duration-700 group-hover:grayscale-0">
            <span className="text-xl font-black tracking-tighter">FORGE</span>
            <span className="decoration-primary text-xl font-black tracking-tighter underline">
              BILL
            </span>
            <span className="text-xl font-black tracking-tighter">STACK</span>
            <span className="text-xl font-black tracking-tighter">CLOUD</span>
            <span className="text-xl font-black tracking-tighter">VERTEX</span>
            <span className="text-xl font-black tracking-tighter">NEXUS</span>
          </div>
        </div>
      </div>

      {/* Right Column: Form Section */}
      <div className="bg-background relative flex flex-1 items-center justify-center overflow-y-auto p-8 md:p-12 lg:p-24">
        {/* Back to Home Mobile */}
        <Link
          href="/"
          className="text-muted-foreground hover:text-primary group absolute top-8 left-8 z-20 flex items-center text-sm font-medium transition-colors lg:hidden"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>

        <div className="w-full max-w-[480px] space-y-6 py-4">
          <div className="space-y-2">
            <h2 className="text-foreground text-3xl font-black tracking-tight">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-muted-foreground text-sm font-medium">
              {mode === 'signup'
                ? 'Start automating your business in minutes'
                : 'Enter your credentials to access your dashboard'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border-border bg-card hover:bg-accent/50 group relative flex h-12 cursor-pointer items-center justify-center rounded-2xl border transition-all">
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                  <GoogleLogin
                    use_fedcm_for_prompt={false}
                    onSuccess={async (credentialResponse) => {
                      if (credentialResponse.credential) {
                        const result = await googleSignInAction(
                          credentialResponse.credential,
                          redirect || '/dashboard',
                        );
                        if (result && result.success) {
                          window.location.href = redirect || '/dashboard';
                        }
                      }
                    }}
                    onError={() => console.log('Login Failed')}
                    theme="outline"
                    shape="pill"
                    width="200"
                  />
                </div>
                <div className="pointer-events-none flex items-center gap-2 text-xs font-bold">
                  <img
                    src="https://www.google.com/favicon.ico"
                    className="h-3 w-3 grayscale transition-all group-hover:grayscale-0"
                    alt="Google"
                  />
                  Google
                </div>
              </div>
              <div className="border-border bg-card hover:bg-accent/50 group relative flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border transition-all">
                <div className="flex items-center gap-2 text-xs font-bold transition-all group-hover:scale-105">
                  <img
                    src="https://github.githubassets.com/favicons/favicon.svg"
                    className="h-4 w-4 grayscale transition-all group-hover:grayscale-0"
                    alt="GitHub"
                  />
                  GitHub
                </div>
              </div>
            </div>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="border-border w-full border-t" />
              </div>
              <div className="text-muted-foreground/60 relative flex justify-center text-[8px] font-black tracking-[0.2em] uppercase">
                <span className="bg-background px-4">
                  Or continue with email
                </span>
              </div>
            </div>

            {isOTPMode ? (
              <form action={otpAction} className="space-y-4">
                <input type="hidden" name="email" value={userEmail || ''} />
                <div className="space-y-2 text-center">
                  <Label className="text-primary text-[10px] font-black tracking-widest uppercase">
                    Verification Required
                  </Label>
                  <p className="text-muted-foreground text-xs">
                    We sent a code to{' '}
                    <span className="text-foreground font-bold">
                      {userEmail}
                    </span>
                  </p>
                  <div className="group relative mx-auto max-w-[240px]">
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      placeholder="000000"
                      required
                      maxLength={6}
                      className="border-border bg-muted/50 focus-visible:bg-background focus-visible:ring-primary h-14 rounded-2xl text-center text-3xl font-black tracking-[0.5em] transition-all"
                    />
                  </div>
                </div>

                {otpState?.error && <ErrorMessage message={otpState.error} />}

                <Button
                  type="submit"
                  disabled={otpPending}
                  className="bg-primary shadow-primary/20 h-12 w-full rounded-2xl text-base font-black text-white shadow-xl transition-all active:scale-95"
                >
                  {otpPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Verify Account'
                  )}
                </Button>
              </form>
            ) : (
              <form action={formAction} className="space-y-4">
                <input type="hidden" name="redirect" value={redirect || ''} />
                <input type="hidden" name="priceId" value={priceId || ''} />
                <input type="hidden" name="inviteId" value={inviteId || ''} />

                <div className="grid gap-3">
                  {mode === 'signup' && (
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-xs font-bold">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        className="border-border bg-muted/30 focus-visible:bg-background h-12 rounded-2xl transition-all"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs font-bold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      required
                      className="border-border bg-muted/30 focus-visible:bg-background h-12 rounded-2xl transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-xs font-bold">
                        Password *
                      </Label>
                      {mode === 'signin' && (
                        <Link
                          href="#"
                          className="text-primary text-[10px] font-bold hover:underline"
                        >
                          Forgot?
                        </Link>
                      )}
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password (min. 8 characters)"
                      required
                      className="border-border bg-muted/30 focus-visible:bg-background h-12 rounded-2xl transition-all"
                    />
                  </div>

                  {mode === 'signup' && (
                    <div className="space-y-1">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-xs font-bold"
                      >
                        Confirm Password *
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        required
                        className="border-border bg-muted/30 focus-visible:bg-background h-12 rounded-2xl transition-all"
                      />
                    </div>
                  )}
                </div>

                {state?.error && <ErrorMessage message={state.error} />}

                <Button
                  type="submit"
                  disabled={pending}
                  className="bg-primary shadow-primary/20 h-14 w-full rounded-2xl text-lg font-black text-white shadow-xl transition-all active:scale-95"
                >
                  {pending ? (
                    <Loader2 className="animate-spin" />
                  ) : mode === 'signin' ? (
                    'Sign In'
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            )}
          </div>

          <p className="text-muted-foreground text-center text-sm font-bold">
            {mode === 'signin'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <Link
              href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}`}
              className="text-primary hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="group flex items-start gap-4">
      <div className="text-primary group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="mb-1 text-sm font-bold text-white">{title}</h4>
        <p className="text-xs leading-relaxed font-medium text-zinc-500">
          {desc}
        </p>
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-destructive/10 border-destructive/20 text-destructive animate-in fade-in slide-in-from-top-1 rounded-2xl border p-4 text-xs font-bold">
      {message}
    </div>
  );
}

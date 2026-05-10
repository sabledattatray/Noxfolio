'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Globe,
  Users,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronDown,
  CheckCircle2,
  Rocket,
  Phone,
  ShieldEllipsis,
  Mail,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import {
  sendPhoneOTPAction,
  sendEmailOTPAction,
  verifyOTPAction,
  completeOnboardingAction,
} from '../actions';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState('');
  const [size, setSize] = useState('Select size');
  const [industry, setIndustry] = useState('Select industry');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<
    'phone' | 'email'
  >('phone');
  const router = useRouter();

  const { data: user } = useSWR('/api/user', fetcher);

  useEffect(() => {
    if (user?.organization?.website) {
      router.push('/dashboard');
    }
  }, [user, router]);

  async function handleSendOTP() {
    setError('');
    setSuccess('');

    if (verificationMethod === 'phone' && phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setOtpSent(true);
    try {
      const result =
        verificationMethod === 'phone'
          ? await sendPhoneOTPAction({ phoneNumber })
          : await sendEmailOTPAction({});

      if ('error' in result) {
        setError(result.error);
        setOtpSent(false);
      } else {
        setSuccess((result as any).success || 'Verification code sent!');
      }
    } catch (err: any) {
      setError('Failed to send code. Please try again.');
      setOtpSent(false);
    }
  }

  async function handleVerifyOTP() {
    if (otp.length !== 6) return;
    setIsVerifying(true);
    setError('');
    setSuccess('');
    try {
      const result = await verifyOTPAction({ otp });
      if ('error' in result) {
        setError(result.error);
      } else {
        setOtpVerified(true);
        setSuccess(
          (result as any).success || 'Identity verified successfully!',
        );
      }
    } catch (err: any) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleComplete() {
    setIsSubmitting(true);
    setError('');
    try {
      const result = await completeOnboardingAction({
        website,
        size,
        industry,
      });

      if ('error' in result) {
        setError(result.error);
        setIsSubmitting(false);
      } else {
        setSuccess('Everything is ready! Launching your dashboard...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      }
    } catch (error: any) {
      setError('Failed to complete onboarding: ' + error.message);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background text-foreground relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden py-20 transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="bg-primary/5 absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {isSubmitting && (
        <div className="bg-background/80 animate-in fade-in fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md duration-500">
          <div className="relative mb-8">
            <div className="border-primary/20 border-t-primary h-24 w-24 animate-spin rounded-full border-4 shadow-[0_0_40px_rgba(var(--primary),0.3)]" />
            <Rocket className="text-primary absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <h2 className="animate-pulse text-2xl font-black tracking-tight italic">
            Powering up your workspace...
          </h2>
          <p className="text-muted-foreground mt-2 font-medium">
            Building your revenue infrastructure in the cloud.
          </p>
        </div>
      )}

      <div className="animate-in fade-in zoom-in-95 w-full max-w-[580px] space-y-8 duration-500">
        {/* Progress Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary shadow-primary/20 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white shadow-lg">
              {step}
            </div>
            <span className="text-muted-foreground text-sm font-black tracking-widest uppercase">
              Step {step} of 2
            </span>
          </div>
          <div className="bg-muted relative h-1.5 w-32 overflow-hidden rounded-full">
            <div
              className="bg-primary absolute top-0 left-0 h-full transition-all duration-700 ease-out"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-card border-border relative overflow-hidden rounded-[3rem] shadow-2xl">
          <div className="from-primary to-primary absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r via-blue-500" />

          <CardContent className="space-y-10 p-10 md:p-14">
            {step === 1 ? (
              <div className="animate-in fade-in slide-in-from-left-4 space-y-10 duration-500">
                <div className="space-y-4 text-center">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black tracking-widest text-emerald-500 uppercase">
                    <Zap className="h-3 w-3" />
                    Free trial • 3 days • 50 credits left
                  </div>
                  <h1 className="text-foreground text-3xl font-black tracking-tighter md:text-4xl">
                    Welcome to Noxfolio!
                  </h1>
                  <p className="text-muted-foreground font-medium">
                    Let's set up your organization to get started
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="website"
                      className="text-foreground flex items-center gap-2 text-sm font-bold"
                    >
                      <Globe className="text-primary h-4 w-4" />
                      Company Website URL *
                    </Label>
                    <Input
                      id="website"
                      placeholder="e.g., yourcompany.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="border-border bg-muted/30 focus-visible:bg-background text-foreground h-14 rounded-2xl pl-6 transition-all"
                    />
                    <p className="text-muted-foreground pl-2 text-[10px] font-medium">
                      Enter your company website to auto-generate organization
                      name
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Label className="text-foreground flex items-center gap-2 text-sm font-bold">
                        <ShieldEllipsis className="text-primary h-4 w-4" />
                        Identity Verification *
                      </Label>
                      <div className="bg-muted flex rounded-xl p-1">
                        <button
                          onClick={() => {
                            setVerificationMethod('phone');
                            setOtpSent(false);
                            setOtp('');
                          }}
                          disabled={otpVerified}
                          className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase transition-all ${verificationMethod === 'phone' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          Phone
                        </button>
                        <button
                          onClick={() => {
                            setVerificationMethod('email');
                            setOtpSent(false);
                            setOtp('');
                          }}
                          disabled={otpVerified}
                          className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase transition-all ${verificationMethod === 'email' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          Email
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {verificationMethod === 'phone' ? (
                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <span className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2 text-sm font-bold">
                              +91
                            </span>
                            <Input
                              id="phone"
                              placeholder="10-digit mobile"
                              value={phoneNumber}
                              onChange={(e) =>
                                setPhoneNumber(
                                  e.target.value
                                    .replace(/\D/g, '')
                                    .slice(0, 10),
                                )
                              }
                              className="border-border bg-muted/30 focus-visible:bg-background text-foreground h-14 rounded-2xl pl-14 transition-all"
                              disabled={otpVerified}
                            />
                          </div>
                          {!otpVerified && (
                            <Button
                              variant="outline"
                              className="border-primary/20 text-primary hover:bg-primary/10 h-14 rounded-2xl px-6 font-bold"
                              onClick={handleSendOTP}
                              disabled={
                                phoneNumber.length !== 10 || (otpSent && !error)
                              }
                            >
                              {otpSent && !error ? 'Resend' : 'Send Code'}
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <div className="bg-muted/30 border-border relative flex h-14 flex-1 items-center rounded-2xl border px-6 transition-all">
                            <Mail className="text-muted-foreground mr-3 h-4 w-4" />
                            <span className="text-foreground text-sm font-bold opacity-70">
                              {user?.email || 'Loading email...'}
                            </span>
                          </div>
                          {!otpVerified && (
                            <Button
                              variant="outline"
                              className="border-primary/20 text-primary hover:bg-primary/10 h-14 rounded-2xl px-6 font-bold"
                              onClick={handleSendOTP}
                              disabled={otpSent && !error}
                            >
                              {otpSent && !error ? 'Resend' : 'Send Code'}
                            </Button>
                          )}
                        </div>
                      )}

                      {otpSent && !otpVerified && (
                        <div className="animate-in fade-in slide-in-from-top-2 space-y-3 duration-300">
                          <div className="flex gap-3">
                            <Input
                              placeholder="6-digit code"
                              value={otp}
                              onChange={(e) =>
                                setOtp(
                                  e.target.value.replace(/\D/g, '').slice(0, 6),
                                )
                              }
                              className="border-primary/30 bg-primary/5 focus-visible:bg-background text-foreground h-14 rounded-2xl text-center text-lg font-black tracking-[0.5em] transition-all"
                            />
                            <Button
                              className="h-14 rounded-2xl bg-emerald-500 px-8 font-black text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600"
                              onClick={handleVerifyOTP}
                              disabled={otp.length !== 6 || isVerifying}
                            >
                              {isVerifying ? '...' : 'Verify'}
                            </Button>
                          </div>
                          <p className="text-muted-foreground pl-2 text-[10px] font-medium italic">
                            {verificationMethod === 'phone'
                              ? 'Check your terminal/console for the SMS code.'
                              : `Check your inbox at ${user?.email || 'your email'} for the code.`}
                          </p>
                        </div>
                      )}

                      {otpVerified && (
                        <div className="animate-in zoom-in-95 flex items-center gap-2 rounded-2xl bg-emerald-500/10 p-4 text-emerald-500 duration-300">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="text-xs font-black tracking-wider uppercase">
                            Identity Verified via {verificationMethod}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label className="text-foreground flex items-center gap-2 text-sm font-bold">
                        <Users className="text-primary h-4 w-4" />
                        Company Size *
                      </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-border bg-muted/30 focus:bg-muted/30 active:bg-muted/30 h-14 w-full justify-between rounded-2xl px-6 text-sm font-medium focus:ring-0"
                          >
                            <span
                              className={
                                size === 'Select size'
                                  ? 'text-muted-foreground'
                                  : 'text-foreground'
                              }
                            >
                              {size}
                            </span>
                            <ChevronDown className="text-muted-foreground h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuContent
                            className="border-border w-[240px] rounded-2xl border-2 !bg-[#0a0a0a] !opacity-100 shadow-2xl"
                            sideOffset={12}
                            align="start"
                          >
                            {[
                              '1-10',
                              '11-50',
                              '51-200',
                              '201-1000',
                              '1000+',
                            ].map((s) => (
                              <DropdownMenuItem
                                key={s}
                                onClick={() => setSize(`${s} employees`)}
                                className="cursor-pointer rounded-xl text-white hover:!bg-zinc-800 focus:!bg-zinc-800"
                              >
                                {s} employees
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenuPortal>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-foreground flex items-center gap-2 text-sm font-bold">
                        <Briefcase className="text-primary h-4 w-4" />
                        Industry *
                      </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-border bg-muted/30 focus:bg-muted/30 active:bg-muted/30 h-14 w-full justify-between rounded-2xl px-6 text-sm font-medium focus:ring-0"
                          >
                            <span
                              className={
                                industry === 'Select industry'
                                  ? 'text-muted-foreground'
                                  : 'text-foreground'
                              }
                            >
                              {industry}
                            </span>
                            <ChevronDown className="text-muted-foreground h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuContent
                            className="border-border w-[240px] rounded-2xl border-2 !bg-[#0a0a0a] !opacity-100 shadow-2xl"
                            sideOffset={12}
                            align="start"
                          >
                            {[
                              'SaaS / Software',
                              'Fintech',
                              'E-commerce',
                              'Healthcare',
                              'Agency',
                              'Other',
                            ].map((i) => (
                              <DropdownMenuItem
                                key={i}
                                onClick={() => setIndustry(i)}
                                className="cursor-pointer rounded-xl text-white hover:!bg-zinc-800 focus:!bg-zinc-800"
                              >
                                {i}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenuPortal>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="border-border/50 flex flex-col gap-4 border-t pt-6">
                  {error && (
                    <p className="text-destructive bg-destructive/10 border-destructive/20 animate-in fade-in slide-in-from-top-2 rounded-xl border p-3 text-center text-xs font-bold">
                      {error}
                    </p>
                  )}
                  {success && !otpVerified && (
                    <p className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-xs font-bold text-emerald-500">
                      {success}
                    </p>
                  )}
                  <div className="flex gap-4">
                    <Button
                      variant="ghost"
                      className="text-muted-foreground h-14 rounded-2xl px-8 font-bold"
                      onClick={() => router.back()}
                    >
                      Back
                    </Button>
                    <Button
                      variant="default"
                      className="bg-brand-gradient shadow-primary/20 group h-14 flex-1 rounded-2xl text-lg font-black text-white shadow-xl transition-all active:scale-95"
                      onClick={() => {
                        if (!otpVerified) {
                          setError(
                            `Please verify your ${verificationMethod === 'phone' ? 'phone number' : 'email'} first`,
                          );
                          return;
                        }
                        if (!website) {
                          setError('Please enter your company website');
                          return;
                        }
                        if (size === 'Select size') {
                          setError('Please select your company size');
                          return;
                        }
                        if (industry === 'Select industry') {
                          setError('Please select your industry');
                          return;
                        }

                        setError('');
                        setStep(2);
                      }}
                    >
                      Next
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-10 space-y-10 duration-500">
                <div className="space-y-4 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                  <h1 className="text-foreground text-3xl font-black tracking-tighter md:text-4xl">
                    All set!
                  </h1>
                  <p className="text-muted-foreground font-medium">
                    We've gathered everything we need to build your workspace.
                  </p>
                </div>

                <div className="bg-muted/30 border-border/50 space-y-4 rounded-[2rem] border p-8">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-muted-foreground">Website</span>
                    <span className="text-foreground">
                      {website || 'noxfolio.com'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-muted-foreground">Team Size</span>
                    <span className="text-foreground">{size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-muted-foreground">Industry</span>
                    <span className="text-foreground">{industry}</span>
                  </div>
                  <div className="border-border/30 mt-2 flex items-center justify-between border-t pt-4 text-sm font-bold">
                    <span className="text-emerald-500">Trial Credits</span>
                    <span className="text-emerald-500">50 Credits</span>
                  </div>
                </div>

                {error && (
                  <p className="text-destructive bg-destructive/10 border-destructive/20 animate-in fade-in slide-in-from-top-2 rounded-xl border p-3 text-center text-xs font-bold">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-xs font-bold text-emerald-500">
                    {success}
                  </p>
                )}

                <div className="flex flex-col gap-4">
                  <Button
                    variant="default"
                    className="shadow-primary/20 group flex h-16 w-full items-center justify-center gap-3 rounded-2xl text-xl font-black shadow-2xl transition-all active:scale-95"
                    onClick={handleComplete}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Launching...' : 'Launch Dashboard'}
                    <Rocket
                      className={`h-6 w-6 transition-transform ${isSubmitting ? 'animate-bounce' : 'group-hover:translate-x-[4px] group-hover:translate-y-[-4px]'}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground h-12 font-bold"
                    onClick={() => setStep(1)}
                  >
                    Edit details
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Trust */}
        <div className="text-muted-foreground/60 flex items-center justify-center gap-3">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">
            Secure Enterprise Setup
          </span>
        </div>
      </div>
    </div>
  );
}

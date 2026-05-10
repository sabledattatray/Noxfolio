'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState('');
  const [size, setSize] = useState('Select size');
  const [industry, setIndustry] = useState('Select industry');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleComplete() {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  }

  return (
    <div className="bg-background text-foreground relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden py-20 transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="bg-primary/5 absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

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
          <div className="flex gap-1.5">
            <div
              className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-primary' : 'bg-muted'}`}
            />
            <div
              className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}
            />
          </div>
        </div>

        <Card className="bg-card border-border relative overflow-hidden rounded-[3rem] shadow-2xl">
          <div className="from-primary to-primary absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r via-blue-500" />

          <CardContent className="space-y-10 p-10 md:p-14">
            {step === 1 ? (
              <>
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
                        <DropdownMenuContent className="border-border z-[110] w-[240px] rounded-2xl bg-white p-2 opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:bg-[#0A0A0A]">
                          <DropdownMenuItem
                            onClick={() => setSize('1-10 employees')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            1-10 employees
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSize('11-50 employees')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            11-50 employees
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSize('51-200 employees')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            51-200 employees
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSize('201-1000 employees')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            201-1000 employees
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSize('1000+ employees')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            1000+ employees
                          </DropdownMenuItem>
                        </DropdownMenuContent>
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
                        <DropdownMenuContent className="border-border z-[110] w-[240px] rounded-2xl bg-white p-2 opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:bg-[#0A0A0A]">
                          <DropdownMenuItem
                            onClick={() => setIndustry('SaaS / Software')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            SaaS / Software
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setIndustry('Fintech')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            Fintech
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setIndustry('E-commerce')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            E-commerce
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setIndustry('Healthcare')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            Healthcare
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setIndustry('Agency / Consulting')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            Agency / Consulting
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setIndustry('Other')}
                            className="focus:text-foreground cursor-pointer rounded-xl hover:bg-transparent focus:bg-transparent"
                          >
                            Other
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="border-border/50 flex items-center gap-4 border-t pt-6">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground h-14 rounded-2xl px-8 font-bold"
                    onClick={() => router.back()}
                  >
                    Back
                  </Button>
                  <Button
                    variant="default"
                    className="shadow-primary/20 group h-14 flex-1 rounded-2xl text-lg font-black shadow-xl transition-all active:scale-95"
                    onClick={() => setStep(2)}
                  >
                    Next
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </>
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
                </div>

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

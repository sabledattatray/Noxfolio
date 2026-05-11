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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function OnboardingView({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState('');
  const [size, setSize] = useState('Select size');
  const [industry, setIndustry] = useState('Select industry');

  return (
    <div className="bg-background text-foreground flex min-h-[600px] items-center justify-center p-4 transition-colors duration-500">
      <div className="animate-in fade-in zoom-in-95 w-full max-w-[580px] space-y-8 duration-500">
        {/* Progress Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white shadow-none">
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

        <Card className="bg-card border-border relative overflow-hidden rounded-[3rem] shadow-none">
          <div className="from-primary to-primary absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r via-blue-500" />

          <CardContent className="space-y-10 p-10 md:p-14">
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
              {/* Website URL */}
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
                  Enter your company website to auto-generate organization name
                </p>
              </div>

              {/* Grid for Size & Industry */}
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
              >
                Back
              </Button>
              <Button
                variant="default"
                className="group h-14 flex-1 rounded-2xl text-lg font-black shadow-none transition-all active:scale-95"
                onClick={onComplete}
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
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

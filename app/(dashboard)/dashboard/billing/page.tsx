'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Zap,
  CreditCard,
  History,
  TrendingUp,
  Check,
  Info,
  Plus,
  Lock,
  ArrowRight,
  ChevronRight,
  MessageSquare,
  Mail,
  Phone,
  Bot,
  ShieldCheck,
  Users,
  LayoutDashboard,
  Box,
  BarChart3,
  Globe,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 pb-20 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold tracking-tight">
          Billing & Plans
        </h1>
        <p className="text-muted-foreground font-semibold">
          Manage your subscription, credits, and view payment history.
        </p>
      </div>

      <Tabs
        defaultValue="overview"
        className="space-y-8"
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-accent/20 border-border/50 h-auto rounded-none border p-1">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none px-8 py-3 text-[10px] font-semibold tracking-widest uppercase transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="plans"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none px-8 py-3 text-[10px] font-semibold tracking-widest uppercase transition-all"
          >
            Plans
          </TabsTrigger>
          <TabsTrigger
            value="subscription"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none px-8 py-3 text-[10px] font-semibold tracking-widest uppercase transition-all"
          >
            Subscription & Credits
          </TabsTrigger>
          <TabsTrigger
            value="invoices"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none px-8 py-3 text-[10px] font-semibold tracking-widest uppercase transition-all"
          >
            Invoices
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent
          value="overview"
          className="animate-in fade-in slide-in-from-left-4 space-y-8 duration-500 outline-none"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="space-y-8 md:col-span-8">
              <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
                <CardHeader className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Badge className="mb-2 rounded-none border border-rose-500/50 bg-transparent text-[10px] font-semibold tracking-widest text-rose-500 uppercase">
                        Trial ending soon!
                      </Badge>
                      <CardTitle className="text-3xl font-semibold">
                        2 days remaining
                      </CardTitle>
                      <CardDescription className="text-base font-semibold">
                        Your free trial expires on May 13, 2026. Upgrade now to
                        keep your automations running.
                      </CardDescription>
                    </div>
                    <div className="bg-card border-border/50 rounded-none border p-4">
                      <p className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-widest uppercase">
                        Available Credits
                      </p>
                      <p className="text-primary text-3xl font-semibold">50</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex gap-4 p-8 pt-0">
                  <Button className="bg-primary text-primary-foreground border-primary/20 h-12 rounded-none border px-8 text-xs font-semibold tracking-widest uppercase shadow-none dark:text-black">
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border/50 h-12 rounded-none px-8 text-xs font-semibold tracking-widest uppercase"
                  >
                    Manage Subscription
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <OverviewStatCard
                  title="Total Credits"
                  value="50"
                  subtext="Available to use"
                  icon={Zap}
                  color="text-amber-500"
                />
                <OverviewStatCard
                  title="Current Plan"
                  value="Free trial"
                  subtext="₹0/month"
                  icon={ShieldCheck}
                  color="text-blue-500"
                />
                <OverviewStatCard
                  title="Next Billing"
                  value="13 May"
                  subtext="2026"
                  icon={CreditCard}
                  color="text-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-8 md:col-span-4">
              <Card className="border-border/50 bg-card rounded-none shadow-none dark:shadow-md">
                <CardHeader className="border-border/50 border-b p-6">
                  <CardTitle className="text-lg font-semibold">
                    Credit Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm font-semibold">
                      Monthly Credits
                    </p>
                    <p className="font-semibold">50</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm font-semibold">
                      Top-up Credits
                    </p>
                    <p className="font-semibold">0</p>
                  </div>
                  <div className="border-border/50 flex items-center justify-between border-t pt-4">
                    <p className="text-primary text-sm font-semibold tracking-widest uppercase">
                      Total Available
                    </p>
                    <p className="text-primary text-2xl font-semibold">50</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card rounded-none shadow-none dark:shadow-md">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-semibold">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-6 pt-0">
                  <QuickActionButton icon={TrendingUp} label="Upgrade Plan" />
                  <QuickActionButton
                    icon={ShieldCheck}
                    label="Manage Subscription"
                  />
                  <QuickActionButton icon={History} label="View Invoices" />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Plans */}
        <TabsContent
          value="plans"
          className="animate-in fade-in slide-in-from-right-4 space-y-12 duration-500 outline-none"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <PlanCard
              name="Starter"
              price="₹2,500"
              credits="2,500"
              description="+ 18% GST"
              buttonText="Upgrade to Starter"
              color="bg-blue-500"
            />
            <PlanCard
              name="Growth"
              price="₹6,500"
              credits="6,500"
              description="+ 18% GST"
              buttonText="Upgrade to Growth"
              featured
              color="bg-primary"
            />
            <PlanCard
              name="Professional"
              price="₹15,000"
              credits="15,000"
              description="+ 18% GST"
              buttonText="Upgrade to Professional"
              color="bg-purple-500"
            />
            <PlanCard
              name="Custom Plan"
              price="Custom"
              credits="Custom"
              description="Tailored to your needs"
              buttonText="Talk to Sales"
              color="bg-slate-700"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-semibold tracking-tight">
                Why Teams Love Noxfolio
              </h2>
              <p className="text-muted-foreground font-semibold">
                Simple pricing. No hidden fees. Scale without limits.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureBox icon={Users} title="Unlimited Team Seats" />
              <FeatureBox icon={Box} title="No Feature Limits" />
              <FeatureBox icon={TrendingUp} title="Pay Only for Usage" />
              <FeatureBox icon={Zap} title="Credit-Based Features" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 pt-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-none p-3">
                  <Zap className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold">Pay as you automate</h3>
              </div>
              <div className="space-y-4">
                <PricingRow
                  title="Automations"
                  sub="Emails, WhatsApp, SMS, calls sent automatically"
                  cost="0.5-1 credit"
                  icon={Zap}
                />
                <PricingRow
                  title="AI Research & Communication"
                  sub="Generate messages, emails, replies with AI"
                  cost="0.2-0.5 credits"
                  icon={Sparkles}
                />
                <PricingRow
                  title="AI Chatbot"
                  sub="Auto-replies to customer conversations"
                  cost="0.5-2 credits"
                  icon={Bot}
                />
                <PricingRow
                  title="AI Voice Calling"
                  sub="AI-powered outbound and inbound calls"
                  cost="2-4 credits"
                  icon={Phone}
                />
              </div>
              <div className="bg-accent/20 border-border/50 flex items-center justify-between rounded-none border p-6">
                <div>
                  <p className="text-lg font-semibold">Need more credits?</p>
                  <p className="text-muted-foreground text-sm font-semibold">
                    Buy anytime at ₹1 per credit
                  </p>
                </div>
                <Button className="bg-primary rounded-none text-[10px] font-semibold tracking-widest uppercase">
                  Purchase Now
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="rounded-none bg-emerald-500/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-semibold">Always Free</h3>
              </div>
              <div className="bg-accent/10 border-border/50 relative grid grid-cols-1 gap-x-12 gap-y-6 overflow-hidden rounded-none border p-8 sm:grid-cols-2">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Check className="h-24 w-24" />
                </div>
                <FreeFeature label="Unlimited CRM Contacts" />
                <FreeFeature label="Unlimited Team Members" />
                <FreeFeature label="Deals & Pipeline" />
                <FreeFeature label="Task Management" />
                <FreeFeature label="Workflow Builder" />
                <FreeFeature label="Reports & Analytics" />
                <FreeFeature label="Email & WhatsApp Inbox" />
                <FreeFeature label="All Integrations" />
              </div>
              <div className="bg-primary flex items-center justify-between rounded-none p-8 text-white shadow-none dark:shadow-md">
                <div>
                  <p className="text-3xl font-semibold tracking-tighter uppercase italic">
                    Save ₹50,000+/year
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/80">
                    Other tools charge per seat. We don't. Add your whole team.
                  </p>
                </div>
                <div className="rounded-none bg-white/10 p-3">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Subscription & Credits */}
        <TabsContent
          value="subscription"
          className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500 outline-none"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
                <CardHeader className="border-border/50 border-b p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-none p-3">
                      <CreditCard className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-semibold tracking-tight uppercase">
                        Current Subscription
                      </CardTitle>
                      <CardDescription className="text-base text-[10px] font-semibold tracking-widest uppercase opacity-70">
                        Trial
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-border/50 grid grid-cols-1 divide-y md:grid-cols-4 md:divide-x md:divide-y-0">
                    <SubDetail label="Plan" value="Free trial" sub="₹0/month" />
                    <SubDetail
                      label="Credits/Month"
                      value="50"
                      sub="Standard"
                    />
                    <SubDetail
                      label="Next Billing"
                      value="13/05"
                      sub="Renewal Date"
                    />
                    <div className="flex flex-col justify-center gap-3 p-8">
                      <Button className="bg-primary text-primary-foreground w-full rounded-none text-[10px] font-semibold tracking-widest uppercase">
                        Upgrade Plan
                      </Button>
                      <Button
                        variant="ghost"
                        className="rounded-none text-[10px] font-semibold tracking-widest text-rose-500 uppercase hover:bg-rose-500/5 hover:text-rose-600"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card rounded-none shadow-none dark:shadow-md">
                <CardHeader className="border-border/50 border-b p-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-semibold tracking-tight uppercase">
                        Credit Balance
                      </CardTitle>
                      <CardDescription className="text-sm font-semibold">
                        Remaining capacity for automations and AI.
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-primary text-4xl font-semibold">50</p>
                      <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
                        Total Available
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="bg-accent/20 border-border/50 flex items-center justify-between rounded-none border p-6">
                      <div>
                        <p className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-widest uppercase">
                          Monthly
                        </p>
                        <p className="text-2xl font-semibold">50</p>
                      </div>
                      <div className="bg-primary/20 h-12 w-1"></div>
                    </div>
                    <div className="bg-accent/20 border-border/50 flex items-center justify-between rounded-none border p-6">
                      <div>
                        <p className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-widest uppercase">
                          Top-up
                        </p>
                        <p className="text-2xl font-semibold">0</p>
                      </div>
                      <div className="h-12 w-1 bg-amber-500/20"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4">
              <Card className="border-border/50 bg-card relative overflow-hidden rounded-none shadow-none dark:shadow-md">
                <div className="bg-background/95 absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
                  <div className="bg-primary/10 border-primary/20 mb-4 rounded-none border p-4">
                    <Lock className="text-primary h-8 w-8" />
                  </div>
                  <p className="text-foreground mb-2 text-sm font-semibold tracking-widest uppercase">
                    Subscribe first
                  </p>
                  <p className="text-muted-foreground text-xs font-semibold">
                    Top-up credits are only available for paid subscription
                    plans.
                  </p>
                </div>
                <CardHeader className="border-border/50 border-b p-6">
                  <CardTitle className="text-lg font-semibold">
                    Purchase Credits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold tracking-widest uppercase opacity-60">
                      Credits Amount
                    </Label>
                    <Input
                      placeholder="Enter amount"
                      className="bg-accent/20 border-border/50 h-12 rounded-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-widest uppercase opacity-60">
                      Total Cost
                    </p>
                    <p className="text-4xl font-semibold">₹0.00</p>
                    <p className="text-muted-foreground text-[10px] font-semibold italic">
                      ₹1.000 per credit
                    </p>
                  </div>
                  <Button className="bg-primary h-12 w-full rounded-none text-xs font-semibold tracking-widest uppercase">
                    Purchase Credits
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Invoices */}
        <TabsContent
          value="invoices"
          className="animate-in fade-in slide-in-from-top-4 duration-500 outline-none"
        >
          <Card className="border-border/50 bg-card rounded-none shadow-none dark:shadow-md">
            <CardHeader className="border-border/50 border-b p-8">
              <CardTitle className="text-2xl font-semibold tracking-tight uppercase">
                Billing History
              </CardTitle>
              <CardDescription>
                Download and manage your previous invoices.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                <div className="bg-accent/30 border-border/50 rounded-none border p-6">
                  <History className="text-muted-foreground/40 h-12 w-12" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">No invoices yet</h3>
                  <p className="text-muted-foreground mt-1 font-semibold">
                    Your billing history will appear here once you start a
                    subscription.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OverviewStatCard({ title, value, subtext, icon: Icon, color }: any) {
  return (
    <Card className="border-border/50 bg-card space-y-4 rounded-none p-6 shadow-none dark:shadow-md">
      <div className={cn('bg-accent/30 w-fit rounded-none p-3', color)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-widest uppercase">
          {title}
        </p>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        <p className="text-muted-foreground mt-1 text-xs font-semibold">
          {subtext}
        </p>
      </div>
    </Card>
  );
}

function QuickActionButton({ icon: Icon, label }: any) {
  return (
    <button className="group bg-accent/20 border-border/50 hover:bg-primary hover:border-primary flex w-full items-center justify-between rounded-none border p-4 transition-all">
      <div className="flex items-center gap-3">
        <Icon className="text-primary group-hover:text-primary-foreground h-4 w-4 transition-colors dark:group-hover:text-black" />
        <span className="group-hover:text-primary-foreground text-xs font-semibold tracking-widest uppercase transition-colors dark:group-hover:text-black">
          {label}
        </span>
      </div>
      <ChevronRight className="text-muted-foreground group-hover:text-primary-foreground h-4 w-4 transition-colors dark:group-hover:text-black" />
    </button>
  );
}

function PlanCard({
  name,
  price,
  credits,
  description,
  buttonText,
  featured,
  color,
}: any) {
  return (
    <Card
      className={cn(
        'border-border/50 bg-card relative flex h-full flex-col overflow-hidden rounded-none shadow-none dark:shadow-md',
        featured ? 'border-primary/50 z-10 border-2' : '',
      )}
    >
      {featured && (
        <div className="bg-primary py-1 text-center text-[10px] font-semibold tracking-widest text-white uppercase">
          Most Popular
        </div>
      )}
      <div className={cn('h-1', color)}></div>
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-semibold tracking-tighter uppercase">
          {name}
        </CardTitle>
        <CardDescription className="text-foreground mt-4 mb-2 text-4xl font-semibold">
          {price}
          <span className="text-muted-foreground text-xs font-semibold">
            /month
          </span>
        </CardDescription>
        <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
          {description}
        </p>
      </CardHeader>
      <CardContent className="flex-grow space-y-6 p-6 pt-0">
        <div className="space-y-3">
          <PlanFeature label={`${credits} credits/month`} />
          <PlanFeature label="Unlimited CRM access" />
          <PlanFeature label="Priority support" />
        </div>
        <Button
          className={cn(
            'mt-auto h-11 w-full rounded-none text-[10px] font-semibold tracking-widest uppercase',
            featured
              ? 'bg-primary text-primary-foreground shadow-primary/20 shadow-lg'
              : 'variant-outline border-border/50 bg-accent/30 hover:bg-primary hover:text-white',
          )}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

function PlanFeature({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check className="h-3 w-3 text-emerald-500" />
      <span className="text-foreground/80 text-xs font-semibold">{label}</span>
    </div>
  );
}

function FeatureBox({ icon: Icon, title }: any) {
  return (
    <div className="bg-accent/10 border-border/50 hover:bg-accent/20 flex flex-col items-center justify-center space-y-3 rounded-none border p-6 text-center transition-colors">
      <div className="bg-primary/10 rounded-none p-3">
        <Icon className="text-primary h-5 w-5" />
      </div>
      <p className="text-[10px] font-semibold tracking-widest uppercase">
        {title}
      </p>
    </div>
  );
}

function PricingRow({ title, sub, cost, icon: Icon }: any) {
  return (
    <div className="bg-accent/10 border-border/50 hover:bg-accent/20 flex items-center justify-between rounded-none border p-4 transition-colors">
      <div className="flex items-center gap-4">
        <div className="bg-accent/30 border-border/50 rounded-none border p-2">
          <Icon className="text-muted-foreground h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-muted-foreground text-[10px] font-semibold">
            {sub}
          </p>
        </div>
      </div>
      <div className="text-right">
        <Badge className="bg-primary/10 text-primary rounded-none border-none text-[10px] font-semibold">
          {cost}
        </Badge>
      </div>
    </div>
  );
}

function FreeFeature({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-1.5 rounded-none bg-emerald-500"></div>
      <span className="text-sm font-semibold opacity-80">{label}</span>
    </div>
  );
}

function SubDetail({ label, value, sub }: any) {
  return (
    <div className="space-y-2 p-8 text-center md:text-left">
      <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase opacity-60">
        {label}
      </p>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-muted-foreground text-xs font-semibold">{sub}</p>
    </div>
  );
}

function Label({ children, className }: any) {
  return (
    <label
      className={cn(
        'text-sm leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
    >
      {children}
    </label>
  );
}

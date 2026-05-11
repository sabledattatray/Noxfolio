'use client';

import { useActionState, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  User,
  Mail,
  Shield,
  UserCircle,
  Building2,
  Globe,
  MapPin,
  CreditCard,
  Zap,
  Monitor,
  Moon,
  Sun,
  ShieldCheck,
  Users,
  Key,
  Smartphone,
  Trash2,
  ArrowRightLeft,
  Coins,
  Plus,
  LogOut,
  MailPlus,
} from 'lucide-react';
import {
  updateAccount,
  signOut,
  updateBillingAction,
} from '@/app/(dashboard)/actions';
import { User as UserType, Organization } from '@/lib/db/schema';
import useSWR from 'swr';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ActionState = {
  name?: string;
  error?: string;
  success?: string;
};

export default function SettingsPage() {
  const { data: user } = useSWR<UserType & { role: string }>(
    '/api/user',
    fetcher,
  );
  const { data: orgData } = useSWR<any>('/api/user', fetcher);
  const org = orgData?.organization;
  const stats = orgData?.stats;

  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [billingState, billingFormAction, isBillingPending] = useActionState<
    any,
    FormData
  >(updateBillingAction, {});

  const handleSignOut = async () => {
    setIsPending(true);
    await signOut();
    router.refresh();
    router.push('/sign-in');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 pb-24 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">My Account</h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Manage your personal identity, organization details, and security.
          </p>
        </div>
        <div className="bg-accent/30 border-border/50 flex items-center gap-4 rounded-none border p-4 shadow-sm backdrop-blur-sm">
          <div className="bg-primary/10 text-primary border-primary/20 flex h-10 w-10 items-center justify-center rounded-none border">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase opacity-80">
              Credits Balance
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black">50</span>
              <Badge
                variant="destructive"
                className="h-4 rounded-none border-none bg-rose-500/10 text-[8px] text-rose-500"
              >
                LOW
              </Badge>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground ml-auto h-8 rounded-none text-[10px] font-black tracking-widest uppercase shadow-md"
          >
            Add Credits
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column - Main Forms */}
        <div className="space-y-8 lg:col-span-8">
          {/* Section: Personal Information */}
          <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
            <CardHeader className="border-border/50 border-b p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-none bg-blue-500/10 p-3 text-blue-500">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Your identity across the Noxfolio ecosystem.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-xs font-black tracking-widest uppercase opacity-60">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      readOnly
                      value={user?.name || 'Loading...'}
                      className="bg-accent/30 border-border/50 h-12 rounded-none pl-10 font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black tracking-widest uppercase opacity-60">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      readOnly
                      value={user?.email || 'Loading...'}
                      className="bg-accent/30 border-border/50 h-12 rounded-none pl-10 font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black tracking-widest uppercase opacity-60">
                    User ID
                  </Label>
                  <div className="relative">
                    <Shield className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      readOnly
                      value={
                        user?.id
                          ? `USR-${user.id.toString().padStart(6, '0')}`
                          : '9ff7a18f-8b2c-4b86-82aa-5ed0c76ac2c5'
                      }
                      className="bg-accent/10 border-border/50 h-12 rounded-none pl-10 font-mono text-xs opacity-70"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black tracking-widest uppercase opacity-60">
                    Organization
                  </Label>
                  <div className="relative">
                    <Building2 className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      readOnly
                      value={org?.name || "Datta Sable's Workspace"}
                      className="bg-accent/30 border-border/50 h-12 rounded-none pl-10 font-bold"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section: Billing Information */}
          <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
            <CardHeader className="border-border/50 border-b p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-none bg-emerald-500/10 p-3 text-emerald-500">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    Billing Information
                  </CardTitle>
                  <CardDescription>
                    Essential details for your invoices and fiscal compliance.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form action={billingFormAction} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Phone Number *</Label>
                    <Input
                      name="phone"
                      placeholder="9876543210"
                      defaultValue={org?.billing?.phone || '9876543210'}
                      className="bg-accent/20 border-border/50 h-11 rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Email Address *</Label>
                    <Input
                      name="billingEmail"
                      placeholder="billing@company.com"
                      defaultValue={
                        org?.billing?.billingEmail || 'billing@company.com'
                      }
                      className="bg-accent/20 border-border/50 h-11 rounded-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-bold">
                      Legal Business Name *
                    </Label>
                    <Input
                      name="legalName"
                      placeholder="Enter your legal business name"
                      defaultValue={org?.billing?.legalName || ''}
                      className="bg-accent/20 border-border/50 h-11 rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">
                      Trade Name (if different)
                    </Label>
                    <Input
                      name="tradeName"
                      placeholder="Enter trade/brand name"
                      defaultValue={org?.billing?.tradeName || ''}
                      className="bg-accent/20 border-border/50 h-11 rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Business Type</Label>
                    <select
                      name="businessType"
                      defaultValue={org?.billing?.businessType || ''}
                      className="border-border/50 bg-accent/20 focus:ring-primary/20 flex h-11 w-full rounded-none border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                    >
                      <option value="">Select Business Type</option>
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Private Limited">Private Limited</option>
                      <option value="LLP">LLP</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">
                      GSTIN (Optional)
                    </Label>
                    <Input
                      name="gstin"
                      placeholder="22AAAAA0000A1Z5"
                      defaultValue={org?.billing?.gstin || '22AAAAA0000A1Z5'}
                      className="bg-accent/20 border-border/50 h-11 rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold">Country *</Label>
                    <div className="border-border/50 bg-accent/10 flex h-11 items-center gap-3 rounded-none border px-4">
                      <span>🇮🇳</span>
                      <span className="font-bold">India</span>
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-bold">
                      Address Line 1 *
                    </Label>
                    <Input
                      name="address1"
                      placeholder="Building number, street name"
                      defaultValue={org?.billing?.address1 || ''}
                      className="bg-accent/20 border-border/50 h-11 rounded-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-bold">Address Line 2</Label>
                    <Input
                      name="address2"
                      placeholder="Landmark, area, locality"
                      defaultValue={org?.billing?.address2 || ''}
                      className="bg-accent/20 border-border/50 h-11 rounded-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 md:col-span-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold">City *</Label>
                      <Input
                        name="city"
                        placeholder="City"
                        defaultValue={org?.billing?.city || ''}
                        className="bg-accent/20 border-border/50 h-11 rounded-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold">State *</Label>
                      <Input
                        name="state"
                        placeholder="State"
                        defaultValue={org?.billing?.state || ''}
                        className="bg-accent/20 border-border/50 h-11 rounded-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold">PIN Code *</Label>
                      <Input
                        name="pinCode"
                        placeholder="000000"
                        defaultValue={org?.billing?.pinCode || ''}
                        className="bg-accent/20 border-border/50 h-11 rounded-none"
                      />
                    </div>
                  </div>
                </div>

                {billingState?.error && (
                  <p className="mt-4 text-xs font-bold text-rose-500">
                    {billingState.error}
                  </p>
                )}
                {billingState?.success && (
                  <p className="mt-4 text-xs font-bold text-emerald-500">
                    {billingState.success}
                  </p>
                )}

                <div className="mt-8 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isBillingPending}
                    className="bg-primary text-primary-foreground dark:shadow-primary/20 h-12 rounded-none px-10 font-black tracking-widest uppercase shadow-none transition-all hover:-translate-y-0.5 active:scale-95 dark:shadow-lg"
                  >
                    {isBillingPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Save Billing Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Section: Organization Members */}
          <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
            <CardHeader className="border-border/50 border-b p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-none bg-purple-500/10 p-3 text-purple-500">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    Organization Members
                  </CardTitle>
                  <CardDescription>
                    View and contact other members of your organization.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-border/50 bg-accent/10 border-b">
                      <th className="p-6 text-[10px] font-black tracking-widest uppercase opacity-60">
                        Name
                      </th>
                      <th className="p-6 text-[10px] font-black tracking-widest uppercase opacity-60">
                        Email
                      </th>
                      <th className="p-6 text-[10px] font-black tracking-widest uppercase opacity-60">
                        Role
                      </th>
                      <th className="p-6 text-right text-[10px] font-black tracking-widest uppercase opacity-60">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-border/30 divide-y">
                    <tr className="hover:bg-accent/20 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-none font-black text-white">
                            D
                          </div>
                          <div>
                            <p className="font-bold">
                              Datta Sable{' '}
                              <span className="text-primary ml-1 text-[10px]">
                                (You)
                              </span>
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Admin Access
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-sm font-medium">
                        noxfolio@gmail.com
                      </td>
                      <td className="p-6">
                        <Badge
                          variant="outline"
                          className="bg-primary/5 text-primary border-primary/20 rounded-none"
                        >
                          Owner
                        </Badge>
                      </td>
                      <td className="p-6 text-right">
                        <Badge className="rounded-none border-none bg-emerald-500/10 font-bold text-emerald-500">
                          Active
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sideline Cards */}
        <div className="space-y-8 lg:col-span-4">
          {/* Section: Roles & Permissions */}
          <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
            <CardHeader className="border-border/50 border-b p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-primary h-5 w-5" />
                <CardTitle className="text-lg">Role & Permissions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="bg-accent/20 rounded-none p-4">
                <p className="text-foreground text-sm font-black uppercase">
                  Owner
                </p>
                <p className="text-muted-foreground text-xs font-medium">
                  Full control over the organization
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                  Your Permissions:
                </p>
                <ul className="space-y-3">
                  <PermissionItem label="Manage all users and roles" />
                  <PermissionItem label="Access admin dashboard" />
                  <PermissionItem label="Create and delete workflows" />
                  <PermissionItem label="Configure organization settings" />
                  <PermissionItem label="Manage billing and subscriptions" />
                  <PermissionItem label="View all data and analytics" />
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section: Appearance */}
          <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
            <CardHeader className="border-border/50 border-b p-6">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Appearance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-muted-foreground text-xs font-medium">
                Choose how Noxfolio looks to you.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <ThemeButton
                  icon={Sun}
                  label="Light"
                  active={mounted && theme === 'light'}
                  onClick={() => setTheme('light')}
                />
                <ThemeButton
                  icon={Moon}
                  label="Dark"
                  active={mounted && theme === 'dark'}
                  onClick={() => setTheme('dark')}
                />
                <ThemeButton
                  icon={Monitor}
                  label="System"
                  active={mounted && theme === 'system'}
                  onClick={() => setTheme('system')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section: Email Integration */}
          <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
            <CardHeader className="border-border/50 border-b p-6">
              <div className="flex items-center gap-3">
                <MailPlus className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-lg">Email Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-muted-foreground text-xs leading-relaxed">
                Connect your personal email to send directly from the CRM.
              </p>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="border-border/50 bg-accent/10 h-11 w-full justify-start rounded-none font-bold"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    className="mr-3 h-4 w-4"
                  />
                  Connect Gmail
                </Button>
                <Button
                  variant="outline"
                  className="border-border/50 bg-accent/10 h-11 w-full justify-start rounded-none font-bold"
                >
                  <img
                    src="https://microsoft.com/favicon.ico"
                    className="mr-3 h-4 w-4"
                  />
                  Connect Outlook
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section: App Settings */}
          <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
            <CardHeader className="border-border/50 border-b p-6">
              <CardTitle className="text-lg">App Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <Smartphone className="text-primary h-4 w-4" /> Progressive
                  Web App
                </p>
                <p className="text-muted-foreground text-[10px] leading-relaxed">
                  Install Noxfolio as a standalone app for better performance.
                </p>
              </div>
              <div className="border-border/30 space-y-4 border-t pt-2">
                <p className="text-sm font-bold">Cache Management</p>
                <p className="text-muted-foreground text-[10px] leading-relaxed">
                  Clear service worker cache if experiencing API issues.
                </p>
                <Button
                  variant="outline"
                  className="border-border/50 h-10 w-full rounded-none text-[10px] font-black tracking-widest uppercase"
                >
                  Clear Service Worker Cache
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section: Sign Out */}
          <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-2 text-lg">
                <LogOut className="h-5 w-5 text-rose-500" /> Sign Out
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
              <p className="text-muted-foreground text-xs leading-relaxed">
                Sign out of your account on this device.
              </p>
              <Button
                variant="outline"
                onClick={handleSignOut}
                disabled={isPending}
                className="border-border/50 hover:bg-accent/50 h-11 w-full rounded-none font-bold text-rose-500"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Sign Out'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Section: Danger Zone */}
          <Card className="border-border/50 bg-card overflow-hidden rounded-none shadow-none dark:shadow-md">
            <CardHeader className="border-border/50 border-b p-6">
              <CardTitle className="flex items-center gap-2 text-lg text-rose-500">
                <Trash2 className="h-5 w-5" /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-3">
                <p className="text-foreground flex items-center gap-2 text-sm font-bold">
                  <ArrowRightLeft className="h-4 w-4 text-rose-500" /> Transfer
                  Ownership
                </p>
                <p className="text-muted-foreground text-[10px] leading-relaxed">
                  Transfer this organization and all its data to another person.
                  You will lose owner-level access.
                </p>
                <Button className="h-11 w-full rounded-none bg-rose-500 text-xs font-black tracking-widest text-white uppercase hover:bg-rose-600">
                  Transfer Ownership
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PermissionItem({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5 rounded-full bg-emerald-500/10 p-1">
        <ShieldCheck className="h-3 w-3 text-emerald-500" />
      </div>
      <span className="text-foreground/80 text-xs font-medium">{label}</span>
    </li>
  );
}

function ThemeButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-none border p-4 transition-all',
        active
          ? 'bg-primary/10 border-primary text-primary'
          : 'bg-accent/20 border-border/50 text-muted-foreground hover:bg-accent/40',
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-[10px] font-black tracking-widest uppercase">
        {label}
      </span>
    </button>
  );
}

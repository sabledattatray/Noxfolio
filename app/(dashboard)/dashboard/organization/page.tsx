'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { customerPortalAction } from '@/lib/stripe/actions';
import { useActionState } from 'react';
import { OrganizationDataWithMembers, User } from '@/lib/db/schema';
import {
  removeOrganizationMember,
  inviteOrganizationMember,
} from '@/app/(dashboard)/actions';
import useSWR from 'swr';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle, UserMinus, Mail } from 'lucide-react';

type ActionState = {
  error?: string;
  success?: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SubscriptionSkeleton() {
  return <Card className="bg-accent/50 h-[140px] animate-pulse" />;
}

function ManageSubscription() {
  const { data: organizationData } = useSWR<OrganizationDataWithMembers>(
    '/api/organization',
    fetcher,
  );

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Organization Subscription</CardTitle>
        <CardDescription>
          Manage your team's plan and billing information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-accent/30 border-border/50 flex flex-col items-start justify-between rounded-xl border p-4 sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-lg font-semibold">
              {organizationData?.planName || 'Free Plan'}
            </p>
            <p className="text-muted-foreground text-sm">
              {organizationData?.subscriptionStatus === 'active'
                ? 'Billed monthly'
                : organizationData?.subscriptionStatus === 'trialing'
                  ? 'Trial period'
                  : 'Limited features'}
            </p>
          </div>
          <form
            action={async (formData) => {
              await customerPortalAction(formData);
            }}
          >
            <Button type="submit" variant="default">
              Manage Billing
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

function OrganizationMembersSkeleton() {
  return <Card className="bg-accent/50 h-[300px] animate-pulse" />;
}

function OrganizationMembers() {
  const { data: organizationData } = useSWR<OrganizationDataWithMembers>(
    '/api/organization',
    fetcher,
  );
  const [removeState, removeAction, isRemovePending] = useActionState<
    ActionState,
    FormData
  >(removeOrganizationMember, {});

  const getUserDisplayName = (user: Pick<User, 'id' | 'name' | 'email'>) => {
    return user.name || user.email || 'Unknown User';
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>
          Manage who has access to this organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {organizationData?.organizationMembers?.map((member) => (
            <div
              key={member.id}
              className="hover:bg-accent/30 hover:border-border/50 group flex items-center justify-between rounded-xl border border-transparent p-3 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="border-border/50 group-hover:border-primary/50 h-10 w-10 border-2 transition-colors">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {getUserDisplayName(member.user).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {getUserDisplayName(member.user)}
                  </p>
                  <p className="text-muted-foreground bg-accent mt-1 w-fit rounded-full px-2 py-0.5 text-xs capitalize">
                    {member.role}
                  </p>
                </div>
              </div>
              <form action={removeAction}>
                <input type="hidden" name="memberId" value={member.id} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  disabled={isRemovePending}
                >
                  <UserMinus className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function InviteMember() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const isOwner = user?.role === 'owner';
  const [inviteState, inviteAction, isInvitePending] = useActionState<
    ActionState,
    FormData
  >(inviteOrganizationMember, {});

  return (
    <Card className="border-border/50 bg-card/50 h-full backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Invite Member</CardTitle>
        <CardDescription>Add new members to your organization.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={inviteAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="group relative">
              <Mail className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="colleague@company.com"
                required
                disabled={!isOwner}
                className="rounded-xl pl-10"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label>Access Level</Label>
            <RadioGroup
              defaultValue="member"
              name="role"
              className="grid grid-cols-2 gap-4"
              disabled={!isOwner}
            >
              <Label
                htmlFor="role-member"
                className="border-border/50 bg-accent/20 hover:border-primary/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all"
              >
                <div className="space-y-1">
                  <p className="font-medium">Member</p>
                  <p className="text-muted-foreground text-xs">
                    Standard access
                  </p>
                </div>
                <RadioGroupItem
                  value="member"
                  id="role-member"
                  className="sr-only"
                />
              </Label>
              <Label
                htmlFor="role-owner"
                className="border-border/50 bg-accent/20 hover:border-primary/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all"
              >
                <div className="space-y-1">
                  <p className="font-medium">Owner</p>
                  <p className="text-muted-foreground text-xs">Full control</p>
                </div>
                <RadioGroupItem
                  value="owner"
                  id="role-owner"
                  className="sr-only"
                />
              </Label>
            </RadioGroup>
          </div>
          <Button
            type="submit"
            className="shadow-primary/20 h-11 w-full rounded-xl shadow-lg"
            disabled={isInvitePending || !isOwner}
          >
            {isInvitePending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="mr-2 h-4 w-4" />
            )}
            Send Invitation
          </Button>
          {inviteState?.error && (
            <p className="text-destructive bg-destructive/10 border-destructive/20 rounded-lg border p-3 text-xs">
              {inviteState.error}
            </p>
          )}
          {inviteState?.success && (
            <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-500">
              {inviteState.success}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export default function OrganizationPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organization</h1>
        <p className="text-muted-foreground mt-1">
          Manage your team, roles, and billing.
        </p>
      </div>

      <Suspense fallback={<SubscriptionSkeleton />}>
        <ManageSubscription />
      </Suspense>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Suspense fallback={<OrganizationMembersSkeleton />}>
          <OrganizationMembers />
        </Suspense>
        <InviteMember />
      </div>
    </div>
  );
}

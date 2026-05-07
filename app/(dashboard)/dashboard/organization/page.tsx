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
import { removeOrganizationMember, inviteOrganizationMember } from '@/app/(login)/actions';
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
  return <Card className="h-[140px] animate-pulse bg-accent/50" />;
}

function ManageSubscription() {
  const { data: organizationData } = useSWR<OrganizationDataWithMembers>('/api/organization', fetcher);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Organization Subscription</CardTitle>
        <CardDescription>Manage your team's plan and billing information.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl bg-accent/30 border border-border/50">
          <div className="mb-4 sm:mb-0">
            <p className="font-semibold text-lg">
              {organizationData?.planName || 'Free Plan'}
            </p>
            <p className="text-sm text-muted-foreground">
              {organizationData?.subscriptionStatus === 'active'
                ? 'Billed monthly'
                : organizationData?.subscriptionStatus === 'trialing'
                ? 'Trial period'
                : 'Limited features'}
            </p>
          </div>
          <form action={customerPortalAction}>
            <Button type="submit" variant="premium">
              Manage Billing
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

function OrganizationMembersSkeleton() {
  return <Card className="h-[300px] animate-pulse bg-accent/50" />;
}

function OrganizationMembers() {
  const { data: organizationData } = useSWR<OrganizationDataWithMembers>('/api/organization', fetcher);
  const [removeState, removeAction, isRemovePending] = useActionState<ActionState, FormData>(removeOrganizationMember, {});

  const getUserDisplayName = (user: Pick<User, 'id' | 'name' | 'email'>) => {
    return user.name || user.email || 'Unknown User';
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>Manage who has access to this organization.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {organizationData?.organizationMembers?.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/30 transition-colors border border-transparent hover:border-border/50 group">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-border/50 group-hover:border-primary/50 transition-colors">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {getUserDisplayName(member.user).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{getUserDisplayName(member.user)}</p>
                  <p className="text-xs text-muted-foreground capitalize px-2 py-0.5 rounded-full bg-accent w-fit mt-1">{member.role}</p>
                </div>
              </div>
              <form action={removeAction}>
                <input type="hidden" name="memberId" value={member.id} />
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" disabled={isRemovePending}>
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
  const [inviteState, inviteAction, isInvitePending] = useActionState<ActionState, FormData>(inviteOrganizationMember, {});

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle>Invite Member</CardTitle>
        <CardDescription>Add new members to your organization.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={inviteAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input id="email" name="email" type="email" placeholder="colleague@company.com" required disabled={!isOwner} className="pl-10 rounded-xl" />
            </div>
          </div>
          <div className="space-y-3">
            <Label>Access Level</Label>
            <RadioGroup defaultValue="member" name="role" className="grid grid-cols-2 gap-4" disabled={!isOwner}>
              <Label htmlFor="role-member" className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-accent/20 cursor-pointer hover:border-primary/50 transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                <div className="space-y-1">
                  <p className="font-medium">Member</p>
                  <p className="text-xs text-muted-foreground">Standard access</p>
                </div>
                <RadioGroupItem value="member" id="role-member" className="sr-only" />
              </Label>
              <Label htmlFor="role-owner" className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-accent/20 cursor-pointer hover:border-primary/50 transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                <div className="space-y-1">
                  <p className="font-medium">Owner</p>
                  <p className="text-xs text-muted-foreground">Full control</p>
                </div>
                <RadioGroupItem value="owner" id="role-owner" className="sr-only" />
              </Label>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full h-11 rounded-xl shadow-lg shadow-primary/20" disabled={isInvitePending || !isOwner}>
            {isInvitePending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            Send Invitation
          </Button>
          {inviteState?.error && <p className="text-xs text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">{inviteState.error}</p>}
          {inviteState?.success && <p className="text-xs text-emerald-500 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">{inviteState.success}</p>}
        </form>
      </CardContent>
    </Card>
  );
}

export default function OrganizationPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organization</h1>
        <p className="text-muted-foreground mt-1">Manage your team, roles, and billing.</p>
      </div>
      
      <Suspense fallback={<SubscriptionSkeleton />}>
        <ManageSubscription />
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Suspense fallback={<OrganizationMembersSkeleton />}>
          <OrganizationMembers />
        </Suspense>
        <InviteMember />
      </div>
    </div>
  );
}

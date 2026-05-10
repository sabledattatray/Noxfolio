'use client';

import { useActionState, useState } from 'react';
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
import { Loader2, User, Mail, Shield, UserCircle } from 'lucide-react';
import { updateAccount } from '@/app/(dashboard)/actions';
import { User as UserType } from '@/lib/db/schema';
import useSWR from 'swr';
import { Suspense } from 'react';
import { BrandingForm } from '@/components/settings/branding-form';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ActionState = {
  name?: string;
  error?: string;
  success?: string;
};

function AccountFormWithData({ state }: { state: ActionState }) {
  const { data: user } = useSWR<UserType>('/api/user', fetcher);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 flex items-center gap-6">
        <div className="group relative">
          <div className="from-primary/10 to-primary/30 text-primary border-border/50 group-hover:border-primary flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-gradient-to-tr transition-colors">
            {imagePreview || user?.image ? (
              <img
                src={imagePreview || user?.image || ''}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle className="h-12 w-12" />
            )}
          </div>
          <input
            type="file"
            id="image"
            name="image_file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
            type="hidden"
            name="image"
            value={imagePreview || user?.image || ''}
          />
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="bg-background border-border/50 absolute -right-2 -bottom-2 h-8 w-8 rounded-lg shadow-sm"
            onClick={() => document.getElementById('image')?.click()}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <h3 className="text-lg font-bold">Profile Picture</h3>
          <p className="text-muted-foreground text-sm">PNG, JPG up to 5MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="group relative">
            <User className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              defaultValue={state.name || user?.name || ''}
              required
              className="rounded-xl pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="group relative">
            <Mail className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={user?.email || ''}
              required
              className="rounded-xl pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { PlusCircle } from 'lucide-react';

export default function SettingsPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateAccount,
    {},
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and security.
        </p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Update your personal details and how others see you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-8">
            <Suspense
              fallback={
                <div className="bg-accent/50 h-40 animate-pulse rounded-xl" />
              }
            >
              <AccountFormWithData state={state} />
            </Suspense>

            <div className="border-border/50 flex justify-end gap-3 border-t pt-6">
              <Button variant="outline" type="button" className="rounded-xl">
                Cancel
              </Button>
              <Button
                type="submit"
                className="shadow-primary/20 rounded-xl px-8 shadow-lg"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>

            {state.error && (
              <p className="text-destructive bg-destructive/10 border-destructive/20 rounded-lg border p-3 text-xs">
                {state.error}
              </p>
            )}
            {state.success && (
              <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-500">
                {state.success}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      <BrandingForm />

      <Card className="border-border/50 bg-card/50 border-destructive/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-destructive/5 border-destructive/10 flex flex-col items-start justify-between rounded-xl border p-4 sm:flex-row sm:items-center">
            <div className="mb-4 sm:mb-0">
              <p className="font-semibold">Delete Account</p>
              <p className="text-muted-foreground text-sm">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
            <Button variant="destructive" className="rounded-xl px-6">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

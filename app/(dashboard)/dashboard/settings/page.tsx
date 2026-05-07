'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, User, Mail, Shield, UserCircle } from 'lucide-react';
import { updateAccount } from '@/app/(login)/actions';
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
      <div className="flex items-center gap-6 mb-8">
        <div className="relative group">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary/20 to-blue-400/20 flex items-center justify-center text-primary border-2 border-dashed border-primary/30 group-hover:border-primary transition-colors overflow-hidden">
            {imagePreview || user?.image ? (
              <img src={imagePreview || user?.image || ''} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserCircle className="w-12 h-12" />
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
          <input type="hidden" name="image" value={imagePreview || user?.image || ''} />
          <Button 
            type="button"
            size="icon" 
            variant="outline" 
            className="absolute -right-2 -bottom-2 w-8 h-8 rounded-lg bg-background border-border/50 shadow-sm"
            onClick={() => document.getElementById('image')?.click()}
          >
            <PlusCircle className="w-4 h-4" />
          </Button>
        </div>
        <div>
          <h3 className="font-bold text-lg">Profile Picture</h3>
          <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              defaultValue={state.name || user?.name || ''}
              required
              className="pl-10 rounded-xl"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={user?.email || ''}
              required
              className="pl-10 rounded-xl"
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
    {}
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and security.</p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your personal details and how others see you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-8">
            <Suspense fallback={<div className="h-40 animate-pulse bg-accent/50 rounded-xl" />}>
              <AccountFormWithData state={state} />
            </Suspense>
            
            <div className="pt-6 border-t border-border/50 flex justify-end gap-3">
              <Button variant="outline" type="button" className="rounded-xl">Cancel</Button>
              <Button
                type="submit"
                className="rounded-xl shadow-lg shadow-primary/20 px-8"
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
              <p className="text-xs text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">{state.error}</p>
            )}
            {state.success && (
              <p className="text-xs text-emerald-500 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">{state.success}</p>
            )}
          </form>
        </CardContent>
      </Card>

      <BrandingForm />

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl bg-destructive/5 border border-destructive/10">
            <div className="mb-4 sm:mb-0">
              <p className="font-semibold">Delete Account</p>
              <p className="text-sm text-muted-foreground">Once you delete your account, there is no going back. Please be certain.</p>
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

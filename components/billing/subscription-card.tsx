'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Check, Zap, Star, Shield, Loader2 } from 'lucide-react';
import { BillingPlan } from '@/modules/billing/types';

interface SubscriptionCardProps {
  plan: BillingPlan;
  isCurrent?: boolean;
  action: (state: any, formData: FormData) => Promise<any>;
}

export function SubscriptionCard({ plan, isCurrent, action }: SubscriptionCardProps) {
  const Icon = plan.id === 'community' ? Zap : plan.id === 'pro' ? Star : Shield;
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <Card className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${isCurrent ? 'ring-2 ring-primary border-primary bg-primary/[0.02]' : 'bg-card/30'}`}>
      <div className="h-full flex flex-col p-8 space-y-8">
        {isCurrent && (
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-bl-2xl z-20 shadow-lg">
            Current Plan
          </div>
        )}

        <div className="space-y-6 flex-1">
          {state?.error && (
            <div className="p-4 rounded-2xl text-xs font-semibold animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-500 border bg-destructive/10 text-destructive border-destructive/20">
              {state.error}
            </div>
          )}
          {state?.success && (
            <div className="p-4 rounded-2xl text-xs font-semibold animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-500 border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              {state.success}
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110 ${isCurrent ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20' : 'bg-white/5 text-muted-foreground'}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black">${plan.price / 100}</span>
                <span className="text-muted-foreground text-sm font-medium">/{plan.interval}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {plan.description}
          </p>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          
          <ul className="space-y-4">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground group/item">
                <div className="mt-0.5 p-0.5 rounded-full bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="group-hover/item:text-foreground transition-colors">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <form action={formAction} className="pt-6 mt-auto">
          <input type="hidden" name="planId" value={plan.id} />
          <Button 
            type="submit"
            disabled={isPending}
            variant={isCurrent ? 'outline' : 'default'}
            className={`w-full py-6 rounded-2xl font-bold text-sm transition-all duration-300 relative overflow-hidden group/btn ${
              !isCurrent && 'shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1'
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Connecting...
              </>
            ) : (
              <>
                {isCurrent ? 'Manage Subscription' : 'Upgrade to ' + plan.name}
              </>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
}

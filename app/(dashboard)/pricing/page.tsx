import { checkoutAction } from '@/lib/stripe/actions';
import { Check, Shield, Zap, Star } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/stripe/stripe';
import { SubmitButton } from './submit-button';
import { Button } from '@/components/ui/button';

export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const basePlan = products.find((product) => product.name === 'Base');
  const plusPlan = products.find((product) => product.name === 'Plus');

  const basePrice = prices.find((price) => price.productId === basePlan?.id);
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id);

  return (
    <main className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4 animate-in fade-in slide-in-from-bottom-2">
          <Shield className="w-3 h-3" />
          Pricing Plans
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-3 duration-500">
          Scale your billing without <br /> the headache.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          Choose the plan that's right for your organization. All plans include a 7-day free trial.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
        <PricingCard
          name={basePlan?.name || 'Base'}
          price={basePrice?.unitAmount || 800}
          interval={basePrice?.interval || 'month'}
          trialDays={basePrice?.trialPeriodDays || 7}
          description="Perfect for small teams and startups starting their journey."
          features={[
            'Unlimited Usage',
            'Unlimited Workspace Members',
            'Email Support',
            'Basic Analytics',
            'Public API Access'
          ]}
          priceId={basePrice?.id}
          icon={Zap}
        />
        <PricingCard
          name={plusPlan?.name || 'Plus'}
          price={plusPrice?.unitAmount || 1200}
          interval={plusPrice?.interval || 'month'}
          trialDays={plusPrice?.trialPeriodDays || 7}
          description="Advanced features for growing enterprises and high-volume teams."
          features={[
            'Everything in Base, and:',
            'Early Access to New Features',
            '24/7 Priority Support',
            'Slack Connect Access',
            'Custom Branding',
            'SLA Guarantee'
          ]}
          priceId={plusPrice?.id}
          highlighted
          icon={Star}
        />
      </div>

      <div className="mt-20 text-center space-y-4">
        <p className="text-muted-foreground">Trusted by over 500+ engineering teams worldwide</p>
        <div className="flex justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Mock Logos */}
          <div className="font-bold text-2xl tracking-tighter">FORGE</div>
          <div className="font-bold text-2xl tracking-tighter italic underline decoration-primary">BILL</div>
          <div className="font-bold text-2xl tracking-tighter opacity-70">STACK</div>
          <div className="font-bold text-2xl tracking-tighter">CLOUD</div>
        </div>
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  description,
  features,
  priceId,
  highlighted = false,
  icon: Icon
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  description: string;
  features: string[];
  priceId?: string;
  highlighted?: boolean;
  icon: any;
}) {
  return (
    <div className={`
      relative p-8 rounded-[2rem] border transition-all duration-500 group
      ${highlighted 
        ? 'bg-card border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-20' 
        : 'bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 z-10 hover:scale-[1.02]'}
    `}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase shadow-lg shadow-primary/20">
          Most Popular
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-2xl ${highlighted ? 'bg-primary/10 text-primary' : 'bg-accent/50 text-muted-foreground'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right text-xs font-bold text-muted-foreground uppercase tracking-widest">
          {trialDays} Day Free Trial
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-2 tracking-tight">{name}</h2>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-5xl font-bold tracking-tight">${price / 100}</span>
        <span className="text-muted-foreground font-medium">/{interval}</span>
      </div>

      <ul className="space-y-4 mb-10">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 group/item">
            <div className={`mt-1 p-0.5 rounded-full ${highlighted ? 'bg-primary/20 text-primary' : 'bg-emerald-500/10 text-emerald-500'}`}>
              <Check className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
          </li>
        ))}
      </ul>

      <form action={async (formData) => {
        "use server";
        await checkoutAction(formData);
      }}>
        <input type="hidden" name="priceId" value={priceId} />
        <SubmitButton className={`w-full h-14 rounded-2xl font-bold text-lg transition-all duration-300 ${highlighted ? 'shadow-xl shadow-primary/20' : ''}`} />
      </form>
    </div>
  );
}

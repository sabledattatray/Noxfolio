'use client';

import { MarketingPageLayout } from '@/components/marketing-layout';
import { Calculator, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PricingCalculatorPage() {
  const [revenue, setRevenue] = useState(50000);
  const [transactions, setTransactions] = useState(1000);

  const calculateSavings = () => {
    const stripeFee = revenue * 0.029 + transactions * 0.3;
    const noxfolioFee = revenue * 0.01 + transactions * 0.05;
    return Math.max(0, stripeFee - noxfolioFee);
  };

  return (
    <MarketingPageLayout
      title="Pricing Calculator"
      subtitle="See how much you can save by switching to Noxfolio's high-performance billing infrastructure."
      icon={Calculator}
    >
      <div className="bg-muted border-border not-prose rounded-3xl border p-8 shadow-sm">
        <div className="space-y-8">
          <div>
            <label className="text-muted-foreground mb-4 block text-sm font-bold tracking-widest uppercase">
              Monthly Revenue ($)
            </label>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="bg-border accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg"
            />
            <div className="mt-2 text-2xl font-black">
              ${revenue.toLocaleString()}
            </div>
          </div>

          <div>
            <label className="text-muted-foreground mb-4 block text-sm font-bold tracking-widest uppercase">
              Monthly Transactions
            </label>
            <input
              type="range"
              min="100"
              max="100000"
              step="100"
              value={transactions}
              onChange={(e) => setTransactions(Number(e.target.value))}
              className="bg-border accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg"
            />
            <div className="mt-2 text-2xl font-black">
              {transactions.toLocaleString()}
            </div>
          </div>

          <div className="border-border mt-8 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div>
                <p className="text-muted-foreground mb-1 font-medium">
                  Estimated Monthly Savings
                </p>
                <h3 className="text-4xl font-black text-emerald-500 dark:text-emerald-400">
                  $
                  {calculateSavings().toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </h3>
              </div>
              <Button
                size="lg"
                className="bg-brand-gradient shadow-primary/20 h-14 rounded-2xl border-0 px-8 font-bold text-white shadow-xl hover:opacity-90"
              >
                Get This Rate <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="border-border rounded-2xl border p-8">
          <h4 className="text-foreground mb-2 font-bold">
            Transparent Pricing
          </h4>
          <p className="text-muted-foreground text-sm">
            No hidden fees or complex tiered structures. You pay for what you
            use, at enterprise-grade efficiency.
          </p>
        </div>
        <div className="border-border rounded-2xl border p-8">
          <h4 className="text-foreground mb-2 font-bold">
            Multi-Gateway Optimization
          </h4>
          <p className="text-muted-foreground text-sm">
            Automatically route transactions through the most cost-effective
            gateway based on region and currency.
          </p>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

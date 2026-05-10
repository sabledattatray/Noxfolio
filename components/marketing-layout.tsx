import { ReactNode } from 'react';

interface MarketingLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  icon?: any;
}

export function MarketingPageLayout({
  title,
  subtitle,
  children,
  icon: Icon,
}: MarketingLayoutProps) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/50 border-border relative overflow-hidden border-b pt-24 pb-16">
        <div className="pointer-events-none absolute top-0 left-1/2 h-full w-full -translate-x-1/2 opacity-20">
          <div className="bg-brand-gradient absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full opacity-20 blur-[120px]" />
          <div className="bg-brand-secondary-gradient absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full opacity-10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {Icon && (
            <div className="bg-brand-gradient animate-in zoom-in-50 shadow-primary/20 mb-6 inline-flex rounded-2xl p-3 text-white shadow-lg duration-500">
              <Icon className="h-8 w-8" />
            </div>
          )}
          <h1 className="text-foreground mb-6 text-4xl font-black tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-none leading-relaxed">
            {children}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-deep relative overflow-hidden py-20 text-white">
        <div className="bg-brand-gradient absolute inset-0 translate-y-1/2 rounded-full opacity-10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold">
            Ready to scale your billing?
          </h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/sign-up"
              className="bg-brand-gradient shadow-primary/20 rounded-2xl px-8 py-4 font-bold text-white shadow-xl transition-all hover:scale-105"
            >
              Get Started for Free
            </a>
            <a
              href="/contact"
              className="rounded-2xl border border-white/10 bg-white/10 px-8 py-4 font-bold backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

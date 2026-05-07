import { ReactNode } from 'react';

interface MarketingLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  icon?: any;
}

export function MarketingPageLayout({ title, subtitle, children, icon: Icon }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-gray-50 border-b border-gray-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {Icon && (
            <div className="inline-flex p-3 rounded-2xl bg-blue-600/10 text-blue-600 mb-6 animate-in zoom-in-50 duration-500">
              <Icon className="w-8 h-8" />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed">
            {children}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-blue-600 opacity-10 blur-3xl rounded-full translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-8">Ready to scale your billing?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/sign-up" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl shadow-blue-500/20"
            >
              Get Started for Free
            </a>
            <a 
              href="/contact" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-bold transition-all backdrop-blur-sm"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

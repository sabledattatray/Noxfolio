import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Database, Shield, Zap, Code, ChevronRight } from 'lucide-react';
import { Terminal } from './terminal';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#030712] selection:bg-blue-500/30 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-blue-600/10 blur-[120px] opacity-70 animate-pulse mix-blend-screen" />
        <div className="absolute top-0 -right-1/4 w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[120px] opacity-50 mix-blend-screen" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              BillForge 2.0 is now live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
              The Enterprise <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Revenue Infrastructure
              </span>
            </h1>
            
            <p className="mt-4 text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Launch your financial stack in minutes. A sovereign, high-performance billing engine engineered for modern software companies.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-slate-200 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] group"
                >
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard/docs">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg rounded-full border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-sm transition-all duration-300"
                >
                  Read the Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Showcase */}
      <section className="relative z-20 -mt-10 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-1 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl shadow-blue-900/20">
            <div className="rounded-xl overflow-hidden bg-[#0A0A0A]">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative z-10 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Engineered for Scale
            </h2>
            <p className="text-xl text-slate-400">Everything you need to handle millions in MRR.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 hover:bg-slate-800/50 transition-all duration-500 hover:border-blue-500/30">
              <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                <Database className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Global State</h3>
              <p className="text-slate-400 leading-relaxed">
                Powered by a globally distributed Postgres database and Drizzle ORM for sub-millisecond latency.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 hover:bg-slate-800/50 transition-all duration-500 hover:border-purple-500/30">
              <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                <CreditCard className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Multi-Gateway</h3>
              <p className="text-slate-400 leading-relaxed">
                Seamlessly route payments through Stripe, Razorpay, or custom processors without changing your core logic.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-8 hover:bg-slate-800/50 transition-all duration-500 hover:border-emerald-500/30">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                <Shield className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Enterprise Auth</h3>
              <p className="text-slate-400 leading-relaxed">
                Bank-grade security out of the box with SOC2 compliant audit logs, RBAC, and seamless SSO integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to upgrade your infrastructure?
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Join thousands of developers building the next generation of software businesses.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="h-14 px-10 text-lg rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] group"
            >
              Get Started for Free
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

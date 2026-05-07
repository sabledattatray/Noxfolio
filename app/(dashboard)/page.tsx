import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Database, Shield, Zap, Code, ChevronRight, Play, Layout, Cpu, Globe, Github } from 'lucide-react';
import { Terminal } from './terminal';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navigation (Fixed/Sticky Vercel style) */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <Shield className="w-6 h-6 fill-white" />
              <span>BillForge</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400 font-medium">
              <Link href="#features" className="hover:text-white transition-colors">Features</Link>
              <Link href="#docs" className="hover:text-white transition-colors">Documentation</Link>
              <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="#showcase" className="hover:text-white transition-colors">Showcase</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-white text-black hover:bg-zinc-200 rounded-full font-bold px-5">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (Next.js style) */}
      <section className="relative pt-48 pb-20 lg:pt-64 lg:pb-32 overflow-hidden">
        {/* Vercel Light Rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
              The Billing <br />
              Infrastructure <br />
              <span className="text-zinc-500 italic font-medium">for the Web.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              BillForge is a sovereign financial stack for modern software companies. 
              Engineered for high-performance revenue management.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-zinc-200 font-bold group">
                  Deploy BillForge
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard/docs">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-zinc-800 bg-black text-white hover:bg-zinc-900 font-bold transition-all">
                  View Components
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Section (Floating card style) */}
      <section className="relative z-20 pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
                <span className="text-xs text-zinc-500 font-mono ml-2">bash — install.sh</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <Terminal />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features (Vercel style) */}
      <section id="features" className="py-32 border-t border-white/10 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-center">
              Engineered for Production.
            </h2>
            <p className="text-zinc-400 text-center text-lg max-w-xl mx-auto leading-relaxed">
              Everything you need to build, scale, and manage a high-performance billing stack without the operational overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-[240px]">
            {/* Large Feature 1 */}
            <div className="md:col-span-6 lg:col-span-8 rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col justify-between group hover:border-white/20 transition-all overflow-hidden relative">
              <div className="relative z-10">
                <Layout className="w-10 h-10 text-white mb-6" />
                <h3 className="text-2xl font-bold tracking-tight mb-2">Multi-Gateway Orchestration</h3>
                <p className="text-zinc-500 max-w-sm">Route payments through Stripe, Razorpay, or Custom nodes with a single unified API.</p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all" />
            </div>

            {/* Small Feature 1 */}
            <div className="md:col-span-6 lg:col-span-4 rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col justify-between hover:border-white/20 transition-all">
              <Cpu className="w-10 h-10 text-white" />
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">Sub-millisecond State</h3>
                <p className="text-zinc-500">Global Drizzle synchronization.</p>
              </div>
            </div>

            {/* Small Feature 2 */}
            <div className="md:col-span-3 lg:col-span-4 rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col justify-between hover:border-white/20 transition-all">
              <Globe className="w-10 h-10 text-white" />
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">Regional Edge</h3>
                <p className="text-zinc-500">Low-latency billing events.</p>
              </div>
            </div>

            {/* Large Feature 2 */}
            <div className="md:col-span-3 lg:col-span-8 rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col justify-between group hover:border-white/20 transition-all overflow-hidden relative">
              <div className="relative z-10">
                <Shield className="w-10 h-10 text-white mb-6" />
                <h3 className="text-2xl font-bold tracking-tight mb-2">Enterprise-Grade Security</h3>
                <p className="text-zinc-500 max-w-sm">SOC2 Audit Logs and Role-Based Access Control out of the box.</p>
              </div>
              <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Next.js Footer style) */}
      <section className="py-48 text-center border-t border-white/10 relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
            Build your <br />
            Revenue Engine.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-zinc-200 font-bold shadow-2xl shadow-white/10">
                Start for Free
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="h-14 px-10 text-lg rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 font-bold">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer (Minimalist Vercel style) */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-zinc-500">
            <Shield className="w-5 h-5 fill-zinc-500" />
            <span>© 2026 BillForge Foundation.</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-zinc-500 font-medium">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="https://github.com/sabledattatray/Billforge" className="hover:text-white transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

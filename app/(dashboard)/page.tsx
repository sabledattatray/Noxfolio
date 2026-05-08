import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Layout, Cpu, Globe, Github } from 'lucide-react';
import { Terminal } from './terminal';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black overflow-x-hidden">
      {/* Navigation (Next.js style: Transparent then Blurred) */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-zinc-200/50 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>Noxfolio</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              <Link href="#features" className="hover:text-black dark:hover:text-white transition-colors">Features</Link>
              <Link href="#docs" className="hover:text-black dark:hover:text-white transition-colors">Documentation</Link>
              <Link href="#pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing</Link>
              <Link href="#showcase" className="hover:text-black dark:hover:text-white transition-colors">Showcase</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">

            <Link href="/sign-in" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-full font-bold px-5">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (Next.js style) */}
      <section className="relative pt-48 pb-20 lg:pt-64 lg:pb-32 overflow-hidden bg-white dark:bg-black">
        {/* Vercel Light Rays & Grid Pattern */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none z-0">
          {/* Main Light Ray */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.02)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
          
          {/* Subtle Secondary Ray */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[120%] bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.02)_0%,transparent_50%)]" />
          
          {/* Dotted Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          
          {/* Decorative Shapes */}
          <div className="absolute top-20 left-[10%] w-32 h-32 border border-zinc-100 dark:border-zinc-900 rotate-12 opacity-50" />
          <div className="absolute top-60 right-[15%] w-64 h-40 border border-zinc-100 dark:border-zinc-900 -rotate-6 opacity-30" />
          <div className="absolute bottom-20 left-[20%] w-48 h-48 border border-zinc-100 dark:border-zinc-900 rounded-full opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl md:text-8xl lg:text-[112px] font-extrabold tracking-tight mb-8 leading-[1.1] md:leading-[0.9] text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="whitespace-nowrap">The Billing Infrastructure</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-12 text-balance animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              Noxfolio is a sovereign financial stack for modern software companies. 
              Engineered for high-performance revenue management and enterprise scale.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
              <Link href="/sign-up">
                <Button size="lg" className="h-12 px-10 text-base rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 font-medium group shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  Get Started
                </Button>
              </Link>
              <Link href="/dashboard/docs">
                <Button size="lg" variant="outline" className="h-12 px-10 text-base rounded-md border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium transition-all shadow-sm">
                  Learn Noxfolio
                </Button>
              </Link>
            </div>

            {/* Trusted By (Logo Cloud) */}
            <div className="mt-32 pt-12 border-t border-zinc-100 dark:border-zinc-900">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.2em] mb-12">Trusted by modern teams</p>
              <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-8 opacity-40 grayscale contrast-125 hover:opacity-60 transition-opacity">
                {/* Text based logos with Next.js style weight */}
                <span className="text-2xl font-bold tracking-tighter">Acme</span>
                <span className="text-2xl font-bold tracking-tighter">Global</span>
                <span className="text-2xl font-bold tracking-tighter">Pulsar</span>
                <span className="text-2xl font-bold tracking-tighter">Vertex</span>
                <span className="text-2xl font-bold tracking-tighter">Echo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Section (Floating card style) */}
      <section className="relative z-20 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="w-3.5 h-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="w-3.5 h-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <span className="text-[10px] text-zinc-400 font-mono font-medium uppercase tracking-[0.2em]">bash — noxfolio@latest</span>
                <div className="w-12" />
              </div>
              <div className="p-10 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                <Terminal />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features (Vercel style) */}
      <section id="features" className="py-32 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-center">
              Deploy your infrastructure.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-center text-lg max-w-2xl mx-auto leading-relaxed">
              Every feature you need to scale from first dollar to enterprise IPO. 
              Built on the principles of speed, safety, and sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[280px]">
            <div className="md:col-span-6 lg:col-span-8 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 p-10 flex flex-col justify-between group hover:border-zinc-200 dark:hover:border-zinc-800 transition-all overflow-hidden relative shadow-sm">
              <div className="relative z-10">
                <Layout className="w-8 h-8 text-black dark:text-white mb-6" />
                <h3 className="text-2xl font-bold tracking-tight mb-3">Multi-Gateway Orchestration</h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">Route payments through Stripe, Razorpay, or Custom nodes with a single unified API.</p>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full group-hover:bg-blue-500/10 transition-all" />
            </div>

            <div className="md:col-span-6 lg:col-span-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 p-10 flex flex-col justify-between hover:border-zinc-200 dark:hover:border-zinc-800 transition-all shadow-sm">
              <Cpu className="w-8 h-8 text-black dark:text-white" />
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Sub-millisecond State</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Global Drizzle synchronization at the edge.</p>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 p-10 flex flex-col justify-between hover:border-zinc-200 dark:hover:border-zinc-800 transition-all shadow-sm">
              <Globe className="w-8 h-8 text-black dark:text-white" />
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Regional Edge</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Low-latency billing events across 24+ regions.</p>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-8 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 p-10 flex flex-col justify-between group hover:border-zinc-200 dark:hover:border-zinc-800 transition-all overflow-hidden relative shadow-sm">
              <div className="relative z-10">
                <Shield className="w-8 h-8 text-black dark:text-white mb-6" />
                <h3 className="text-2xl font-bold tracking-tight mb-3">Enterprise-Grade Security</h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">SOC2 Audit Logs and Role-Based Access Control out of the box.</p>
              </div>
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 text-center border-t border-zinc-100 dark:border-zinc-900 relative overflow-hidden bg-white dark:bg-black">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-12">
            Build your <br />
            Revenue Engine.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-10 text-base rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 font-medium shadow-2xl">
                Get Started for Free
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="h-12 px-10 text-base rounded-md text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

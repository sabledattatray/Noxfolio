import { MarketingPageLayout } from '@/components/marketing-layout';
import { Book, Code, Zap, Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DocsPage() {
  const sections = [
    { title: 'Getting Started', items: ['Introduction', 'Quickstart Guide', 'API Keys', 'SDKs'] },
    { title: 'Billing Core', items: ['Creating Plans', 'Subscription Lifecycle', 'Webhooks', 'Tax Calculation'] },
    { title: 'Advanced', items: ['Multi-currency', 'Enterprise Invoicing', 'Customer Portal', 'Analytics API'] },
  ];

  return (
    <MarketingPageLayout 
      title="Documentation"
      subtitle="Everything you need to integrate and scale your billing infrastructure with BillForge."
      icon={Book}
    >
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search docs..." className="pl-10 rounded-xl bg-gray-50 border-gray-100" />
          </div>
          
          <nav className="space-y-6">
            {sections.map(section => (
              <div key={section.title}>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 px-3">{section.title}</h4>
                <ul className="space-y-1">
                  {section.items.map(item => (
                    <li key={item}>
                      <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group">
                        {item}
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/20">
              <Code className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-2">API Reference</h3>
              <p className="text-sm opacity-80 mb-6">Explore our REST endpoints and interactive playground.</p>
              <a href="/docs/api" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold border border-white/10 transition-all">Explore API →</a>
            </div>
            <div className="p-8 rounded-3xl bg-gray-900 text-white">
              <Zap className="w-8 h-8 mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">SDK Libraries</h3>
              <p className="text-sm opacity-60 mb-6">Official libraries for Node.js, Python, Go, and Ruby.</p>
              <a href="#" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold border border-white/10 transition-all">View SDKs →</a>
            </div>
          </div>

          <div className="prose prose-blue">
            <h2>Introduction</h2>
            <p>Welcome to the BillForge documentation. BillForge is a flexible, developer-first billing engine that allows you to manage subscriptions, invoices, and payments globally.</p>
            <h3>How it works</h3>
            <p>BillForge sits between your application and your payment gateway (like Stripe or Razorpay), handling the complex business logic of tiers, trials, and renewals so you don't have to.</p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 font-mono text-sm overflow-hidden">
              <p className="text-blue-600">GET /v1/customers</p>
              <pre className="mt-2 text-gray-800">
{`{
  "object": "list",
  "data": [
    {
      "id": "cus_123",
      "email": "jane@company.com",
      "plan": "growth"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

import { MarketingPageLayout } from '@/components/marketing-layout';
import { Book, Code, Zap, Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      items: ['Introduction', 'Quickstart Guide', 'API Keys', 'SDKs'],
    },
    {
      title: 'Billing Core',
      items: [
        'Creating Plans',
        'Subscription Lifecycle',
        'Webhooks',
        'Tax Calculation',
      ],
    },
    {
      title: 'Advanced',
      items: [
        'Multi-currency',
        'Enterprise Invoicing',
        'Customer Portal',
        'Analytics API',
      ],
    },
  ];

  return (
    <MarketingPageLayout
      title="Documentation"
      subtitle="Everything you need to integrate and scale your billing infrastructure with Noxfolio."
      icon={Book}
    >
      <div className="flex flex-col gap-12 md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full shrink-0 space-y-8 md:w-64">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search docs..."
              className="rounded-xl border-gray-100 bg-gray-50 pl-10"
            />
          </div>

          <nav className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="mb-3 px-3 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                      >
                        {item}
                        <ChevronRight className="h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl shadow-blue-500/20">
              <Code className="mb-4 h-8 w-8 opacity-80" />
              <h3 className="mb-2 text-xl font-bold">API Reference</h3>
              <p className="mb-6 text-sm opacity-80">
                Explore our REST endpoints and interactive playground.
              </p>
              <a
                href="/docs/api"
                className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold transition-all hover:bg-white/20"
              >
                Explore API →
              </a>
            </div>
            <div className="rounded-3xl bg-gray-900 p-8 text-white">
              <Zap className="mb-4 h-8 w-8 text-yellow-400" />
              <h3 className="mb-2 text-xl font-bold">SDK Libraries</h3>
              <p className="mb-6 text-sm opacity-60">
                Official libraries for Node.js, Python, Go, and Ruby.
              </p>
              <a
                href="#"
                className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold transition-all hover:bg-white/20"
              >
                View SDKs →
              </a>
            </div>
          </div>

          <div className="prose prose-blue">
            <h2>Introduction</h2>
            <p>
              Welcome to the Noxfolio documentation. Noxfolio is a flexible,
              developer-first billing engine that allows you to manage
              subscriptions, invoices, and payments globally.
            </p>
            <h3>How it works</h3>
            <p>
              Noxfolio sits between your application and your payment gateway
              (like Stripe or Razorpay), handling the complex business logic of
              tiers, trials, and renewals so you don't have to.
            </p>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6 font-mono text-sm">
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

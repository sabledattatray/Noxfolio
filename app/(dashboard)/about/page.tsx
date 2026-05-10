import { MarketingPageLayout } from '@/components/marketing-layout';
import { Users, Target, Rocket } from 'lucide-react';

export default function AboutPage() {
  return (
    <MarketingPageLayout
      title="Empowering the next generation of SaaS"
      subtitle="Noxfolio was founded to solve the most painful part of building a business: billing. We provide the foundation, you provide the vision."
      icon={Users}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p>
              At Noxfolio, we believe that developers should spend their time
              building product features, not wrestling with complex subscription
              logic and regional compliance.
            </p>
            <p className="mt-4">
              Our mission is to provide the most robust, secure, and
              developer-friendly billing foundation on the planet.
            </p>
          </div>
          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-8">
            <Target className="mb-4 h-12 w-12 text-blue-600" />
            <h3 className="mb-2 text-xl font-bold">Built for Scale</h3>
            <p className="text-sm">
              From your first customer to your first million, Noxfolio scales
              with you without missing a beat.
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                title: 'Security First',
                desc: 'Financial data is sacred. We treat it with the highest level of care and encryption.',
              },
              {
                title: 'Developer Joy',
                desc: 'APIs and documentation that actually make sense and help you ship faster.',
              },
              {
                title: 'Extreme Reliability',
                desc: 'Our infrastructure is designed for 99.999% uptime, because your revenue depends on it.',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h4 className="mb-2 font-bold text-gray-900">{value.title}</h4>
                <p className="text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

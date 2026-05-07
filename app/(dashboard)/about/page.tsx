import { MarketingPageLayout } from '@/components/marketing-layout';
import { Users, Target, Rocket } from 'lucide-react';

export default function AboutPage() {
  return (
    <MarketingPageLayout 
      title="Empowering the next generation of SaaS"
      subtitle="BillForge was founded to solve the most painful part of building a business: billing. We provide the foundation, you provide the vision."
      icon={Users}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p>
              At BillForge, we believe that developers should spend their time building product features, not wrestling with complex subscription logic and regional compliance. 
            </p>
            <p className="mt-4">
              Our mission is to provide the most robust, secure, and developer-friendly billing foundation on the planet.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <Target className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Built for Scale</h3>
            <p className="text-sm">From your first customer to your first million, BillForge scales with you without missing a beat.</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: 'Security First', desc: 'Financial data is sacred. We treat it with the highest level of care and encryption.' },
              { title: 'Developer Joy', desc: 'APIs and documentation that actually make sense and help you ship faster.' },
              { title: 'Extreme Reliability', desc: 'Our infrastructure is designed for 99.999% uptime, because your revenue depends on it.' }
            ].map(value => (
              <div key={value.title} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

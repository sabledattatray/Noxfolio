import { MarketingPageLayout } from '@/components/marketing-layout';
import { ShieldCheck, Lock, Eye, Terminal, Shield, CheckCircle2 } from 'lucide-react';

export default function SecurityPage() {
  return (
    <MarketingPageLayout 
      title="Bank-grade security for your revenue"
      subtitle="Security isn't a feature at BillForge—it's our foundation. We employ rigorous standards to ensure your data and your customers' data are always protected."
      icon={ShieldCheck}
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Lock, title: 'PCI DSS Level 1', desc: 'Our infrastructure is fully compliant with the highest industry standard for payment data.' },
            { icon: Shield, title: 'SOC 2 Type II', desc: 'Independent audits verify our internal controls for security, availability, and confidentiality.' },
            { icon: Eye, title: '24/7 Monitoring', desc: 'Real-time threat detection and automated response systems guard our perimeter around the clock.' }
          ].map(item => (
            <div key={item.title} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
              <item.icon className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Infrastructure Security</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Data Encryption</h4>
                <p className="text-sm">All data is encrypted at rest using AES-256 and in transit using TLS 1.3. Your database secrets are managed via hardware security modules (HSM).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Network Isolation</h4>
                <p className="text-sm">Our production environment is logically isolated using VPCs and subnets, with strict ingress/egress rules and zero-trust networking.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">Vulnerability Management</h4>
                <p className="text-sm">We run automated vulnerability scans and engage with third-party security researchers for quarterly penetration tests.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-[32px] p-10 text-white overflow-hidden relative group">
          <Terminal className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
          <h3 className="text-2xl font-bold mb-4">Responsible Disclosure</h3>
          <p className="opacity-80 mb-6">Found a security vulnerability? We value the work of security researchers. Please report bugs via our official bug bounty program.</p>
          <a href="mailto:security@billforge.com" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all inline-block border border-white/10">
            security@billforge.com
          </a>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

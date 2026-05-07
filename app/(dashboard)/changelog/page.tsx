import { MarketingPageLayout } from '@/components/marketing-layout';
import { Activity, Rocket, Star, Sparkles, Code } from 'lucide-react';

export default function ChangelogPage() {
  const updates = [
    { 
      date: 'May 7, 2026', 
      version: 'v2.4.0',
      title: 'Enhanced Simulation Engine', 
      desc: 'Significant improvements to our developer simulation environment, allowing for realistic plan upgrades and portal testing without active Stripe keys.',
      type: 'Feature',
      icon: Rocket
    },
    { 
      date: 'April 22, 2026', 
      version: 'v2.3.5',
      title: 'Multi-signature Authorization', 
      desc: 'Our middleware now supports variable argument signatures for server actions, improving compatibility with modern React hooks.',
      type: 'Improvement',
      icon: Code
    },
    { 
      date: 'April 10, 2026', 
      version: 'v2.3.0',
      title: 'Custom Branding Engine', 
      desc: 'Launched the initial version of our white-labeling tools, enabling organizations to customize their dashboard appearance.',
      type: 'New',
      icon: Sparkles
    }
  ];

  return (
    <MarketingPageLayout 
      title="Product Updates"
      subtitle="Follow the journey of BillForge. New features, improvements, and bug fixes delivered weekly."
      icon={Activity}
    >
      <div className="space-y-16">
        {updates.map((update, i) => (
          <div key={i} className="relative pl-12 border-l border-gray-100 pb-16 last:pb-0">
            <div className="absolute left-[-20px] top-0 p-2 rounded-xl bg-white border border-gray-100 text-blue-600 shadow-sm">
              <update.icon className="w-5 h-5" />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
              <span className="text-sm font-bold text-gray-400 font-mono">{update.date}</span>
              <span className="hidden sm:inline text-gray-200">•</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-tighter">
                {update.version}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                update.type === 'New' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {update.type}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">{update.title}</h3>
            <p className="text-gray-500 leading-relaxed mb-6">{update.desc}</p>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Detailed Changes</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Initial release of simulation redirects.</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Improved error handling for auth mismatches.</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Performance optimizations for billing cards.</li>
              </ul>
            </div>
          </div>
        ))}

        <div className="pt-12 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-6">Want to stay updated via email?</p>
          <div className="flex justify-center max-w-sm mx-auto gap-2">
            <input placeholder="jane@company.com" className="flex-1 rounded-xl border border-gray-200 px-4 text-sm" />
            <button className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all">Subscribe</button>
          </div>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

import { MarketingPageLayout } from '@/components/marketing-layout';
import { Activity, Clock, Terminal } from 'lucide-react';

export default function StatusPage() {
  const services = [
    { name: 'API Gateway', status: 'operational' },
    { name: 'Billing Engine', status: 'operational' },
    { name: 'Dashboard UI', status: 'operational' },
    { name: 'Webhook Deliveries', status: 'operational' },
    { name: 'Database Clusters', status: 'operational' },
  ];

  return (
    <MarketingPageLayout 
      title="System Status"
      subtitle="Real-time monitoring and incident reports for all BillForge services."
      icon={Activity}
    >
      <div className="space-y-12">
        <div className="p-8 rounded-[32px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-4 text-emerald-600">
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
            <h2 className="text-2xl font-bold">All Systems Operational</h2>
          </div>
          <p className="text-sm font-medium text-emerald-600/80">Refreshed: Just now</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(service => (
            <div key={service.name} className="p-6 rounded-2xl border border-gray-100 bg-white flex justify-between items-center">
              <span className="font-bold text-gray-900">{service.name}</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-widest">
                {service.status}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            Past Incidents
          </h3>
          <div className="space-y-8">
            {[
              { date: 'May 1, 2026', title: 'Increased latency in US-East-1', description: 'Monitoring showed a spike in response times for the API Gateway. Resolved within 12 minutes.', status: 'Resolved' },
              { date: 'April 14, 2026', title: 'Webhook delivery delays', description: 'A backlog in our message queue caused a 5-minute delay in webhook deliveries.', status: 'Resolved' }
            ].map(incident => (
              <div key={incident.date} className="relative pl-8 border-l-2 border-gray-100 pb-8 last:pb-0">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-200" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{incident.date}</p>
                <h4 className="font-bold text-gray-900 mb-2">{incident.title}</h4>
                <p className="text-sm text-gray-500 mb-2 leading-relaxed">{incident.description}</p>
                <span className="text-[10px] font-black text-emerald-500 uppercase">{incident.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

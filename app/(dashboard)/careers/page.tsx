import { MarketingPageLayout } from '@/components/marketing-layout';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CareersPage() {
  const jobs = [
    { title: 'Senior Software Engineer (Backend)', team: 'Infrastructure', type: 'Full-time', location: 'Remote / SF' },
    { title: 'Frontend Engineer', team: 'Product', type: 'Full-time', location: 'Remote / London' },
    { title: 'Security Compliance Manager', team: 'Legal & Risk', type: 'Full-time', location: 'Remote' },
    { title: 'Developer Advocate', team: 'Marketing', type: 'Full-time', location: 'Remote / NYC' },
  ];

  return (
    <MarketingPageLayout 
      title="Join the team building the future of commerce"
      subtitle="We are a small, distributed team of engineering-obsessed humans building the tools we wish we had."
      icon={Briefcase}
    >
      <div className="space-y-12">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl shadow-blue-500/20">
          <h2 className="text-3xl font-bold mb-4 italic">"The best work is done when the foundation is invisible."</h2>
          <p className="opacity-90">We're looking for builders who care about the details—the kind of people who get excited about idempotent APIs and elegant schema migrations.</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Open Roles</h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-blue-500 hover:shadow-lg transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {job.location}</span>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {job.type}</span>
                    <span className="font-medium text-blue-600">{job.team}</span>
                  </div>
                </div>
                <Button className="rounded-xl group-hover:bg-blue-600 transition-colors">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-gray-100">
          <div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">Perks & Benefits</h3>
            <ul className="space-y-3 text-sm">
              <li>🏠 Fully remote culture with flexible hours</li>
              <li>💻 $5,000 yearly setup and education stipend</li>
              <li>🌍 Annual company offsites in beautiful locations</li>
              <li>🏖️ Unlimited PTO with 3-week minimum</li>
              <li>📈 Equity in a fast-growing foundation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">Don't see a fit?</h3>
            <p className="text-sm mb-6 leading-relaxed">We're always looking for exceptional talent. If you're passionate about billing infrastructure but don't see the right role, send us a note.</p>
            <a href="mailto:careers@billforge.com" className="text-blue-600 font-bold hover:underline">careers@billforge.com →</a>
          </div>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

import { MarketingPageLayout } from '@/components/marketing-layout';
import { FileText } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    { title: 'Information We Collect', content: 'We collect information you provide directly to us when you create an account, such as your name, email, and company details. We also collect transaction data required for billing.' },
    { title: 'How We Use Information', content: 'Your information is used to provide, maintain, and improve our billing services, process payments, and communicate with you about your account.' },
    { title: 'Data Retention', content: 'We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal and accounting requirements.' },
    { title: 'Your Rights', content: 'Under GDPR and CCPA, you have the right to access, delete, or port your data. Contact us at privacy@billforge.com to exercise these rights.' }
  ];

  return (
    <MarketingPageLayout 
      title="Privacy Policy"
      subtitle="Last Updated: May 7, 2026. We are committed to protecting your personal data and being transparent about how we use it."
      icon={FileText}
    >
      <div className="space-y-12">
        {sections.map(section => (
          <div key={section.title}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <p className="leading-relaxed">{section.content}</p>
          </div>
        ))}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-sm">If you have any questions about this policy, please reach out to our Data Protection Officer at <a href="mailto:privacy@billforge.com" className="text-blue-600">privacy@billforge.com</a>.</p>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

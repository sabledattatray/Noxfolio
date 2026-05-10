import { MarketingPageLayout } from '@/components/marketing-layout';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <MarketingPageLayout
      title="Terms of Service"
      subtitle="Last updated: May 10, 2026"
      icon={FileText}
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Welcome to Noxfolio. By using our services, you agree to these
          terms...
        </p>
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using Noxfolio, you agree to be bound by these Terms
          of Service and all applicable laws and regulations.
        </p>
        <h3>2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the
          materials (information or software) on Noxfolio's website for
          personal, non-commercial transitory viewing only.
        </p>
      </div>
    </MarketingPageLayout>
  );
}

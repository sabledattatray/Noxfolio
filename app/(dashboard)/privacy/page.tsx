import { MarketingPageLayout } from '@/components/marketing-layout';
import { ShieldCheck, Lock, Eye, FileLock, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <MarketingPageLayout
      title="Privacy Policy"
      subtitle="How we protect and manage your data."
      icon={Lock}
    >
      <div className="prose prose-lg dark:prose-invert animate-in fade-in slide-in-from-bottom-4 max-w-none space-y-12 duration-500">
        <section className="space-y-4">
          <div className="text-primary flex items-center gap-3">
            <Eye className="h-6 w-6" />
            <h2 className="m-0 text-2xl font-black tracking-tight">
              1. Data Collection
            </h2>
          </div>
          <p className="text-muted-foreground font-medium">
            We collect information that you provide directly to us when you
            create an account, such as your name, email address, and payment
            information. We also collect usage data to improve our autonomous
            billing agents.
          </p>
        </section>

        <section className="space-y-4">
          <div className="text-primary flex items-center gap-3">
            <ShieldCheck className="h-6 w-6" />
            <h2 className="m-0 text-2xl font-black tracking-tight">
              2. Data Security
            </h2>
          </div>
          <p className="text-muted-foreground font-medium">
            Your data is encrypted at rest using AES-256 and in transit using
            TLS 1.3. We employ strict data isolation protocols to ensure that no
            organizational data is leaked between tenants.
          </p>
        </section>

        <section className="space-y-4">
          <div className="text-primary flex items-center gap-3">
            <FileLock className="h-6 w-6" />
            <h2 className="m-0 text-2xl font-black tracking-tight">
              3. Data Retention
            </h2>
          </div>
          <p className="text-muted-foreground font-medium">
            We retain your information for as long as your account is active or
            as needed to provide you with services. You can request data
            deletion at any time via the security dashboard.
          </p>
        </section>

        <section className="space-y-4">
          <div className="text-primary flex items-center gap-3">
            <UserCheck className="h-6 w-6" />
            <h2 className="m-0 text-2xl font-black tracking-tight">
              4. Your Rights
            </h2>
          </div>
          <p className="text-muted-foreground font-medium">
            Under GDPR and CCPA, you have the right to access, rectify, or erase
            your personal data. Our platform provides self-service tools to
            exercise these rights autonomously.
          </p>
        </section>
      </div>
    </MarketingPageLayout>
  );
}

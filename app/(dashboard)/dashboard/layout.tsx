import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';
import { DynamicThemeProvider } from '@/components/dashboard/dynamic-theme-provider';
import { ErrorBoundary } from '@/components/error-boundary';
import { getOrganizationForUser } from '@/lib/db/queries';

import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const org = await getOrganizationForUser();

  // Enforce onboarding for new/unconfigured organizations
  // We check for website because it's a required field in our new onboarding flow
  if (!org || !org.website) {
    redirect('/onboarding');
  }

  const branding = (org?.branding as any) || {};

  return (
    <DynamicThemeProvider branding={branding}>
      <div className="bg-background flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="mx-auto max-w-6xl space-y-8">
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
          </main>
        </div>
      </div>
    </DynamicThemeProvider>
  );
}

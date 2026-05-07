import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';
import { DynamicThemeProvider } from '@/components/dashboard/dynamic-theme-provider';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicThemeProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DynamicThemeProvider>
  );
}

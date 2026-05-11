import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Work_Sans } from 'next/font/google';
import { getUser, getOrganizationForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Noxfolio - Enterprise SaaS Billing Foundation',
  description:
    'The ultimate enterprise-grade SaaS billing and management foundation.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
  let org = null;

  try {
    user = await getUser();
    org = await getOrganizationForUser();
  } catch (error) {
    console.error('Layout data fetch error:', error);
  }

  return (
    <html lang="en" className={workSans.variable} suppressHydrationWarning>
      <body
        className="bg-background text-foreground min-h-[100dvh] antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="noxfolio-theme"
        >
          <SWRConfig
            value={{
              fallback: { '/api/user': user, '/api/organization': org },
            }}
          >
            {children}
          </SWRConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getOrganizationForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'BillForge - Enterprise SaaS Billing Foundation',
  description: 'The ultimate enterprise-grade SaaS billing and management foundation.'
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

import { ThemeProvider } from '@/components/theme-provider';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const org = await getOrganizationForUser();
  const branding = org?.branding as any || {};
  
  // Helper to convert hex to HSL string for Tailwind
  const hexToHsl = (hex: string) => {
    if (!hex || !hex.startsWith('#')) return null;
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) h = s = 0;
    else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h = Math.round(h! * 60);
    }
    return `${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const primaryHsl = hexToHsl(branding.primaryColor);
  const accentHsl = hexToHsl(branding.accentColor);

  return (
    <html
      lang="en"
      className={`${manrope.className}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            ${primaryHsl ? `--primary: ${primaryHsl};` : ''}
            ${accentHsl ? `--accent: ${accentHsl};` : ''}
          }
          .dark {
            ${primaryHsl ? `--primary: ${primaryHsl};` : ''}
            ${accentHsl ? `--accent: ${accentHsl};` : ''}
          }
        ` }} />
      </head>
      <body className="min-h-[100dvh] bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SWRConfig
            value={{
              fallback: {
                '/api/user': getUser(),
                '/api/organization': org
              }
            }}
          >
            {children}
          </SWRConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}

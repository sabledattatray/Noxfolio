import React from 'react';
import { Footer } from '@/components/footer';
import MarketingNav from '@/components/marketing-nav';
import { FooterVisibilityWrapper } from '@/components/footer-visibility-wrapper';
import { headers } from 'next/headers';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <section className="flex min-h-screen flex-col">
      {!isDashboard && <MarketingNav />}
      <main className="flex-grow">{children}</main>
      <FooterWrapper />
    </section>
  );
}

function FooterWrapper() {
  return (
    <FooterVisibilityWrapper>
      <Footer />
    </FooterVisibilityWrapper>
  );
}

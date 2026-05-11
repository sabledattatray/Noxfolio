import React from 'react';
import { Footer } from '@/components/footer';
import MarketingNav from '@/components/marketing-nav';
import { FooterVisibilityWrapper } from '@/components/footer-visibility-wrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen flex-col">
      <MarketingNav />
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

import React from 'react';
import { Footer } from '@/components/footer';
import { MarketingNav } from '@/components/marketing-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen flex-col">
      <MarketingNav />
      <main className="flex-grow">{children}</main>
      <FooterWrapper />
    </section>
  );
}

// We need a wrapper for footer to avoid it showing on dashboard too
// Since footer is likely a server component, we can use a client wrapper or just handle it inside
import { FooterVisibilityWrapper } from '@/components/footer-visibility-wrapper';

function FooterWrapper() {
  return (
    <FooterVisibilityWrapper>
      <Footer />
    </FooterVisibilityWrapper>
  );
}

'use client';

import Link from 'next/link';
import {
  Shield,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Globe,
  Cpu,
  Lock,
  FileText,
  Users,
  HelpCircle,
  Activity,
  Heart,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Industries', href: '/industries' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Calculator', href: '/pricing-calculator' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/docs/api' },
        { name: 'Changelog', href: '/changelog' },
        { name: 'Status', href: '/status' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers', badge: 'Hiring' },
        { name: 'Contact', href: '/contact' },
        { name: 'Security', href: '/security' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/privacy' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/docs' },
        { name: 'Community', href: '#' },
        { name: 'Support Email', href: 'mailto:support@noxfolio.com' },
      ],
    },
  ];

  return (
    <footer className="bg-background border-border mt-auto border-t pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main Footer Grid - 6 Columns total on Desktop */}
        <div className="mb-20 grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="group mb-6 flex items-center gap-1">
              <img
                src="/logo.svg"
                alt="Noxfolio Logo"
                className="h-10 w-10 transition-transform group-hover:scale-110"
              />
              <span className="text-xl font-bold tracking-tighter text-black dark:text-white">
                Noxfolio
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 text-xs leading-relaxed font-medium">
              AI-powered automation platform that transforms how businesses
              operate. <br className="hidden md:block" /> Stop managing tasks,
              start automating everything.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-lg p-2 transition-all"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-lg p-2 transition-all"
              >
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-foreground mb-8 text-[10px] font-black tracking-[0.2em] uppercase">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary inline-block text-xs font-bold transition-colors"
                    >
                      {link.name}
                      {link.badge && (
                        <span className="bg-brand-pink/10 text-brand-pink ml-2 rounded px-1.5 py-0.5 text-[9px] font-black tracking-tighter uppercase">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-border flex flex-col items-center justify-between gap-6 border-t pt-10 lg:flex-row">
          <div className="text-muted-foreground/60 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
            <span>© {currentYear} Noxfolio Foundation</span>
            <span className="mx-2 opacity-20">|</span>
            <span className="flex items-center">
              Made with{' '}
              <Heart className="text-brand-red mx-1 h-3 w-3 fill-current" /> by
              Datta Sable
            </span>
          </div>

          <nav className="text-muted-foreground/60 flex flex-wrap items-center justify-center gap-8 text-[10px] font-black tracking-widest uppercase">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/security"
              className="hover:text-primary transition-colors"
            >
              Security
            </Link>
            <Link
              href="/status"
              className="flex items-center transition-colors hover:text-emerald-500"
            >
              <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Systems Operational
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

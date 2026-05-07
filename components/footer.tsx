'use client';

import Link from 'next/link';
import { Shield, Twitter, Github, Linkedin, Mail, Globe, Cpu, Lock, FileText, Users, HelpCircle, Activity } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Changelog', href: '/changelog', icon: Activity },
        { name: 'Documentation', href: '/docs', icon: FileText },
        { name: 'API Reference', href: '/docs/api', icon: Cpu },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers', badge: 'Hiring' },
        { name: 'Contact', href: '/contact' },
        { name: 'Status', href: '/status', icon: Globe },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Security', href: '/security', icon: Lock },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/docs' },
        { name: 'Community', href: '#' },
        { name: 'Support Email', href: 'mailto:support@billforge.com' },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-800 pt-16 pb-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white tracking-tight">BillForge</span>
            </Link>
            <p className="text-gray-500 dark:text-zinc-400 text-sm max-w-xs mb-6 leading-relaxed">
              The ultimate enterprise billing foundation for modern SaaS. Built for scale, security, and developer happiness.
            </p>
            <div className="flex space-x-5">
              <Link href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="mailto:hello@billforge.com" className="text-gray-400 hover:text-red-500 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center text-sm group"
                    >
                      {link.icon && <link.icon className="w-4 h-4 mr-2 text-gray-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors" />}
                      {link.name}
                      {link.badge && (
                        <span className="ml-2 px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded uppercase tracking-tighter">
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

        <div className="pt-8 border-t border-gray-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 dark:text-zinc-500 text-xs">
            © {currentYear} BillForge Foundation, Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-[10px] text-gray-400 dark:text-zinc-500 font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
              All systems operational
            </span>
            <div className="flex space-x-4 text-xs font-medium text-gray-400 dark:text-zinc-500">
              <Link href="/privacy" className="hover:text-gray-600 dark:hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-600 dark:hover:text-white">Terms</Link>
              <Link href="/security" className="hover:text-gray-600 dark:hover:text-white">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AIChat } from './ai-chat';
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
  ChevronDown,
  Home,
  Building2,
  Briefcase,
  Box,
  Layers,
  CheckSquare,
  MessageSquare,
  FileText,
  User as UserIcon,
  Sliders,
  Mail,
  BarChart3,
  UserCog,
  Server,
  LayoutDashboard,
  Users,
  CreditCard,
  ExternalLink,
  Settings,
  Workflow,
  Hammer,
  Wand2,
  PlayCircle,
  Sparkles,
  Database,
  Bot,
  Megaphone,
  Filter,
  Folder,
  MessageCircle,
  Phone,
  Inbox,
  Shield,
  Bell,
  Key,
  Webhook,
  ShieldCheck,
  UserCheck,
  PencilLine,
  HelpCircle,
  Globe,
} from 'lucide-react';
import { signOut } from '@/app/(dashboard)/actions';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import type { Organization, User } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data: org } = useSWR<Organization>('/api/organization', fetcher);
  const { data: user } = useSWR<User & { role: string }>('/api/user', fetcher);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveRole = mounted
    ? localStorage.getItem('noxfolio_role_override') || user?.role
    : user?.role;

  const isAdmin = effectiveRole === 'admin';

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const menuGroups = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    {
      label: 'CRM',
      icon: Users,
      children: [
        { href: '/dashboard/contacts', icon: Users, label: 'Contacts' },
        { href: '/dashboard/companies', icon: Building2, label: 'Companies' },
        { href: '/dashboard/deals', icon: Briefcase, label: 'Deals' },
        { href: '/dashboard/products', icon: Box, label: 'Products' },
        { href: '/dashboard/space', icon: Layers, label: 'My Space' },
        { href: '/dashboard/billing', icon: CreditCard, label: 'Payments' },
        { href: '/dashboard/tasks', icon: CheckSquare, label: 'Tasks' },
        { href: '/dashboard/forum', icon: MessageSquare, label: 'Forum' },
        { href: '/dashboard/forms', icon: FileText, label: 'Forms' },
        { href: '/dashboard/visitors', icon: UserIcon, label: 'Visitors' },
        { href: '/dashboard/config', icon: Sliders, label: 'Config' },
      ],
    },
    {
      label: 'Channels',
      icon: Mail,
      children: [
        {
          href: '/dashboard/channels/campaigns',
          icon: Megaphone,
          label: 'Campaigns',
        },
        {
          href: '/dashboard/channels/templates',
          icon: FileText,
          label: 'Templates',
        },
        {
          href: '/dashboard/channels/segments',
          icon: Filter,
          label: 'Segments',
        },
        { href: '/dashboard/channels/assets', icon: Folder, label: 'Assets' },
        {
          href: '/dashboard/channels/whatsapp',
          icon: MessageCircle,
          label: 'WhatsApp',
        },
        { href: '/dashboard/channels/voice', icon: Phone, label: 'Voice' },
        { href: '/dashboard/channels/chatbot', icon: Bot, label: 'Chatbot' },
        { href: '/dashboard/channels/inbox', icon: Inbox, label: 'Inbox' },
      ],
    },
    {
      label: 'Automation',
      icon: Zap,
      children: [
        {
          href: '/dashboard/automation/workflows',
          icon: Workflow,
          label: 'Workflows',
        },
        { href: '/dashboard/marketplace', icon: Box, label: 'Marketplace' },
        {
          href: '/dashboard/automation/builder',
          icon: Hammer,
          label: 'Builder',
        },
        {
          href: '/dashboard/automation/skills',
          icon: Wand2,
          label: 'Agent Skills',
        },
        {
          href: '/dashboard/automation/executions',
          icon: PlayCircle,
          label: 'Executions',
        },
        {
          href: '/dashboard/automation/evaluation',
          icon: Sparkles,
          label: 'AI Evaluation',
        },
        {
          href: '/dashboard/automation/kb',
          icon: Database,
          label: 'Knowledge Base',
        },
        {
          href: '/dashboard/automation/prompts',
          icon: MessageSquare,
          label: 'Prompt Library',
        },
        {
          href: '/dashboard/automation/sync',
          icon: BarChart3,
          label: 'Vector Sync',
        },
        { href: '/dashboard/automation/agent', icon: Bot, label: 'Data Agent' },
        {
          href: '/dashboard/automation/config',
          icon: Sliders,
          label: 'Config',
        },
      ],
    },
    {
      href: '/dashboard/analytics',
      icon: BarChart3,
      label: 'Analytics',
      hasChevron: true,
    },
    {
      label: 'Settings',
      icon: Settings,
      children: [
        { href: '/dashboard/admin', icon: Shield, label: 'Admin' },
        { href: '/dashboard/settings', icon: UserIcon, label: 'My Account' },
        {
          href: '/dashboard/organization',
          icon: Building2,
          label: 'My Business',
        },
        {
          href: '/dashboard/settings/notifications',
          icon: Bell,
          label: 'Notifications',
        },
        {
          href: '/dashboard/billing',
          icon: CreditCard,
          label: 'Billing & Pricing',
        },
        { href: '/dashboard/developer', icon: Key, label: 'API Keys' },
        { href: '/dashboard/marketplace', icon: Zap, label: 'Integrations' },
        {
          href: '/dashboard/developer/webhooks',
          icon: Webhook,
          label: 'Webhooks',
        },
        {
          href: '/dashboard/settings/access',
          icon: ShieldCheck,
          label: 'User Access',
        },
        {
          href: '/dashboard/settings/roles',
          icon: UserCheck,
          label: 'Roles & Permissions',
        },
        {
          href: '/dashboard/settings/entities',
          icon: PencilLine,
          label: 'Entity Names',
        },
        {
          href: '/dashboard/analytics',
          icon: BarChart3,
          label: 'Usage Statistics',
        },
        { href: '/dashboard/docs', icon: HelpCircle, label: 'Support' },
      ],
    },
    ...(org?.website
      ? [
          {
            label: 'Linked Site',
            icon: Globe,
            href: org.website.startsWith('http')
              ? org.website
              : `https://${org.website}`,
            isExternal: true,
          },
        ]
      : []),
  ];

  const adminItems = [
    { href: '/dashboard/admin/users', icon: UserCog, label: 'Platform Users' },
    {
      href: '/dashboard/admin/infrastructure',
      icon: Server,
      label: 'Global Infrastructure',
    },
  ];

  async function handleSignOut() {
    localStorage.removeItem('noxfolio_role_override');
    await signOut();
    router.refresh();
    router.push('/sign-in');
  }

  return (
    <aside
      className={cn(
        'border-border bg-card relative sticky top-0 flex h-screen flex-col rounded-none border-r transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-[80px]' : 'w-[280px]',
        className,
      )}
    >
      <div className="flex items-center justify-between p-6">
        {!isCollapsed && (
          <Link
            href="/dashboard"
            className="flex items-center gap-3 transition-all hover:opacity-80"
          >
            <img src="/logo.svg" alt="Noxfolio" className="h-9 w-9" />
            <span className="text-foreground text-2xl font-black tracking-tighter">
              Noxfolio
            </span>
          </Link>
        )}
        {isCollapsed && (
          <img
            src="/logo.svg"
            alt="Noxfolio Logo"
            className="mx-auto h-10 w-10 rounded-none"
          />
        )}
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-2">
        <div className="space-y-1">
          {menuGroups.map((group) => {
            const hasChildren = group.children && group.children.length > 0;
            const isOpen = openMenu === group.label;
            const isActive = !hasChildren && pathname === group.href;

            if (!hasChildren) {
              return (
                <Link
                  key={group.label}
                  href={group.href || '#'}
                  target={group.isExternal ? '_blank' : undefined}
                  rel={group.isExternal ? 'noopener noreferrer' : undefined}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      'group relative h-11 w-full justify-start gap-4 rounded-xl px-4 transition-all duration-200',
                      isActive
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                      isCollapsed && 'justify-center px-0',
                    )}
                  >
                    <group.icon
                      className={cn(
                        'h-5 w-5 shrink-0 transition-colors',
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-foreground',
                      )}
                    />
                    {!isCollapsed && (
                      <span className="flex-1 truncate text-left text-sm font-semibold tracking-tight">
                        {group.label}
                      </span>
                    )}
                    {!isCollapsed && group.isExternal && (
                      <ExternalLink className="h-3 w-3 opacity-30" />
                    )}
                    {isActive && !group.isExternal && (
                      <div className="bg-primary absolute right-0 h-5 w-1 rounded-l-full" />
                    )}
                  </Button>
                </Link>
              );
            }

            return (
              <div key={group.label} className="space-y-1">
                <Button
                  variant="ghost"
                  onClick={() => toggleMenu(group.label)}
                  className={cn(
                    'group h-11 w-full justify-start gap-4 rounded-xl px-4 transition-all duration-200',
                    isOpen
                      ? 'bg-accent/30 text-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                    isCollapsed && 'justify-center px-0',
                  )}
                >
                  <group.icon
                    className={cn(
                      'h-5 w-5 shrink-0 transition-colors',
                      isOpen
                        ? 'text-foreground'
                        : 'text-muted-foreground group-hover:text-foreground',
                    )}
                  />
                  {!isCollapsed && (
                    <span className="flex-1 truncate text-left text-sm font-semibold tracking-tight">
                      {group.label}
                    </span>
                  )}
                  {!isCollapsed && (
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 shrink-0 opacity-30 transition-transform duration-300',
                        isOpen && 'rotate-180 opacity-100',
                      )}
                    />
                  )}
                </Button>

                {isOpen && !isCollapsed && (
                  <div className="border-border relative ml-4 space-y-1 border-l pl-2">
                    {group.children?.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block"
                        >
                          <Button
                            variant="ghost"
                            className={cn(
                              'group h-9 w-full justify-start gap-4 rounded-lg px-2 transition-all duration-200',
                              isChildActive
                                ? 'text-primary font-bold'
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                            )}
                          >
                            <child.icon className="h-4 w-4 shrink-0" />
                            <span className="truncate text-left text-sm font-medium">
                              {child.label}
                            </span>
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Admin Console (Conditional) */}
        {isAdmin && (
          <div className="animate-in fade-in slide-in-from-left-4 space-y-1 duration-500">
            <p
              className={cn(
                'text-primary mb-4 px-4 text-[10px] font-black tracking-widest uppercase',
                isCollapsed && 'px-0 text-center',
              )}
            >
              Admin Console
            </p>
            {adminItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'group h-11 w-full justify-start gap-4 rounded-xl px-4 transition-all duration-300',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                      isCollapsed && 'justify-center px-0',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'h-5 w-5',
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-primary',
                      )}
                    />
                    {!isCollapsed && (
                      <span className="text-xs font-bold tracking-tight uppercase">
                        {item.label}
                      </span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-4 py-4">
        {isCollapsed ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsChatOpen(true)}
            className="hover:bg-primary/10 group h-11 w-full rounded-none"
          >
            <Sparkles className="text-primary h-5 w-5 animate-pulse transition-transform group-hover:scale-110" />
          </Button>
        ) : (
          <div className="group relative overflow-hidden rounded-none border border-indigo-500/20 bg-indigo-500/10 p-4 backdrop-blur-sm transition-colors hover:border-indigo-500/40">
            <div className="absolute top-0 right-0 p-1 opacity-10 transition-opacity group-hover:opacity-20">
              <Sparkles className="h-12 w-12 text-indigo-500" />
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-pulse text-indigo-500" />
              <span className="text-xs font-black tracking-widest text-indigo-500 uppercase">
                Noxify AI
              </span>
            </div>
            <p className="text-muted-foreground mb-3 text-[10px] leading-relaxed font-medium">
              Your personal AI automation assistant.
            </p>
            <Button
              size="sm"
              onClick={() => setIsChatOpen(true)}
              className="h-8 w-full rounded-none border-none bg-gradient-to-r from-indigo-600 to-violet-600 text-[10px] font-black tracking-widest text-white uppercase shadow-none transition-all hover:-translate-y-0.5 active:scale-95 dark:shadow-lg dark:shadow-indigo-500/20"
            >
              Ask Noxify
            </Button>
          </div>
        )}
      </div>

      <div className="border-border mt-auto space-y-2 border-t p-4">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={cn(
            'text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-11 w-full justify-start gap-4 rounded-none px-4 transition-all duration-200',
            isCollapsed && 'justify-center px-0',
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="text-sm font-bold">Sign Out</span>}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="border-border bg-background hover:bg-accent absolute top-20 -right-3 hidden h-6 w-6 items-center justify-center rounded-none border shadow-sm lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>

      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </aside>
  );
}

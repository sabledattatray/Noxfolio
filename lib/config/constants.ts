export const APP_CONFIG = {
  name: 'BillForge',
  description: 'Enterprise SaaS Billing Foundation',
  version: '1.0.0',
  contactEmail: 'support@billforge.com',
  links: {
    twitter: 'https://twitter.com/billforge',
    github: 'https://github.com/billforge',
    docs: 'https://docs.billforge.com',
  },
};

export const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  FINANCE: 'finance',
  DEVELOPER: 'developer',
  VIEWER: 'viewer',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const PERMISSIONS = {
  MANAGE_BILLING: 'manage:billing',
  MANAGE_TEAM: 'manage:team',
  VIEW_ANALYTICS: 'view:analytics',
  EDIT_SETTINGS: 'edit:settings',
} as const;

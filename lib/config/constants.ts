export const APP_CONFIG = {
  name: 'Noxfolio',
  description: 'Enterprise SaaS Billing Foundation',
  version: '1.0.0',
  contactEmail: 'support@noxfolio.com',
  links: {
    twitter: 'https://twitter.com/noxfolio',
    github: 'https://github.com/sabledattatray/Noxfolio',
    docs: 'https://docs.noxfolio.com',
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

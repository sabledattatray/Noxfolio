import { ROLES, UserRole } from '@/lib/config/constants';

type Permission = 'manage:billing' | 'manage:team' | 'view:analytics' | 'edit:settings';

const rolePermissions: Record<UserRole, Permission[]> = {
  [ROLES.OWNER]: ['manage:billing', 'manage:team', 'view:analytics', 'edit:settings'],
  [ROLES.ADMIN]: ['manage:team', 'view:analytics', 'edit:settings'],
  [ROLES.FINANCE]: ['manage:billing', 'view:analytics'],
  [ROLES.DEVELOPER]: ['view:analytics', 'edit:settings'],
  [ROLES.VIEWER]: ['view:analytics'],
};

export function hasPermission(role: string | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  const permissions = rolePermissions[role as UserRole];
  return permissions?.includes(permission) ?? false;
}

export function canManageBilling(role: string | null | undefined) {
  return hasPermission(role, 'manage:billing');
}

export function canManageTeam(role: string | null | undefined) {
  return hasPermission(role, 'manage:team');
}

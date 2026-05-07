export enum Role {
  SUPER_ADMIN = 'super_admin',
  ORG_OWNER = 'org_owner',
  FINANCE_ADMIN = 'finance_admin',
  SUPPORT_ADMIN = 'support_admin',
  DEVELOPER = 'developer',
  AUDITOR = 'auditor',
}

export const PERMISSIONS = {
  'billing:read': [Role.SUPER_ADMIN, Role.ORG_OWNER, Role.FINANCE_ADMIN, Role.AUDITOR],
  'billing:write': [Role.SUPER_ADMIN, Role.ORG_OWNER, Role.FINANCE_ADMIN],
  'api:read': [Role.SUPER_ADMIN, Role.ORG_OWNER, Role.DEVELOPER],
  'api:write': [Role.SUPER_ADMIN, Role.ORG_OWNER, Role.DEVELOPER],
  'audit:read': [Role.SUPER_ADMIN, Role.AUDITOR],
  'users:write': [Role.SUPER_ADMIN, Role.ORG_OWNER],
};

export class RBACService {
  /**
   * Check if a user has permission to perform an action
   */
  static hasPermission(userRole: Role, permission: keyof typeof PERMISSIONS): boolean {
    const allowedRoles = PERMISSIONS[permission];
    return allowedRoles.includes(userRole);
  }

  /**
   * Get role hierarchy (Higher index = more power)
   */
  static getRoleWeight(role: Role): number {
    const hierarchy = [
      Role.DEVELOPER,
      Role.AUDITOR,
      Role.SUPPORT_ADMIN,
      Role.FINANCE_ADMIN,
      Role.ORG_OWNER,
      Role.SUPER_ADMIN,
    ];
    return hierarchy.indexOf(role);
  }

  /**
   * Check if user can manage another user based on role hierarchy
   */
  static canManage(managerRole: Role, targetRole: Role): boolean {
    return this.getRoleWeight(managerRole) > this.getRoleWeight(targetRole);
  }
}

import { db } from '@/lib/db/drizzle';
import { auditLogs, NewAuditLog } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export class AuditLogService {
  /**
   * Create an immutable audit log entry
   */
  static async log(entry: Omit<NewAuditLog, 'id' | 'timestamp'>) {
    try {
      await db.insert(auditLogs).values({
        ...entry,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('[AUDIT_LOG_ERROR] Failed to write audit log:', error);
      // In a real enterprise app, you'd want to ensure this failure 
      // doesn't block the main transaction but is eventually consistent
    }
  }

  /**
   * Fetch audit logs for an organization
   */
  static async getLogs(organizationId: number, limit: number = 50) {
    return await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.organizationId, organizationId))
      .orderBy(desc(auditLogs.timestamp))
      .limit(limit);
  }

  /**
   * Special log for security events
   */
  static async logSecurityEvent(organizationId: number, userId: number, action: string, metadata: any) {
    await this.log({
      organizationId,
      userId,
      action,
      entityType: 'security',
      entityId: 'system',
      metadata,
    });
  }
}

import { db } from '@/lib/db/drizzle';
import { apiKeys } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'node:crypto';

export class APIKeyService {
  private static PREFIX = 'bf_live_';

  /**
   * Generate a new secure API key
   */
  static async createKey(organizationId: number, name: string, scopes: string[] = ['*']) {
    const rawKey = `${this.PREFIX}${crypto.randomBytes(24).toString('hex')}`;
    const hashedKey = this.hashKey(rawKey);

    await db.insert(apiKeys).values({
      organizationId,
      name,
      key: hashedKey,
      prefix: this.PREFIX,
      scopes,
      environment: 'live',
    });

    return rawKey; // Return raw key only once
  }

  /**
   * Securely hash an API key for storage
   */
  private static hashKey(key: string): string {
    return crypto.createHash('sha256').update(key).digest('hex');
  }

  /**
   * Validate an API key
   */
  static async validateKey(rawKey: string) {
    const hashedKey = this.hashKey(rawKey);
    const data = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.key, hashedKey))
      .limit(1);

    return data[0] || null;
  }
}

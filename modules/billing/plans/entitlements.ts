import { getPlanById } from './config';
import { Organization } from '@/lib/db/schema';

export class EntitlementsService {
  /**
   * Check if an organization has access to a feature
   */
  static async hasFeature(organization: Organization, featureKey: string): Promise<boolean> {
    const planId = organization.planName?.toLowerCase() || 'starter';
    const plan = getPlanById(planId);

    if (!plan) return false;

    // Custom enterprise logic could go here
    if (plan.metadata?.custom) return true;

    return plan.features.some((f) => f.toLowerCase().includes(featureKey.toLowerCase()));
  }

  /**
   * Get a specific limit from the plan metadata
   */
  static getLimit(organization: Organization, limitKey: string): number {
    const planId = organization.planName?.toLowerCase() || 'starter';
    const plan = getPlanById(planId);

    if (!plan || !plan.metadata) return 0;

    return plan.metadata[limitKey] ?? 0;
  }

  /**
   * Check if an organization has exceeded a limit
   */
  static async isLimitExceeded(organization: Organization, limitKey: string, currentUsage: number): Promise<boolean> {
    const limit = this.getLimit(organization, limitKey);
    
    if (limit === -1) return false; // Unlimited
    return currentUsage >= limit;
  }
}

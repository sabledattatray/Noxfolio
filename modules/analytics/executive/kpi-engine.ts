import { MRREngine } from '../revenue/mrr';
import { ChurnService, CustomerIntelligenceService } from '../customers/intelligence';
import { BillingAnalyticsService } from '../../billing/analytics';

export class KPIEngine {
  /**
   * Aggregate all core business KPIs
   */
  static async getExecutiveKPIs() {
    const activeCount = await BillingAnalyticsService.getActiveSubscriptionsCount();
    const mrr = await BillingAnalyticsService.getMRR();
    const arr = await BillingAnalyticsService.getARR();
    
    // Last 30 days window
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    
    const churnRate = await ChurnService.calculateChurnRate(thirtyDaysAgo, new Date());
    const arpu = await CustomerIntelligenceService.calculateARPU(mrr, activeCount);
    const ltv = await CustomerIntelligenceService.calculateLTV(arpu, churnRate);

    return {
      mrr: { value: mrr, change: 12.5, trend: 'up' },
      arr: { value: arr, change: 8.2, trend: 'up' },
      churnRate: { value: churnRate, change: -0.5, trend: 'down' },
      ltv: { value: ltv, change: 5.1, trend: 'up' },
      activeCustomers: { value: activeCount, change: 4.2, trend: 'up' },
    };
  }
}

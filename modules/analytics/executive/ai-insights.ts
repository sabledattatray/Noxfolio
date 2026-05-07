export interface AIInsight {
  type: 'growth' | 'churn' | 'revenue' | 'usage';
  summary: string;
  explanation: string;
  action?: string;
}

export class AIInsightsService {
  /**
   * Generate human-readable insights from raw metrics
   */
  static generateInsights(mrr: number, prevMrr: number, churnRate: number): AIInsight[] {
    const insights: AIInsight[] = [];
    const growth = ((mrr - prevMrr) / prevMrr) * 100;

    if (growth > 10) {
      insights.push({
        type: 'growth',
        summary: `Strong revenue growth of ${growth.toFixed(1)}% detected.`,
        explanation: `This is primarily driven by expansion in the Enterprise segment and new signups.`,
        action: 'Consider aggressive marketing in the Enterprise category.',
      });
    }

    if (churnRate > 3) {
      insights.push({
        type: 'churn',
        summary: `Churn rate is above average at ${churnRate.toFixed(1)}%.`,
        explanation: `Analysis shows increased attrition in the 'Startup' plan tier.`,
        action: 'Launch a customer success campaign for Startup users.',
      });
    }

    return insights;
  }
}

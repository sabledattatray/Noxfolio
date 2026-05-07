export interface MetricValue {
  value: number;
  change: number; // Percentage change compared to previous period
  trend: 'up' | 'down' | 'stable';
}

export interface RevenueMetrics {
  mrr: MetricValue;
  arr: MetricValue;
  revenueGrowth: MetricValue;
  netRevenueRetention: MetricValue;
}

export interface CustomerMetrics {
  activeCustomers: MetricValue;
  ltv: MetricValue;
  churnRate: MetricValue;
  retentionRate: MetricValue;
}

export interface AnalyticsSnapshot {
  id: string;
  date: Date;
  metrics: Record<string, number>;
}

export interface CohortData {
  cohort: string; // e.g., '2024-01'
  size: number;
  retention: number[]; // Percentage of users retained per month [M0, M1, M2...]
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

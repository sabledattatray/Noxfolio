export class AnomalyDetectionService {
  /**
   * Analyze revenue trends for anomalies
   */
  static detectRevenueAnomaly(history: number[]): { anomaly: boolean; score: number; reason?: string } {
    if (history.length < 3) return { anomaly: false, score: 0 };

    const recent = history[history.length - 1];
    const average = history.slice(0, -1).reduce((a, b) => a + b, 0) / (history.length - 1);

    // If recent revenue is 30% below average, mark as anomaly
    const drop = (average - recent) / average;
    
    if (drop > 0.3) {
      return {
        anomaly: true,
        score: drop * 100,
        reason: `Revenue dropped by ${(drop * 100).toFixed(1)}% compared to historical average.`,
      };
    }

    return { anomaly: false, score: 0 };
  }

  /**
   * Detect churn spikes
   */
  static detectChurnSpike(currentChurn: number, avgChurn: number): boolean {
    return currentChurn > avgChurn * 2;
  }
}

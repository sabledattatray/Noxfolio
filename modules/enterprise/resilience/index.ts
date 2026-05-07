export class CircuitBreaker {
  private static states: Record<string, 'CLOSED' | 'OPEN' | 'HALF_OPEN'> = {};
  private static failures: Record<string, number> = {};
  private static THRESHOLD = 5;
  private static TIMEOUT = 30000; // 30 seconds

  /**
   * Execute a function with circuit breaker protection
   */
  static async execute<T>(name: string, fn: () => Promise<T>, fallback: T): Promise<T> {
    const state = this.states[name] || 'CLOSED';

    if (state === 'OPEN') {
      console.warn(`[CIRCUIT_BREAKER] Circuit ${name} is OPEN. Using fallback.`);
      return fallback;
    }

    try {
      const result = await fn();
      this.reset(name);
      return result;
    } catch (error) {
      this.recordFailure(name);
      return fallback;
    }
  }

  private static recordFailure(name: string) {
    this.failures[name] = (this.failures[name] || 0) + 1;
    if (this.failures[name] >= this.THRESHOLD) {
      this.states[name] = 'OPEN';
      setTimeout(() => {
        this.states[name] = 'HALF_OPEN';
        this.failures[name] = 0;
      }, this.TIMEOUT);
    }
  }

  private static reset(name: string) {
    this.failures[name] = 0;
    this.states[name] = 'CLOSED';
  }
}

export class ResilienceService {
  /**
   * Exponential backoff retry logic
   */
  static async retry<T>(fn: () => Promise<T>, attempts: number = 3, delay: number = 1000): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (attempts <= 1) throw error;
      await new Promise(r => setTimeout(r, delay));
      return this.retry(fn, attempts - 1, delay * 2);
    }
  }
}

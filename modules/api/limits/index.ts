import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export class RateLimiter {
  /**
   * Check if a request exceeds the rate limit
   * @param identifier Key for the rate limit (e.g., API key or IP)
   * @param limit Number of allowed requests
   * @param window Time window in seconds
   */
  static async isRateLimited(identifier: string, limit: number = 100, window: number = 60): Promise<boolean> {
    const key = `ratelimit:${identifier}`;
    const current = await redis.get(key);

    if (current && parseInt(current) >= limit) {
      return true;
    }

    const multi = redis.multi();
    multi.incr(key);
    if (!current) {
      multi.expire(key, window);
    }
    await multi.exec();

    return false;
  }
}

export class APIAnalyticsService {
  /**
   * Log API request metrics
   */
  static async logRequest(apiKeyId: number, path: string, method: string, duration: number, status: number) {
    console.log(`[API_METRIC] ${method} ${path} - ${status} (${duration}ms)`);
    
    // Store in Redis for real-time monitoring
    const now = new Date();
    const dayKey = `api_stats:${now.toISOString().split('T')[0]}`;
    
    await redis.hincrby(dayKey, 'total_requests', 1);
    if (status >= 400) await redis.hincrby(dayKey, 'error_count', 1);
    
    // Store latency for averaging
    await redis.lpush(`api_latency:${path}`, duration.toString());
    await redis.ltrim(`api_latency:${path}`, 0, 99); // Keep last 100 requests
  }
}

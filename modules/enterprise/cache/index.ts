import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export class CacheService {
  /**
   * Get cached data or execute fetcher and cache result
   */
  static async getOrSet<T>(key: string, fetcher: () => Promise<T>, ttl: number = 3600): Promise<T> {
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached) as T;
    }

    const fresh = await fetcher();
    await redis.set(key, JSON.stringify(fresh), 'EX', ttl);
    return fresh;
  }

  /**
   * Invalidate cache keys by pattern
   */
  static async invalidatePattern(pattern: string) {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }

  /**
   * Cache dashboard widget data
   */
  static async cacheWidget(orgId: number, widgetId: string, data: any) {
    const key = `widget:${orgId}:${widgetId}`;
    await redis.set(key, JSON.stringify(data), 'EX', 300); // 5 minute cache
  }
}

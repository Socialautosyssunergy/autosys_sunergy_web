type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

class SimpleRateLimit {
  private cache = new Map<string, { count: number; resetTime: number }>();
  private options: Required<Options>;

  constructor(options?: Options) {
    this.options = {
      uniqueTokenPerInterval: options?.uniqueTokenPerInterval || 500,
      interval: options?.interval || 60000,
    };

    // Clean up expired entries every 5 minutes
    setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    this.cache.forEach((value, key) => {
      if (now > value.resetTime) {
        this.cache.delete(key);
      }
    });
  }

  check(token: string, limit: number): Promise<RateLimitResult> {
    return new Promise((resolve) => {
      const now = Date.now();
      const resetTime = now + this.options.interval;
      
      let entry = this.cache.get(token);
      
      // If no entry or entry has expired, create new one
      if (!entry || now > entry.resetTime) {
        entry = { count: 0, resetTime };
        this.cache.set(token, entry);
      }

      const currentCount = entry.count;
      const isRateLimited = currentCount >= limit;
      
      if (!isRateLimited) {
        entry.count += 1;
      }

      resolve({
        success: !isRateLimited,
        limit,
        remaining: Math.max(0, limit - currentCount - (isRateLimited ? 0 : 1)),
        reset: entry.resetTime,
      });
    });
  }
}

export function rateLimit(options?: Options) {
  return new SimpleRateLimit(options);
}

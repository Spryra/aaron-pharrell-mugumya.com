import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export async function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 3600 // 1 hour in seconds
): Promise<RateLimitResult> {
  const key = `contact-ip:${identifier}`;

  try {
    const current = await redis.incr(key);

    if (current === 1) {
      // Set expiry on first request
      await redis.expire(key, windowMs);
    }

    const ttl = await redis.ttl(key);

    return {
      success: current <= limit,
      limit,
      remaining: Math.max(0, limit - current),
      reset: ttl > 0 ? ttl : 0,
    };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // On error, allow the request to proceed but log it
    return {
      success: true,
      limit,
      remaining: 0,
      reset: 0,
    };
  }
}

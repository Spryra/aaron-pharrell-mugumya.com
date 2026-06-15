import { Redis } from '@upstash/redis'

let redis: Redis | null = null

function getRedisClient(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) {
      throw new Error(
        'Missing Redis credentials. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local'
      )
    }

    redis = new Redis({ url, token })
  }

  return redis
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export async function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 3600 // 1 hour in seconds
): Promise<RateLimitResult> {
  const key = `contact-ip:${identifier}`

  try {
    const client = getRedisClient()
    const current = await client.incr(key)

    if (current === 1) {
      // Set expiry on first request
      await client.expire(key, windowMs)
    }

    const ttl = await client.ttl(key)

    return {
      success: current <= limit,
      limit,
      remaining: Math.max(0, limit - current),
      reset: ttl > 0 ? ttl : 0,
    }
  } catch (error) {
    console.error('Rate limit check failed:', error)
    // On error, allow the request to proceed but log it
    return {
      success: true,
      limit,
      remaining: 0,
      reset: 0,
    }
  }
}

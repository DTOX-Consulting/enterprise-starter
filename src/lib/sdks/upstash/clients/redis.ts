import { Redis } from '@upstash/redis';

import { config } from '@/lib/sdks/upstash/config';

export const redis = new Redis(config.redis.auth);

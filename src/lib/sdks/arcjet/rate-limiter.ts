import { tokenBucket } from '@arcjet/next';
import { NextResponse } from 'next/server';

import { getIp } from '@/lib/route/params';
import { createArcjet, config } from '@/lib/sdks/arcjet/config';

const aj = createArcjet({
  rules: [
    // Create a token bucket rate limit.
    // Fixed and sliding window algorithms also supported.
    tokenBucket({
      // Will block requests. Use "DRY_RUN" to log only
      mode: config.mode,
      // Track requests by a custom user ID and IP address
      characteristics: ['userId', 'ip'],
      // Refill 5 tokens per interval
      refillRate: 5,
      // Refill every 10 seconds
      interval: 10,
      // Bucket maximum capacity of 10 tokens
      capacity: 10
    })
  ]
});

export async function GET(req: Request) {
  // Replace with your authenticated user ID
  const userId = 'user123';

  // Deduct 5 tokens from the bucket
  const decision = await aj.protect(req, {
    userId,
    ip: getIp(),
    requested: 5
  });

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: 'Too Many Requests', reason: decision.reason },
      { status: 429 }
    );
  }

  return NextResponse.json({ message: 'Hello world' });
}

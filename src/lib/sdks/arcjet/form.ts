import { protectSignup } from '@arcjet/next';
import { NextResponse } from 'next/server';

import { createArcjet } from '@/lib/sdks/arcjet/config';

export const aj = createArcjet({
  rules: [
    protectSignup({
      email: {
        // Will block requests. Use "DRY_RUN" to log only
        mode: 'LIVE',
        // Blocks disposable, no MX records, and invalid emails
        block: ['DISPOSABLE', 'NO_MX_RECORDS', 'INVALID']
      },
      bots: {
        mode: 'LIVE',
        // Block clients that we are sure are automated
        block: ['AUTOMATED']
      },
      // It would be unusual for a form to be submitted more
      // than 5 times in 10 minutes from the same IP address
      rateLimit: {
        // Uses a sliding window rate limit
        mode: 'LIVE',
        // Counts requests over a 10 minute sliding window
        interval: '10m',
        // Allows 5 submissions within the window
        max: 5
      }
    })
  ]
});

export async function POST(req: Request) {
  const data = (await req.json()) as { email: string };
  const email = data.email;

  const decision = await aj.protect(req, {
    email
  });

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      return NextResponse.json(
        {
          message: 'Invalid email',
          reason: decision.reason
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json({
    message: 'Hello world'
  });
}

import { validateEmail } from '@arcjet/next';
import { NextResponse } from 'next/server';

import { createArcjet, config } from '@/lib/sdks/arcjet/config';

export const aj = createArcjet({
  rules: [
    validateEmail({
      // Will block requests. Use "DRY_RUN" to log only
      mode: config.mode,
      // Blocks disposable, no MX records, and invalid emails
      block: ['DISPOSABLE', 'NO_MX_RECORDS', 'INVALID']
    })
  ]
});

export async function POST(req: Request) {
  const decision = await aj.protect(req, {
    email: 'fake@arject.ai'
  });

  if (decision.isDenied()) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json({
    message: 'Hello world'
  });
}

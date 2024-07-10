import { createMiddleware, shield, detectBot } from '@arcjet/next';

import { createArcjet, config as arcjetConfig } from '@/lib/sdks/arcjet/config';

export const config = {
  // matcher tells Next.js which routes to run the middleware on.
  // This runs the middleware on all routes except for static assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};

export const aj = createArcjet({
  rules: [
    // Protect against common attacks with Arcjet Shield
    shield({
      // Will block requests. Use "DRY_RUN" to log only
      mode: arcjetConfig.mode
    }),
    detectBot({
      // Will block requests. Use "DRY_RUN" to log only
      mode: arcjetConfig.mode,
      // Blocks all automated clients
      block: ['AUTOMATED']
    })
  ]
});

// Pass existing middleware with optional existingMiddleware prop
export const middleware = createMiddleware(aj);

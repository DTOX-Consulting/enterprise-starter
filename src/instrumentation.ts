import { registerOTel } from '@vercel/otel';

import { getEnv } from '@/lib/env';

export async function register() {
  const serviceName = getEnv('OTEL_SERVICE_NAME');
  registerOTel({ serviceName });

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // const { registerHyperDX } = await import('@/lib/sdks/hyperdx/register');
    // await registerHyperDX();

    const { registerHighlight } = await import('@/lib/sdks/highlight/register');
    await registerHighlight();
  }
}

import { registerOTel } from '@vercel/otel';

import { getEnv } from '@/lib/env/env.mjs';

export async function register() {
  const serviceName = getEnv('NEXT_PUBLIC_APP_NAME');
  registerOTel({ serviceName });

  if (getEnv('NEXT_RUNTIME') === 'nodejs') {
    const { registerHighlight } = await import('@/lib/sdks/highlight/register');
    await registerHighlight();
  }
}

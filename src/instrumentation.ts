import { registerOTel } from '@vercel/otel';

export async function register() {
  registerOTel('pulse-app');

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { registerHighlight } = await import('@/lib/sdks/highlight/register');
    await registerHighlight();
  }
}

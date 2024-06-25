import { init } from '@sentry/nextjs';

import { config } from '@/lib/sdks/sentry/config';

export const registerSentry = () => init(config);

import { getEnv } from '@/lib/env';

export const config = {
  apiKey: getEnv('HYPERDX_API_KEY'),
  service: getEnv('OTEL_SERVICE_NAME'),
  serviceKey: getEnv('HYPERDX_SERVICE_KEY'),
  endpoint: getEnv('OTEL_EXPORTER_OTLP_ENDPOINT')
};

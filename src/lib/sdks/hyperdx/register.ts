import { initSDK } from '@hyperdx/node-opentelemetry';

import { config } from '@/lib/sdks/hyperdx/config';

export const registerHyperDX = async () =>
  Promise.resolve(
    initSDK({
      service: config.service,
      consoleCapture: true, // optional, default: true
      additionalInstrumentations: [] // optional, default: []
    })
  );

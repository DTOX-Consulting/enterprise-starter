import type { TriggerConfig } from '@trigger.dev/sdk/v3';

export const config: TriggerConfig = {
  project: 'proj_blpkyatnxkeeuivfpjkt',
  logLevel: 'log',
  retries: {
    enabledInDev: true,
    default: {
      factor: 2,
      maxAttempts: 3,
      randomize: true,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000
    }
  }
};

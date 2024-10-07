import { stringify } from 'safe-stable-stringify';

import { isProd } from '@/lib/env/env.mjs';

type LogType = 'info' | 'warn' | 'error' | 'success' | 'log' | 'marker';
const logType = ['info', 'warn', 'error', 'success', 'log'] as LogType[];

type Logger = {
  [key in LogType]: (message: string, ...args: unknown[]) => void;
};

const log = (type: LogType, message: string, ...args: unknown[]) => {
  console.info(
    stringify(
      {
        args,
        type,
        message,
        timestamp: new Date().toISOString()
      },
      null,
      isProd() ? undefined : 2
    )
  );
};

export const logger: Logger = logType.reduce((acc, type) => {
  acc[type] = (message: string, ...args: unknown[]) => log(type, message, ...args);
  return acc;
}, {} as Logger);

logger.marker = (message: string, ...args: unknown[]) => {
  log('info', `>>>>>>>>>>>>>>>>>>>>>>>> ${message} <<<<<<<<<<<<<<<<<<<<<<<<`, ...args);
};

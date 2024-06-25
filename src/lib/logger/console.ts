import { stringify } from 'safe-stable-stringify';

import { isProd } from '@/lib/env';

type LogType = 'info' | 'warn' | 'error' | 'success' | 'log' | 'marker';
const logType = ['info', 'warn', 'error', 'success', 'log'] as LogType[];

type Logger = {
  [key in LogType]: (message: string, ...args: any[]) => void;
};

const log = (type: LogType, message: string, ...args: any[]) => {
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
  return {
    ...acc,
    [type]: (message: string, ...args: any[]) => log(type, message, ...args)
  };
}, {} as Logger);

logger.marker = (message: string, ...args: any[]) => {
  log('info', `>>>>>>>>>>>>>>>>>>>>>>>> ${message} <<<<<<<<<<<<<<<<<<<<<<<<`, ...args);
};

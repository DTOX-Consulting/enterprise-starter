import { logger, task, wait } from '@trigger.dev/sdk/v3';

import type { GenericObject } from '@/lib/utils/object';

export const helloWorldTask = task({
  id: 'hello-world',
  run: async (payload: GenericObject, { ctx }) => {
    logger.log('Hello, world!', { payload, ctx });

    await wait.for({ seconds: 5 });

    return {
      message: 'Hello, world!'
    };
  }
});

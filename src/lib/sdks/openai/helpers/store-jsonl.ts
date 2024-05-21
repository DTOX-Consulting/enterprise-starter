import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { unbox } from 'unbox-js';

import type { ChatCompletionRequestMessage } from 'openai-edge';

export const storeJsonL = async (messages: ChatCompletionRequestMessage[]) => {
  return unbox(
    appendFile(
      resolve(`${process.cwd()}/scripts/fine-tune/data.jsonl`),
      `${JSON.stringify({ messages })}\n`,
      'utf-8'
    )
  );
};

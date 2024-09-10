import fs from 'node:fs';
import { resolve } from 'node:path';

import { delay } from 'already';
import { config } from 'dotenv';
import { OpenAI } from 'openai';

import { getEnv } from '@/lib/env';

import type { FineTuningJobEvent } from 'openai/resources/fine-tuning/jobs/jobs';

config({
  path: resolve(__dirname, '../../.env.local')
});

const client = new OpenAI({
  apiKey: getEnv('OPENAI_API_KEY')
});

async function main() {
  console.log('Uploading file');

  let file = await client.files.create({
    file: fs.createReadStream(`${__dirname}/data.jsonl`),
    purpose: 'fine-tune'
  });

  console.log(`Uploaded file with ID: ${file.id}`);
  console.log('-----');
  console.log('Waiting for file to be processed');

  while (true) {
    file = await client.files.retrieve(file.id);
    console.log(`File status: ${file.status}`);

    if (file.status === 'processed') {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log('-----');
  console.log('Starting fine-tuning');

  let fineTune = await client.fineTuning.jobs.create({
    model: 'gpt-3.5-turbo',
    training_file: file.id
  });

  console.log(`Fine-tuning ID: ${fineTune.id}`);
  console.log('-----');
  console.log('Track fine-tuning progress:');

  const events: Record<string, FineTuningJobEvent> = {};

  while (!['succeeded', 'failed', 'cancelled'].includes(fineTune.status)) {
    fineTune = await client.fineTuning.jobs.retrieve(fineTune.id);
    console.log(`- ${new Date().toLocaleTimeString()}: Current Status - ${fineTune.status}`);

    const { data } = await client.fineTuning.jobs.listEvents(fineTune.id, {
      limit: 100
    });

    for (const event of data.reverse()) {
      if (event.id in events) continue;
      events[event.id] = event;
      const timestamp = new Date(event.created_at * 1000);
      console.log(`- ${timestamp.toLocaleTimeString()}: ${event.message}`);
    }

    await delay(5000);
  }
}

// eslint-disable-next-line promise/prefer-await-to-callbacks
main().catch((err) => {
  console.error(err);

  process.exit(1);
});

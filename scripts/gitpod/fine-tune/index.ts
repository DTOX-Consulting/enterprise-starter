import fs from 'node:fs';
import { resolve } from 'node:path';

import { delay } from 'already';
import { config } from 'dotenv';
import { OpenAI } from 'openai';

import { getEnv } from '@/lib/env/env.mjs';

config({
  path: resolve(__dirname, '../../.env.local')
});

const client = new OpenAI({
  apiKey: getEnv('OPENAI_API_KEY')
});

async function uploadAndProcessFile() {
  console.log('Uploading file');
  const file = await client.files.create({
    file: fs.createReadStream(`${__dirname}/data.jsonl`),
    purpose: 'fine-tune'
  });
  console.log(`Uploaded file with ID: ${file.id}`);
  console.log('-----');
  console.log('File uploaded successfully');

  return file;
}

async function startFineTuning(fileId: string) {
  console.log('-----');
  console.log('Starting fine-tuning');
  return client.fineTuning.jobs.create({
    model: 'gpt-3.5-turbo',
    training_file: fileId
  });
}

async function trackFineTuningProgress(
  currentFineTune: OpenAI.FineTuning.Jobs.FineTuningJob,
  events: Record<string, OpenAI.FineTuning.Jobs.FineTuningJobEvent> = {}
) {
  console.log(`- ${new Date().toLocaleTimeString()}: Current Status - ${currentFineTune.status}`);

  const [updatedFineTune, { data }] = await Promise.all([
    client.fineTuning.jobs.retrieve(currentFineTune.id),
    client.fineTuning.jobs.listEvents(currentFineTune.id, { limit: 100 })
  ]);

  const reversedData = data.toReversed();
  for (const event of reversedData) {
    if (event.id in events) continue;
    events[event.id] = event;
    const timestamp = new Date(event.created_at * 1000);
    console.log(`- ${timestamp.toLocaleTimeString()}: ${event.message}`);
  }

  if (['succeeded', 'failed', 'cancelled'].includes(updatedFineTune.status)) {
    return;
  }

  await delay(5000);
  await trackFineTuningProgress(updatedFineTune, events);
}

async function main() {
  const file = await uploadAndProcessFile();
  const fineTune = await startFineTuning(file.id);
  await trackFineTuningProgress(fineTune);
}

// eslint-disable-next-line promise/prefer-await-to-callbacks
main().catch((err) => {
  console.error(err);

  process.exit(1);
});

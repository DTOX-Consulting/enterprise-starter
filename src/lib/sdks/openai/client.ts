import { OpenAI } from 'openai';

import { config } from '@/lib/sdks/openai/config';

export const openai = new OpenAI(config);

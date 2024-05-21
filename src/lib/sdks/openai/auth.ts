import { OpenAI } from 'openai';
import { Configuration, OpenAIApi } from 'openai-edge';

import { config } from '@/lib/sdks/openai/config';

const configuration = new Configuration(config);
export const openai = new OpenAIApi(configuration);
export const openaiSdk = new OpenAI(config);

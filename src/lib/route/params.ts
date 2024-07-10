import { G } from '@mobily/ts-belt';
import { headers } from 'next/headers';
import { unbox } from 'unbox-js';

import type {
  ToneType,
  ModelType,
  FormatType,
  PersonaType,
  DocumentType,
  ModelValueType
} from '@/lib/sdks/openai';
import type { GenericObject } from '@/lib/utils/object';
import type { NextRequest } from 'next/server';

import {
  getModel,
  availableTones,
  availableModels,
  availableFormats,
  availablePersonas
} from '@/lib/sdks/openai';
import { type Template, getTemplate } from '@/lib/sdks/openai/templates';

export type GenerateParams = {
  topic?: string;
  prompt?: string;
  tone: ToneType;
  model: ModelType;
  template: Template;
  format: FormatType;
  persona: PersonaType;
  document: DocumentType;
};

export type GenerateParamsResult = {
  topic: string;
  tone: ToneType;
  template: Template;
  format: FormatType;
  prompt: DocumentType;
  persona: PersonaType;
  model: ModelValueType;
};

export const getBody = async <T extends GenericObject>(request: NextRequest): Promise<T> => {
  const { data } = await unbox<T>(request.json() as Promise<T>);
  request.json = async () => Promise.resolve(data);
  return (data ?? {}) as T;
};

type AllParams = {
  url: string;
  hash: string;
  host: string;
  path: string;
  query: string;
  method: string;
  origin: string;
  body: GenericObject;
  params: GenericObject;
  headers: GenericObject;
};

export const getRequestDetails = async (request: NextRequest): Promise<AllParams> => {
  const body = await getBody(request);
  const { url, method, nextUrl } = request;
  const headers = Object.fromEntries(request.headers.entries());
  const params = Object.fromEntries(nextUrl.searchParams.entries());

  return {
    url,
    body,
    method,
    params,
    headers,
    hash: nextUrl.hash,
    host: nextUrl.host,
    query: nextUrl.search,
    origin: nextUrl.origin,
    path: nextUrl.pathname
  };
};

export const getParams = async <T extends GenericObject>(
  request: NextRequest,
  keys: string[]
): Promise<T> => {
  const body = await getBody<T>(request);
  const params = request.nextUrl.searchParams;

  return keys.reduce((acc, key) => {
    const value = Reflect.get(body, key) ?? params.get(key);
    G.isNotNullable(value) && Reflect.set(acc, key, value);
    return acc;
  }, {} as T);
};

export function getIp() {
  const FALLBACK_IP_ADDRESS = '0.0.0.0';
  const forwardedFor = headers().get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
}

type EnsureParamArgs<T, K> = {
  params: T;
  key?: string;
  fallback: K;
  throwError?: boolean;
};

export const ensureParam = <T extends unknown[], K = T[number]>({
  key,
  params,
  fallback,
  throwError = false
}: EnsureParamArgs<T, K>): T[number] => {
  const value = params.includes(key) ? (key as K) : undefined;

  if (G.isNullable(value) && throwError) {
    throw new Error(`Missing required param: ${key}`);
  }

  return value ?? fallback;
};

export const getGenerateParams = async (request: NextRequest): Promise<GenerateParamsResult> => {
  const params = await getParams<GenerateParams>(request, [
    'tone',
    'topic',
    'model',
    'format',
    'prompt',
    'persona',
    'document'
  ]);

  return generateParams(params);
};

export const generateParams = async (params: GenerateParams): Promise<GenerateParamsResult> => {
  const { template } = getTemplate(params.document);

  const persona = ensureParam<PersonaType[]>({
    key: params.persona,
    params: availablePersonas,
    fallback: template.persona
  });

  const model = ensureParam<ModelType[]>({
    key: params.model,
    params: availableModels,
    fallback: template.model
  });

  const tone = ensureParam<ToneType[]>({
    key: params.tone,
    params: availableTones,
    fallback: template.tone
  });

  const format = ensureParam<FormatType[]>({
    key: params.format,
    params: availableFormats,
    fallback: template.format
  });

  return {
    tone,
    format,
    persona,
    template,
    model: getModel(model),
    prompt: template.prompt,
    topic: params.topic ?? params.prompt ?? ''
  };
};

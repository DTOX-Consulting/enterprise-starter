import { G } from '@mobily/ts-belt';
import { unbox } from 'unbox-js';

import type { ModelType } from '@/lib/sdks/openai';
import type { NN } from '@/lib/types';
import type { GenericObject } from '@/lib/utils/object';
import type { NextRequest } from 'next/server';
import type { ImageGenerateParams } from 'openai/resources/images';

export type GenerateImageParams = Omit<NN<ImageGenerateParams>, 'user'>;

export type GenerateParams = {
  topic?: string;
  model?: ModelType;
};

export type GenerateParamsResult = {
  topic: string;
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

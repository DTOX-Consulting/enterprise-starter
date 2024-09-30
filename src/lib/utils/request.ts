import { G } from '@mobily/ts-belt';
import {stringify} from 'safe-stable-stringify';
import { unbox } from 'unbox-js';

import { createUrl } from '@/lib/utils/promise';

import type { GenericObject } from '@/lib/utils/object';

type ProxyRequest = {
  url: string;
  body?: unknown;
  method?: string;
  query?: GenericObject;
  headers?: GenericObject;
};

type ProxyResponse = {
  success: boolean;
  error?: Error;
  data?: unknown;
};

const allowedHeaders = [
  'dnt',
  'accept',
  'user-agent',
  'content-type',
  'accept-encoding',
  'accept-language'
];

export async function proxy(req: ProxyRequest) {
  const { url, query = {}, method = 'GET' } = req;

  if (G.isNullable(url)) {
    throw new Error('No URL provided');
  }

  const _headers = (req.headers ?? {}) as GenericObject<string, unknown>;
  const body = G.isNotNullable(req.body) ? stringify(req.body) : undefined;

  const headers = allowedHeaders.reduce((acc, key) => {
    if (G.isNotNullable(_headers[key])) {
      acc[key] = _headers[key];
    }
    return acc;
  }, {} as GenericObject);

  return fetch(createUrl(url, query), {
    body,
    method,
    headers
  });
}

export async function unboxProxy(req: ProxyRequest) {
  req.headers = {
    ...req.headers,
    'Content-Type': 'application/json'
  };

  const response = await proxy(req);
  const { data, error } = await unbox(response.json());

  return { success: !error, data, error } as ProxyResponse;
}

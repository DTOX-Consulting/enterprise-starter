import { G } from '@mobily/ts-belt';
import { NextResponse, type NextRequest } from 'next/server';
import { unbox } from 'unbox-js';

import { createUrl } from '@/lib/promise';

import type { GenericObject } from '@/lib/object';

export const runtime = 'edge';

const allowedHeaders = [
  'dnt',
  'accept',
  'user-agent',
  'content-type',
  'accept-encoding',
  'accept-language'
];

function proxyRequest() {
  return async (req: NextRequest) => {
    const { method, headers } = req;
    const { url, ...params } = Object.fromEntries(req.nextUrl.searchParams.entries());

    if (G.isNullable(url)) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    const body = G.isNotNullable(req.body) ? JSON.stringify(req.body) : undefined;

    const _realHeaders = Object.fromEntries(headers.entries());
    const realHeaders = allowedHeaders.reduce((acc, key) => {
      G.isNotNullable(_realHeaders[key]) && (acc[key] = _realHeaders[key]);
      return acc;
    }, {} as GenericObject);

    const response = await fetch(createUrl(url, params as GenericObject<string>), {
      body,
      method,
      headers: {
        ...realHeaders,
        'Content-Type': 'application/json'
      }
    });

    const { data, error } = await unbox(response.json());

    return NextResponse.json(data ?? { error }, { status: response.status });
  };
}

export const GET = proxyRequest();
export const PUT = proxyRequest();
export const POST = proxyRequest();
export const PATCH = proxyRequest();
export const DELETE = proxyRequest();

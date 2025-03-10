import _nextSafe from 'next-safe';

import { isDev } from './env.config.mjs';
import {
  origins,
  allOrigins,
  fontOrigins,
  frameOrigins,
  imageOrigins,
  scriptOrigins,
  styleOrigins,
  uniqueOrigins
} from './origins.config.mjs';

// because of type bug.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
const nextSafe = _nextSafe.nextSafe || _nextSafe;

const special = {
  data: 'data:',
  blob: 'blob:',
  self: "'self'",
  none: "'none'",
  unsafeEval: "'unsafe-eval'",
  unsafeInline: "'unsafe-inline'",
  unsafeHashes: "'unsafe-hashes'",
  strictDynamic: "'strict-dynamic'"
};

/** @type {NextSafeConfig} */
const nextSafeConfig = {
  isDev,
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicyDirectiveSupport: ['standard', 'proposed'],
  contentSecurityPolicy: {
    reportOnly: true,
    mergeDefaultDirectives: true,
    // @ts-expect-error -- Broken type.
    'prefetch-src': false,
    'base-uri': uniqueOrigins([special.self]),
    'child-src': [special.self],
    'default-src': uniqueOrigins([special.self]),
    'worker-src': uniqueOrigins([special.self, special.blob]),
    'font-src': uniqueOrigins([special.self, special.data, ...fontOrigins]),
    'frame-src': uniqueOrigins([special.self, ...origins, ...frameOrigins]),
    'form-action': uniqueOrigins([special.self, ...origins, ...scriptOrigins]),
    'connect-src': uniqueOrigins([special.self, special.data, ...allOrigins]),
    'frame-ancestors': uniqueOrigins([special.self, ...origins, ...frameOrigins]),
    'style-src': uniqueOrigins([special.self, special.unsafeInline, ...styleOrigins]),
    'img-src': uniqueOrigins([special.self, special.data, special.blob, ...imageOrigins]),
    'script-src': uniqueOrigins([
      special.self,
      special.data,
      special.unsafeEval,
      special.unsafeInline,
      ...origins,
      ...scriptOrigins
    ]),
    'script-src-elem': uniqueOrigins([
      special.self,
      special.data,
      special.unsafeEval,
      special.unsafeInline,
      ...origins,
      ...scriptOrigins
    ])
  }
};

/** @type {Header[]} */
export const noCacheHeader = [
  {
    key: 'cache-control',
    value: 'public, max-age=0, must-revalidate'
  }
];

/** @type {Header[]} */
export const hsts = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  }
];

/** @type {Header[]} */
export const frame = [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }];

/** @type {Header[]} */
export const access = [
  { key: 'Access-Control-Max-Age', value: '86400' },
  { key: 'Access-Control-Allow-Credentials', value: 'true' },
  { key: 'Access-Control-Allow-Origin', value: origins.join(',') },
  { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
  {
    key: 'Access-Control-Allow-Headers',
    value:
      'X-CSRF-Token, X-Requested-With, X-Api-Version, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date'
  }
];

/** @type {Header[]} */
export const securityHeaders = [...hsts, ...access, ...nextSafe(nextSafeConfig), ...frame];

export const headers = async () =>
  Promise.resolve([
    {
      source: '/',
      headers: [...securityHeaders, ...noCacheHeader]
    },
    {
      source: '/:path*',
      headers: securityHeaders
    }
  ]);

/** @type {import("next").NextConfig['images']} */
export const images = {
  unoptimized: true,
  remotePatterns: imageOrigins.map((origin) => ({ hostname: origin }))
};

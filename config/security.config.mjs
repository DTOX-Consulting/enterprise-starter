import _nextSafe from 'next-safe';

import { isDev } from './env.config.mjs';
import {
  origins,
  fontOrigins,
  frameOrigins,
  imageOrigins,
  extraOrigins
} from './origins.config.mjs';

// because of type bug.
const nextSafe = _nextSafe.nextSafe || _nextSafe;

const special = {
  data: 'data:',
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
    reportOnly: false,
    mergeDefaultDirectives: true,
    // @ts-expect-error -- Broken type.
    'prefetch-src': false,
    'base-uri': [special.self],
    'child-src': [special.self],
    'default-src': [special.self],
    'style-src': [special.self, special.unsafeInline],
    'img-src': [special.self, special.data, ...imageOrigins],
    'font-src': [special.self, special.data, ...fontOrigins],
    'form-action': [special.self, ...origins, ...extraOrigins],
    'connect-src': [special.self, ...origins, ...extraOrigins],
    'frame-src': [special.self, ...origins, ...frameOrigins],
    'frame-ancestors': [special.self, ...origins, ...frameOrigins],
    'script-src-elem': [special.self, special.unsafeInline, ...origins, ...extraOrigins]
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
export const securityHeaders = [...hsts, ...access, ...nextSafe(nextSafeConfig)];

export const headers = async () => {
  return Promise.resolve([
    {
      source: '/',
      headers: [...securityHeaders, ...noCacheHeader]
    },
    {
      source: '/:path*',
      headers: securityHeaders
    }
  ]);
};

export const images = {
  remotePatterns: imageOrigins.map((origin) => ({ hostname: origin }))
};

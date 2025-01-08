/** @type {string[]} */
const exactOrigins = [
  '*.enterprise-starter.com',
  'https://enterprise-starter.com',
  'https://app.enterprise-starter.com',
  '*.enterprise-starter.co.uk',
  'https://enterprise-starter.co.uk',
  'https://app.enterprise-starter.co.uk'
];

/** @type {string[]} */
const defaultOrigins = [
  'http://localhost:*',
  'https://*.pages.dev',
  'https://*.vercel.app',
  'https://vercel.live',
  'https://*.vercel.com',
  'https://*.vercel-*.com',
  'https://*.cloudflareaccess.com'
];
/** @type {string[]} */
export const origins = [...defaultOrigins, ...exactOrigins];

/** @type {string[]} */
export const fontOrigins = ['*.googleapis.com', '*.gstatic.com', '*.hotjar.com'];

/** @type {string[]} */
export const frameOrigins = ['*.google.com', '*.youtube.com', '*.stripe.com', 'rxdb.info'];

/** @type {string[]} */
export const connectOrigins = [
  'wss://*.hotjar.com',
  'wss://*.supabase.co',
  'wss://*.crisp.chat',
  'wss://ws-us3.pusher.com'
];

/** @type {string[]} */
export const imageOrigins = [
  '*.hotjar.*',
  '*.licdn.com',
  '*.imgur.com',
  '*.hubspot.*',
  '*.vercel.com',
  '*.unsplash.com',
  '*.gravatar.com',
  '*.highlight.io',
  '*.googleusercontent.com',
  '*.rightmove.co.uk',
  '*.brandcrowd.com',
  '*.placeholder.com',
  '*.pollinations.ai'
];

/** @type {string[]} */
export const scriptOrigins = [
  '*.sentry.*',
  '*.kinde.com',
  '*.stripe.com',
  '*.hotjar.*',
  '*.hubspot.*',
  '*.supabase.co',
  '*.mixpanel.com',
  '*.highlight.io',
  '*.amazonaws.com',
  '*.google-analytics.*',
  '*.vercel-*.com',
  '*.googletagmanager.com',
  '*.cloudflareinsights.com',
  '*.meticulous.ai',
  '*.formspree.io'
];

/** @type {string[]} */
export const styleOrigins = [];

/**
 * Removes duplicates from an array while preserving order
 *
 * @param arr - Array of origins
 * @returns - Array with duplicates removed
 */
export const uniqueOrigins = (/** @type {string[]} */ arr) =>
  /** @type {string[]} */
  [...new Set(arr)];

/** @type {string[]} */
export const allOrigins = uniqueOrigins([
  ...origins,
  ...fontOrigins,
  ...frameOrigins,
  ...imageOrigins,
  ...scriptOrigins,
  ...styleOrigins,
  ...connectOrigins
]);

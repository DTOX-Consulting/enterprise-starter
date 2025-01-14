/* eslint-disable sonarjs/no-clear-text-protocols */
/** @type {string[]} */
const exactOrigins = [
  // '*.hello-world.com',
  // 'https://hello-world.com',
  // 'https://app.hello-world.com',
  // '*.hello-world.co.uk',
  // 'https://hello-world.co.uk',
  // 'https://app.hello-world.co.uk'
];

/** @type {string[]} */
const defaultOrigins = [
  'http://localhost:*',
  'https://*.pages.dev',
  'https://*.vercel.app',
  'https://vercel.live',
  'https://*.vercel.com',
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
  '*.hotjar.com',
  '*.licdn.com',
  '*.imgur.com',
  '*.hubspot.com',
  '*.hubspot.net',
  '*.vercel.com',
  '*.unsplash.com',
  '*.gravatar.com',
  '*.highlight.io',
  '*.rightmove.co.uk',
  '*.brandcrowd.com',
  '*.placeholder.com',
  '*.pollinations.ai',
  '*.googleusercontent.com'
];

/** @type {string[]} */
export const scriptOrigins = [
  '*.sentry.io',
  '*.sentry-cdn.com',
  '*.kinde.com',
  '*.termly.io',
  '*.stripe.com',
  '*.hotjar.com',
  '*.hubspot.com',
  '*.hubspot.net',
  '*.supabase.co',
  '*.mixpanel.com',
  '*.highlight.io',
  '*.formspree.io',
  '*.amazonaws.com',
  '*.meticulous.ai',
  '*.hs-scripts.com',
  '*.hs-analytics.net',
  '*.hscollectedforms.net',
  '*.vercel-scripts.com',
  '*.vercel-insights.com',
  '*.google-analytics.com',
  '*.googletagmanager.com',
  '*.cloudflareinsights.com'
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

/* eslint-enable sonarjs/no-clear-text-protocols */

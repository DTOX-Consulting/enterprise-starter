/** @type {string[]} */
const exactOrigins = []; // update this with your domain

const defaultOrigins = [
  'http://localhost:*',
  'https://*.pages.dev',
  'https://*.vercel.app',
  'https://*.cloudflareaccess.com'
];

export const origins = [...defaultOrigins, ...exactOrigins];

export const fontOrigins = ['*.googleapis.com', '*.gstatic.com', '*.hotjar.com'];

export const frameOrigins = ['*.google.com', '*.youtube.com', '*.stripe.com', 'rxdb.info'];

export const connectOrigins = ['wss://*.hotjar.com', 'wss://*.supabase.co'];

export const imageOrigins = [
  '*.hotjar.io',
  '*.hotjar.com',
  'fakeimg.pl',
  '*.licdn.com',
  '*.imgur.com',
  '*.hsforms.com',
  '*.hubspot.com',
  '*.unsplash.com',
  '*.gravatar.com',
  '*.highlight.io',
  'tailwindui.com',
  '*.brandcrowd.com',
  '*.placeholder.com',
  '*.pollinations.ai',
  '*.googletagmanager.com',
  '*.googleusercontent.com'
];

export const extraOrigins = [
  '*.sentry.io',
  '*.kinde.com',
  'corsproxy.io',
  '*.stripe.com',
  '*.hotjar.io',
  '*.hotjar.com',
  '*.hubspot.com',
  '*.hsforms.com',
  '*.supabase.co',
  '*.formspree.io',
  '*.highlight.io',
  '*.meticulous.ai',
  '*.amazonaws.com',
  '*.hs-banner.com',
  '*.hs-scripts.com',
  '*.sentry-cdn.com',
  '*.hs-analytics.net',
  'google-analytics.com',
  '*.vercel-scripts.com',
  '*.vercel-insights.com',
  '*.googletagmanager.com',
  '*.hscollectedforms.net',
  'cloudflareinsights.com',
  '*.google-analytics.com',
  '*.cloudflareinsights.com'
];

export const allOrigins = [
  ...new Set([
    ...origins,
    ...fontOrigins,
    ...frameOrigins,
    ...imageOrigins,
    ...extraOrigins,
    ...connectOrigins
  ])
];

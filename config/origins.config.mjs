/** @type {string[]} */
const exactOrigins = [
  '*.enterprise-starter.com',
  'https://enterprise-starter.com',
  'https://app.enterprise-starter.com',
  '*.enterprise-starter.co.uk',
  'https://enterprise-starter.co.uk',
  'https://app.enterprise-starter.co.uk'
]; // update this with your domain

const defaultOrigins = [
  'http://localhost:*',
  'https://*.pages.dev',
  'https://*.vercel.app',
  'https://vercel.live',
  'https://*.cloudflareaccess.com'
];

export const origins = [...defaultOrigins, ...exactOrigins];

export const fontOrigins = [
  '*.googleapis.com',
  '*.gstatic.com',
  '*.hotjar.com',
  'vercel.live',
  '*.vercel.com'
];

export const frameOrigins = [
  '*.google.com',
  '*.youtube.com',
  '*.stripe.com',
  'rxdb.info',
  'vercel.live',
  '*.vercel.com'
];

export const connectOrigins = [
  'wss://*.hotjar.com',
  'wss://*.supabase.co',
  'wss://*.crisp.chat',
  'wss://ws-us3.pusher.com'
];

export const imageOrigins = [
  '*.hotjar.io',
  '*.hotjar.com',
  'fakeimg.pl',
  '*.licdn.com',
  '*.imgur.com',
  '*.hsforms.com',
  'vercel.live',
  '*.vercel.com',
  '*.hubspot.com',
  '*.unsplash.com',
  '*.gravatar.com',
  '*.highlight.io',
  'tailwindui.com',
  '*.brandcrowd.com',
  '*.placeholder.com',
  '*.pollinations.ai',
  '*.googletagmanager.com',
  '*.googleusercontent.com',
  '*.rightmove.co.uk'
];

export const scriptOrigins = [
  '*.sentry.io',
  '*.kinde.com',
  '*.termly.io',
  'corsproxy.io',
  '*.stripe.com',
  '*.hotjar.io',
  '*.hotjar.com',
  '*.hubspot.com',
  '*.hsforms.com',
  '*.supabase.co',
  '*.mixpanel.com',
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

export const styleOrigins = ['vercel.live', '*.vercel.com'];

export const allOrigins = [
  ...new Set([
    ...origins,
    ...fontOrigins,
    ...frameOrigins,
    ...imageOrigins,
    ...scriptOrigins,
    ...styleOrigins,
    ...connectOrigins
  ])
];

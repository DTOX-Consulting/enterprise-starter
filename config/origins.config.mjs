const defaultOrigins = [
  'http://localhost:*',
  'https://*.pages.dev',
  'https://*.vercel.app',
  'https://*.cloudflareaccess.com'
];

/** @type {string[]} */
const exactOrigins = []; // update this with your domain

export const origins = [...defaultOrigins, ...exactOrigins];

export const fontOrigins = ['*.googleapis.com', '*.gstatic.com'];

export const frameOrigins = ['*.google.com', '*.youtube.com'];

export const imageOrigins = [
  'fakeimg.pl',
  '*.licdn.com',
  '*.imgur.com',
  '*.unsplash.com',
  '*.gravatar.com',
  'tailwindui.com',
  '*.placeholder.com',
  '*.pollinations.ai',
  '*.brandcrowd.com',
  '*.googleusercontent.com'
];

export const extraOrigins = [
  '*.sentry.io',
  '*.formspree.io',
  '*.vercel-scripts.com',
  '*.vercel-insights.com',
  '*.googletagmanager.com',
  '*.cloudflareinsights.com'
];

export const allOrigins = [
  ...origins,
  ...fontOrigins,
  ...frameOrigins,
  ...imageOrigins,
  ...extraOrigins
];

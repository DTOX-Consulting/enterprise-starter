const defaultOrigins = ['http://localhost:*', 'https://*.vercel.app', 'https://*.pages.dev'];
const exactOrigins = ['https://google.com']; // update this with your domain

export const origins = [...defaultOrigins, ...exactOrigins];

export const fontOrigins = ['*.googleapis.com', '*.gstatic.com'];

export const frameOrigins = ['*.google.com', '*.youtube.com'];

export const imageOrigins = [
  '*.imgur.com',
  '*.unsplash.com',
  '*.gravatar.com',
  'tailwindui.com',
  '*.pollinations.ai',
  '*.googleusercontent.com'
];

export const extraOrigins = [
  '*.formspree.io',
  '*.vercel-scripts.com',
  '*.vercel-insights.com',
  '*.googletagmanager.com'
];

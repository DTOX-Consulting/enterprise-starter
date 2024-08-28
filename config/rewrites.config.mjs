export const rewrites = () => [...health, ...iframe];

const health = [
  { source: '/healthz', destination: '/api/health' },
  { source: '/api/healthz', destination: '/api/health' },
  { source: '/health', destination: '/api/health' },
  { source: '/ping', destination: '/api/health' }
];

const iframe = [
  {
    source: '/iframe-test-page',
    destination: '/iframe/test-page.html'
  },
  {
    source: '/iframe-app',
    destination: '/iframe/app.html'
  },
  {
    source: '/iframe-app-js',
    destination: '/iframe/app.js'
  },
  {
    source: '/iframe-utils-js',
    destination: '/iframe/utils.js'
  },
  {
    source: '/iframe-utils-css-js',
    destination: '/iframe/utils.css.js'
  },
  {
    source: '/iframe-widget-js',
    destination: '/iframe/widget.js'
  },
  {
    source: '/affiliate-everflow-js',
    destination: '/iframe/everflow.js'
  }
];

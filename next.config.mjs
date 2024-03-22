import nextPWA from '@ducanh2912/next-pwa';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextMDX from '@next/mdx';
import { next } from 'million/compiler';

import { isDev, isDocker } from './config/env.config.mjs';
import { headers, images } from './config/security.config.mjs';
import { env } from './src/lib/env/env.mjs';

/** @type {import("next").NextConfig} */
const nextConfig = {
  images,
  headers,
  swcMinify: true,
  reactStrictMode: true,
  output: isDocker ? 'standalone' : undefined,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    ppr: false,
    serverSourceMaps: true,
    serverMinification: true,
    instrumentationHooks: true
  },
  rewrites() {
    return [
      { source: '/healthz', destination: '/api/health' },
      { source: '/api/healthz', destination: '/api/health' },
      { source: '/health', destination: '/api/health' },
      { source: '/ping', destination: '/api/health' }
    ];
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
};
const plugins = [
  nextBundleAnalyzer({ enabled: env.ANALYZE }),
  nextPWA({
    dest: 'public',
    disable: isDev
  }),
  nextMDX({
    extension: /\.(md|mdx)$/
  })
];

const pluginsConfig = plugins.reduce((acc, next) => {
  return next(acc);
}, nextConfig);

const config = async () => {
  await import('./src/lib/env/env.mjs');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return next(pluginsConfig, {
    rsc: true,
    mute: true,
    auto: { rsc: true }
  });
};

export default config;

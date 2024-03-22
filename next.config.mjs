import withPWA from '@ducanh2912/next-pwa';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { next } from 'million/compiler';
import withPlugins from 'next-compose-plugins';

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
    serverMinification: true
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

const millionConfig = {
  auto: { rsc: true } // if you're using RSC: auto: { rsc: true },
};

const config = withPlugins(
  [
    [withBundleAnalyzer({ enabled: env.ANALYZE })],
    [
      withPWA({
        dest: 'public',
        disable: isDev
      })
    ]
  ],
  next(nextConfig, millionConfig)
);

export default config;

import nextPWA from '@ducanh2912/next-pwa';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextMDX from '@next/mdx';
import { next } from 'million/compiler';

import { isDev, isDocker } from './config/env.config.mjs';
import { rewrites } from './config/rewrites.config.mjs';
import { headers, images } from './config/security.config.mjs';
import { env } from './src/lib/env/env.mjs';

/** @type {import("next").NextConfig} */
const nextConfig = {
  images,
  headers,
  rewrites,
  swcMinify: true,
  trailingSlash: false,
  reactStrictMode: true,
  output: isDocker ? 'standalone' : undefined,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    ppr: false,
    mdxRs: true,
    // typedRoutes: true,
    serverSourceMaps: true,
    serverMinification: true,
    instrumentationHook: false
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  webpack: (config) => {
    config.module.rules.push({
      use: ['@svgr/webpack'],
      test: /\.svg$/
    });

    return config;
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

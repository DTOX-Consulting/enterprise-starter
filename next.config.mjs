import nextPWA from '@ducanh2912/next-pwa';
import { next as nextMillionLint } from '@million/lint';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs';
import { next as nextMillionCompiler } from 'million/compiler';
import { $ } from 'zx';

import { isDev, isVercel, isCloudflare, isDocker } from './config/env.config.mjs';
import { rewrites } from './config/rewrites.config.mjs';
import { headers, images } from './config/security.config.mjs';
import { env } from './src/lib/env/env.mjs';

console.table({ isDev, isDocker, isVercel, isCloudflare });

/** @type {import("next").NextConfig} */
const nextConfig = {
  images,
  headers,
  rewrites,
  swcMinify: true,
  trailingSlash: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: isDev,
  output: isDocker ? 'standalone' : undefined,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    ppr: false,
    mdxRs: true,
    // typedRoutes: true,
    serverSourceMaps: isDev,
    serverMinification: !isDev,
    instrumentationHook: isVercel && !isCloudflare
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  webpack: (config) => {
    config.optimization.minimize = !isDev;
    config.module.rules.push({
      use: ['@svgr/webpack'],
      test: /\.svg$/
    });

    return config;
  }
};
/**
 *
 *
 * @param {Parameters<typeof withSentryConfig>[1]} buildOptions
 */
const nextSentry = (buildOptions) => {
  /**
   *
   *
   * @param {import("next").NextConfig} config
   */
  return (config) => (isVercel && !isCloudflare ? withSentryConfig(config, buildOptions) : config);
};

/** @type {((config: import('next').NextConfig) => import('next').NextConfig)[]} */
const plugins = [
  nextBundleAnalyzer({ enabled: env.ANALYZE }),
  nextPWA({
    dest: 'public',
    disable: isDev
  }),
  nextMDX({
    extension: /\.(md|mdx)$/
  }),
  nextSentry({
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: env.SENTRY_ORG,
    project: env.SENTRY_PROJECT,

    // An auth token is required for uploading source maps.
    authToken: env.SENTRY_AUTH_TOKEN,

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Hides source maps from generated client bundles
    hideSourceMaps: !isDev,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: !isDev,

    debug: !isDev,

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    telemetry: false,

    autoInstrumentServerFunctions: true,
    autoInstrumentAppDirectory: true,
    autoInstrumentMiddleware: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: '/monitoring',

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true
  })
];

const pluginsConfig = plugins.reduce((acc, plugin) => plugin(acc), nextConfig);

/**
 *
 *
 * @returns {import("next").NextConfig}
 */
const nextMillion = () => {
  const lint = nextMillionLint({
    rsc: true
  });

  /** @type {import("next").NextConfig} */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const config = lint(pluginsConfig);

  /** @type {import("next").NextConfig} */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return nextMillionCompiler(config, {
    rsc: true,
    auto: true,
    filter: {
      exclude: ['**/node_modules/**/*', '**/src/components/ui/organisms/chat/icons.tsx']
    }
  });
};

const config = async () => {
  await import('./src/lib/env/env.mjs');

  if (isVercel && !isCloudflare) {
    await $`bash ./scripts/comment_runtime.sh src/app page.tsx layout.tsx not-found.tsx`;
  }

  if (1 === 1) {
    return pluginsConfig;
  }

  return nextMillion();
};

export default config;

import nextPWA from '@ducanh2912/next-pwa';
import { withHighlightConfig } from '@highlight-run/next/config';
import { next as nextMillionLint } from '@million/lint';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextMDX from '@next/mdx';
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
  trailingSlash: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  bundlePagesRouterDependencies: true,
  output: isDocker ? 'standalone' : undefined,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  serverExternalPackages: ['@highlight-run/node', 'require-in-the-middle'],
  experimental: {
    ppr: false,
    mdxRs: true,
    esmExternals: true,
    // typedRoutes: true,
    nextScriptWorkers: true,
    serverSourceMaps: isDev,
    serverMinification: !isDev,
    // esmExternals: isDev ? true : 'loose',
    staleTimes: {
      dynamic: 30, // Manually set dynamic route staleTime to 30 seconds
      static: 180
    }
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
  webpack: (config, { isServer }) => {
    if (isServer) {
      // config.devtool = 'source-map';
      config.ignoreWarnings = config.ignoreWarnings ?? [];
      config.ignoreWarnings.push({ module: /highlight-(run\/)?node/ });
    }

    config.optimization.minimize = !isDev;
    config.module.rules.push({
      use: ['@svgr/webpack'],
      test: /\.svg$/
    });

    return config;
  }
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
};

/**
 * Creates a Next.js config with Highlight integration.
 *
 * @param highlightConfig - Highlight configuration options
 * @returns A function that applies Highlight config
 */
const nextHighlight = (highlightConfig) => async (config) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  withHighlightConfig(config, highlightConfig);

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
  nextHighlight({
    uploadSourceMaps: !isDev,
    apiKey: env.HIGHLIGHT_SOURCEMAP_API_KEY
  })
];

const pluginsConfig = plugins.reduce((acc, plugin) => plugin(acc), nextConfig);

/**
 * Configures Next.js with Million.js optimizations.
 *
 * @returns Optimized Next.js configuration
 */
const _nextMillion = () => {
  const lint = nextMillionLint({
    rsc: true
  });

  /** @type {import("next").NextConfig} */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const config = lint(pluginsConfig);

  /** @type {import("next").NextConfig} */
  // eslint-disable-next-line sonarjs/prefer-immediate-return, @typescript-eslint/no-unsafe-assignment
  const final = nextMillionCompiler(config, {
    rsc: true,
    auto: true,
    filter: {
      exclude: ['**/node_modules/**/*', '**/src/components/ui/organisms/chat/icons.tsx']
    }
  });

  return final;
};

/**
 * Asynchronous configuration function for Next.js.
 *
 * @returns Next.js configuration
 */
const config = async () => {
  await import('./src/lib/env/env.mjs');

  if (isVercel && !isCloudflare) {
    await $`bash ./scripts/comment_runtime.sh src/app page.tsx layout.tsx not-found.tsx sitemap.ts`;
  } else if (isCloudflare) {
    await $`bash ./scripts/change_runtime.sh edge src/app route.ts page.tsx layout.tsx not-found.tsx sitemap.ts`;
  }

  // return _nextMillion();
  return pluginsConfig;
};

export default config;

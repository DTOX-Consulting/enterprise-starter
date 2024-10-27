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

// eslint-disable-next-line no-console
console.table({ isDev, isDocker, isVercel, isCloudflare });

/** @type {import("next").NextConfig} */
const nextConfig = {
  images,
  headers,
  rewrites,
  swcMinify: true,
  trailingSlash: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  output: isDocker ? 'standalone' : undefined,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    ppr: false,
    mdxRs: true,
    esmExternals: true,
    // typedRoutes: true,
    nextScriptWorkers: true,
    serverSourceMaps: isDev,
    serverMinification: !isDev,
    instrumentationHook: !isDev,
    // esmExternals: isDev ? true : 'loose',
    serverComponentsExternalPackages: ['@highlight-run/node']
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
  webpack: (config, { isServer, nextRuntime, webpack }) => {
    const createPlugins = (modules) =>
      modules.map(
        (module) =>
          new webpack.NormalModuleReplacementPlugin(new RegExp(`^node:${module}`), (resource) => {
            resource.request = resource.request.replace(/^node:/, '');
          })
      );

    if (isCloudflare && (!isServer || nextRuntime === 'edge')) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: true,
        crypto: true
      };

      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^crypto/
        })
        // new webpack.ProvidePlugin({
        //   process: 'process/browser'
        // })
      );

      config.plugins.push(
        ...createPlugins([
          'fs',
          'path',
          'os',
          'crypto',
          'process',
          'stream',
          'buffer',
          'util',
          'assert',
          'tty'
        ])
      );
    }

    if (isServer) {
      config.devtool = 'source-map';
      config.ignoreWarnings = config.ignoreWarnings;
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
const nextHighlight =
  (highlightConfig) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
     async (config) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
       withHighlightConfig(config, highlightConfig)

  ;

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
    // eslint-disable-next-line n/no-process-env
    apiKey: process.env.HIGHLIGHT_SOURCEMAP_API_KEY
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

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
  /** @type {import("next").NextConfig} */
  const config = lint(pluginsConfig);

  /** @type {import("next").NextConfig} */
  return nextMillionCompiler(config, {
    rsc: true,
    auto: true,
    filter: {
      exclude: ['**/node_modules/**/*', '**/src/components/ui/organisms/chat/icons.tsx']
    }
  });
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
};

/**
 * Asynchronous configuration function for Next.js.
 *
 * @returns Next.js configuration
 */
const config = async () => {
  await import('./src/lib/env/env.mjs');

  if (isVercel && !isCloudflare) {
    await $`echo "\n\n*" >> .eslintignore`;
    await $`bash ./scripts/comment_runtime.sh src/app page.tsx layout.tsx not-found.tsx sitemap.ts`;
  } else if (isCloudflare) {
    await $`bash ./scripts/change_runtime.sh edge src/app route.ts page.tsx layout.tsx not-found.tsx sitemap.ts`;
  }

  return pluginsConfig;
};

export default config;

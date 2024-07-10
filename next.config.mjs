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
    instrumentationHook: isVercel && !isCloudflare,
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

  webpack: (config, { isServer, nextRuntime, webpack }) => {
    const createPlugins = (modules) => {
      return modules.map(
        (module) =>
          new webpack.NormalModuleReplacementPlugin(new RegExp(`^node:${module}`), (resource) => {
            resource.request = resource.request.replace(/^node:/, '');
          })
      );
    };

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
      config.ignoreWarnings = config.ignoreWarnings || [];
      config.ignoreWarnings.push({ module: /highlight-(run\/)?node/ });
    }

    config.optimization.minimize = !isDev;
    config.module.rules.push({
      use: ['@svgr/webpack'],
      test: /\.svg$/
    });

    return config;
  }
};

const nextHighlight = () => {
  /**
   *
   *
   * @param {import("next").NextConfig} config
   */
  return async (config) => withHighlightConfig(config);
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
  nextHighlight()
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
    await $`echo "\n\n*" >> .eslintignore`;
    await $`bash ./scripts/comment_runtime.sh src/app page.tsx layout.tsx not-found.tsx sitemap.ts`;
  } else if (isCloudflare) {
    await $`bash ./scripts/change_runtime.sh edge src/app route.ts page.tsx layout.tsx not-found.tsx sitemap.ts`;
  }

  return pluginsConfig;

  // return nextMillion();
};

export default config;

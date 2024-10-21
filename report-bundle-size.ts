/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// edited to work with the appdir by @raphaelbadia

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

import { sync as mkdirpSync } from 'mkdirp';
import { stringify } from 'safe-stable-stringify';

// Define types for build manifests
type BuildManifest = {
  pages: Record<string, string[]>;
  rootMainFiles?: string[];
};

type AppBuildManifest = {
  pages: Record<string, string[]>;
};

type PackageJSON = {
  nextBundleAnalysis?: { buildOutputDirectory?: string };
  name: string;
};

// Define the memory cache type
type MemoryCache = Record<string, [number, number]>;

// Pull options from `package.json`
const options = getOptions();
const BUILD_OUTPUT_DIRECTORY = getBuildOutputDirectory(options);

// Define the build output directory path
const nextMetaRoot = path.join(process.cwd(), BUILD_OUTPUT_DIRECTORY);

try {
  // Check if the build output directory exists and is readable
  fs.accessSync(nextMetaRoot, fs.constants.R_OK);
} catch (err) {
  if (err instanceof Error) {
    console.error(
      `No build output found at "${nextMetaRoot}" - you may not have your working directory set correctly, or not have run "next build".`
    );
    throw err;
  }
  throw new Error('An unexpected error occurred.');
}

// Read and parse the build manifest and app build manifest JSON files
const buildMeta: BuildManifest = JSON.parse(
  fs.readFileSync(path.join(nextMetaRoot, 'build-manifest.json'), 'utf8')
) as BuildManifest;
const appDirMeta: AppBuildManifest = JSON.parse(
  fs.readFileSync(path.join(nextMetaRoot, 'app-build-manifest.json'), 'utf8')
) as AppBuildManifest;

// This memory cache ensures we don't read any script file more than once
const memoryCache: MemoryCache = {};

// Since _app is the template that all other pages are rendered into,
// every page must load its scripts. We'll measure its size here
const globalBundle = buildMeta.pages['/_app'];
if (!globalBundle) {
  throw new Error('Global bundle not found in buildMeta.');
}
const _globalBundleSizes = getScriptSizes(globalBundle);

// Calculate the size of each page's scripts, after subtracting out the global scripts
const _allPageSizes = Object.keys(buildMeta.pages).reduce(
  (acc, pagePath) => {
    const scriptPaths = buildMeta.pages[pagePath];
    if (!scriptPaths) {
      throw new Error(`Script paths not found for page: ${pagePath}`);
    }
    const scriptSizes = getScriptSizes(
      scriptPaths.filter((scriptPath) => !globalBundle.includes(scriptPath))
    );

    acc[pagePath] = scriptSizes;
    return acc;
  },
  {} as Record<string, { raw: number; gzip: number }>
);

// Get the size of the global app directory bundle
const globalAppDirBundle = buildMeta.rootMainFiles ?? [];
// if (!globalAppDirBundle) {
//   throw new Error("Global app dir bundle not found in buildMeta.");
// }
const globalAppDirBundleSizes = getScriptSizes(globalAppDirBundle);

// Calculate the size of each app directory page's scripts
const allAppDirSizes = Object.keys(appDirMeta.pages).reduce(
  (acc, pagePath) => {
    const scriptPaths = appDirMeta.pages[pagePath];
    if (!scriptPaths) {
      throw new Error(`Script paths not found for page: ${pagePath}`);
    }
    const scriptSizes = getScriptSizes(
      scriptPaths.filter((scriptPath) => !globalAppDirBundle.includes(scriptPath))
    );
    acc[pagePath] = scriptSizes;

    return acc;
  },
  {} as Record<string, { raw: number; gzip: number }>
);

// Format and write the output
const rawData = stringify({
  ...allAppDirSizes,
  __global: globalAppDirBundleSizes
});

// Log outputs to the GH actions panel
console.log(rawData);

// Ensure the output directory exists and write the bundle analysis data
mkdirpSync(path.join(nextMetaRoot, 'analyze/'));
fs.writeFileSync(path.join(nextMetaRoot, 'analyze/__bundle_analysis.json'), rawData as string);

// --------------
// Util Functions
// --------------

// Given an array of scripts, return the total of their combined file sizes
function getScriptSizes(scriptPaths: string[]): { raw: number; gzip: number } {
  return scriptPaths.reduce(
    (acc, scriptPath) => {
      const [rawSize, gzipSize] = getScriptSize(scriptPath);
      acc.raw += rawSize;
      acc.gzip += gzipSize;

      return acc;
    },
    { raw: 0, gzip: 0 }
  );
}

// Given an individual path to a script, return its file size
function getScriptSize(scriptPath: string): [number, number] {
  const encoding = 'utf8';
  const p = path.join(nextMetaRoot, scriptPath);

  if (memoryCache[p]) {
    return memoryCache[p];
  }

  const textContent = fs.readFileSync(p, encoding);
  const rawSize = Buffer.byteLength(textContent, encoding);
  const gzipSize = zlib.gzipSync(textContent).length;

  memoryCache[p] = [rawSize, gzipSize];
  return [rawSize, gzipSize];
}

// Reads options from `package.json`
function getOptions(pathPrefix = process.cwd()): { buildOutputDirectory?: string; name: string } {
  const pkgContent = fs.readFileSync(path.join(pathPrefix, 'package.json'), 'utf8');
  let pkg: PackageJSON;

  try {
    pkg = JSON.parse(pkgContent) as PackageJSON;
  } catch {
    throw new Error('Failed to parse package.json.');
  }

  return { ...pkg.nextBundleAnalysis, name: pkg.name };
}

// Gets the output build directory, defaults to `.next`
function getBuildOutputDirectory(options: { buildOutputDirectory?: string }): string {
  return options.buildOutputDirectory ?? '.next';
}

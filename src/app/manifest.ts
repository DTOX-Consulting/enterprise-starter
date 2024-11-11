/* eslint-disable promise/prefer-await-to-then, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { resolve } from 'node:path';

import { $ } from 'zx';

import { name, shortName, shortDescription, themeColor, backgroundColor } from '@/app/metadata';

import type { MetadataRoute } from 'next';

type IconType = NonNullable<MetadataRoute.Manifest['icons']>[0] & {
  targets: ('manifest' | 'favicon' | 'apple' | 'android' | 'ms')[];
  element?: string;
};

type Manifest = MetadataRoute.Manifest & {
  apple: {
    precomposed: boolean;
    webAppCapable: boolean;
    statusBarStyle: 'black-translucent';
    formatDetection: {
      telephone: boolean;
    };
  };
  ms: {
    tileColor: string;
  };
};

const inputRoot = 'src/assets/images';
const iconRoot = 'public/images/icons';
const logoRoot = 'public/images/logos';
const screenshotRoot = 'public/images/screenshots';

const allSizes = [/* 16, 32, */ 36, 48, 64, 70, 72, 96, 128, 144, 150, 152, 192, 310, 384, 512];

const ROOT_DIR = resolve(__dirname, '../..');

const ensureDir = async (dir: string) => {
  const pDir = resolve(ROOT_DIR, `${dir}`);
  await $`mkdir -p ${pDir}`;
};

export default function manifest(): Manifest {
  const { icons, screenshots } = generateManifestImages();

  return {
    name,
    icons,
    screenshots,
    short_name: shortName,
    description: shortDescription,
    theme_color: themeColor,
    background_color: backgroundColor,
    dir: 'ltr',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    id: '/?utm_source=pwa',
    start_url: '/?utm_source=pwa',
    display_override: ['fullscreen', 'minimal-ui'],
    apple: {
      precomposed: false,
      webAppCapable: true,
      statusBarStyle: 'black-translucent',
      formatDetection: {
        telephone: true
      }
    },
    ms: {
      tileColor: themeColor
    }
  };
}

const generateManifestImages = () => {
  const icons = allSizes.map((size) => {
    const sizes = `${size}x${size}`;

    const result: IconType = {
      sizes,
      type: 'image/png',
      // purpose: 'maskable',
      src: `/${logoRoot}/icon-${size}.png`,
      targets: ['manifest', 'apple', 'android']
    };

    if ([16, 32].includes(size)) result.targets = ['favicon'];
    if (![16, 32].includes(size)) result.src = `/${logoRoot}/logo-${size}.png`;

    if ([192, 384, 512].includes(size)) result.purpose = 'maskable';

    if ([150, 310].includes(size)) {
      result.targets = ['ms'];
      result.element = `square${sizes}logo`;
    }

    return result;
  });

  const screenshots = ['narrow', 'narrow', 'wide', 'wide'].map((formFactor, index) => {
    const isN = formFactor === 'narrow';
    const sizes1 = `${isN ? '540' : '720'}x${isN ? '720' : '540'}`;
    const sizes2 = `${isN ? '1080' : '1440'}x${isN ? '1440' : '1080'}`;

    const sizes = index % 2 === 0 ? sizes1 : sizes2;

    return {
      sizes,
      type: 'image/png',
      form_factor: formFactor,
      src: `/${screenshotRoot}/screenshot-${sizes}.png`
    };
  });

  [...icons, ...screenshots].forEach((icon) => {
    icon.src = icon.src.replace('public/', '');
  });

  return {
    icons,
    screenshots
  };
};

const getSharp = async () => {
  try {
    return (await import('sharp')).default;
  } catch (error) {
    console.warn('Sharp not available - skipping image generation', error);
    return null;
  }
};

const generateLogos = async () => {
  const sharp = await getSharp();
  if (sharp === null) return;

  await ensureDir(logoRoot);
  await ensureDir(iconRoot);

  allSizes.forEach(async (size) => {
    const svgPath = resolve(ROOT_DIR, `${inputRoot}/logo.svg`);
    const pngPath = resolve(ROOT_DIR, `${inputRoot}/logo.png`);

    const input = (await $`test -f ${svgPath}`.exitCode) === 0 ? svgPath : pngPath;
    const output = resolve(ROOT_DIR, `${logoRoot}/logo-${size}.png`);

    sharp(input)
      .png()
      .resize({
        width: size,
        height: size,
        fit: 'contain',
        background: 'transparent'
      })
      .toFile(output, logError);
  });

  allSizes.forEach(async (size) => {
    const svgPath = resolve(ROOT_DIR, `${inputRoot}/icon.svg`);
    const pngPath = resolve(ROOT_DIR, `${inputRoot}/icon.png`);

    const input = (await $`test -f ${svgPath}`.exitCode) === 0 ? svgPath : pngPath;
    const output = resolve(ROOT_DIR, `${iconRoot}/icon-${size}.png`);

    sharp(input)
      .png()
      .resize({
        width: size,
        height: size,
        fit: 'contain',
        background: 'transparent'
      })
      .toFile(output, logError);
  });
};

const generateScreenshots = async () => {
  const sharp = await getSharp();
  if (sharp === null) return;

  await ensureDir(screenshotRoot);

  return ['narrow', 'narrow', 'wide', 'wide'].map((formFactor, index) => {
    const isN = formFactor === 'narrow';
    const sizes1 = `${isN ? '540' : '720'}x${isN ? '720' : '540'}`;
    const sizes2 = `${isN ? '1080' : '1440'}x${isN ? '1440' : '1080'}`;

    const sizes = index % 2 === 0 ? sizes1 : sizes2;

    const input = resolve(ROOT_DIR, `${inputRoot}/screenshot.png`);
    const output = resolve(ROOT_DIR, `${screenshotRoot}/screenshot-${sizes}.png`);

    sharp(input)
      .resize(...(sizes.split('x').map(Number) as [number, number]))
      .png()
      .toFile(output, logError);
  });
};

const logError = (err?: Error) => {
  if (err) console.error(err);
};

const generateImages = async () => {
  await generateLogos();
  await generateScreenshots();
};

export { generateManifestImages, generateImages };

if (require.main === module) {
  generateImages()
    .then(() => console.log('Manifest and images generated'))
    .catch(console.error);
}

/* eslint-enable */

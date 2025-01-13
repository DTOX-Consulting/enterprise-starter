/* eslint-disable promise/prefer-await-to-then */
import { resolve } from 'node:path';

import { G } from '@mobily/ts-belt';
import { $ } from 'zx';

import {
  name,
  shortName,
  description,
  themeColor,
  backgroundColor,
  url,
  staticMetaData,
  relatedApplications
} from '@/app/metadata';

import type { MetadataRoute } from 'next';

type IconType = Omit<NonNullable<MetadataRoute.Manifest['icons']>[0], 'purpose'> & {
  targets: ('manifest' | 'favicon' | 'apple' | 'android' | 'ms')[];
  purpose?: 'any' | 'maskable' | 'monochrome' | 'any maskable';
  element?: string;
};

type FileAccept = Record<string, string[]>;

type ShareTargetParams = {
  name: string;
  value: string;
  required?: boolean;
  title?: string;
  text?: string;
  url?: string;
  files?: {
    name: string;
    accept: string[];
  }[];
};

type Manifest = Omit<MetadataRoute.Manifest, 'icons'> & {
  icons: IconType[];
  lang?: string;
  prefer_related_applications?: boolean;
  related_applications?: {
    platform: 'play' | 'itunes' | 'windows' | 'webapp';
    url: string;
    id: string;
  }[];
  scope_extensions?: {
    origin: string;
  }[];
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
  edge_side_panel?: {
    preferred_width?: number;
  };
  file_handlers?: {
    action: string;
    accept: FileAccept;
    launch_type?: 'single-client' | 'multiple-clients';
  }[];
  handle_links?: {
    handles: {
      protocol: string;
      url: string;
    }[];
  };
  protocol_handlers?: {
    protocol: string;
    url: string;
  }[];
  share_target?: {
    action: string;
    method?: 'GET' | 'POST';
    enctype?: string;
    params: ShareTargetParams;
  };
  shortcuts?: {
    name: string;
    short_name?: string;
    description?: string;
    url: string;
    icons?: {
      src: string;
      sizes: string;
      type?: string;
    }[];
  }[];
  widgets?: {
    name: string;
    short_name?: string;
    description?: string;
    tag: string;
    ms_ac_template?: string;
    data?: string;
    screenshots?: {
      src: string;
      sizes: string;
      type?: string;
    }[];
    icons?: {
      src: string;
      sizes: string;
      type?: string;
    }[];
  }[];
  launch_handler?: {
    client_mode: 'focus-existing' | 'auto' | 'navigate-new';
  };
  categories?: string[];
  iarc_rating_id?: string;
  background_sync?: {
    periodic?: boolean;
    minPeriod?: number;
    maxPeriod?: number;
  };
};

const inputRoot = 'src/assets/images';
const iconRoot = 'public/images/icons';
const logoRoot = 'public/images/logos';
const screenshotRoot = 'public/images/screenshots';

const allSizes = [
  /* 16, 32, */ 36, 48, 64, 70, 72, 96, 128, 144, 150, 152, 192, 310, 384, 512, 512
];

const ROOT_DIR = resolve(__dirname, '../..');

const ensureDir = async (dir: string) => {
  const pDir = resolve(ROOT_DIR, `${dir}`);
  await $`mkdir -p ${pDir}`;
};

// eslint-disable-next-line max-lines-per-function
export default function manifest(): Manifest {
  const { icons, screenshots } = generateManifestImages();
  const protocol = `web+${shortName.toLowerCase()}`;

  return {
    name,
    icons,
    screenshots,
    description,
    short_name: shortName,
    theme_color: themeColor,
    background_color: backgroundColor,
    prefer_related_applications: false,
    dir: 'ltr',
    scope: '/',
    lang: 'en-GB',
    iarc_rating_id: '3+',
    display: 'standalone',
    orientation: 'portrait',
    id: '/?utm_source=pwa',
    start_url: '/?utm_source=pwa',
    categories: staticMetaData.keywords as string[],
    display_override: ['standalone', 'fullscreen', 'minimal-ui', 'window-controls-overlay'],
    launch_handler: {
      client_mode: 'focus-existing'
    },
    scope_extensions: [
      {
        origin: url
      }
    ],
    related_applications: Object.values(relatedApplications).map((app) => ({
      platform: app.platform,
      url: app.url,
      id: app.id
    })),
    apple: {
      precomposed: false,
      statusBarStyle: 'black-translucent',
      webAppCapable:
        G.isNotNullable(staticMetaData.appleWebApp) &&
        typeof staticMetaData.appleWebApp === 'object'
          ? (staticMetaData.appleWebApp.capable ?? true)
          : true,
      formatDetection: {
        telephone:
          G.isNotNullable(staticMetaData.formatDetection) &&
          typeof staticMetaData.formatDetection === 'object'
            ? (staticMetaData.formatDetection.telephone ?? true)
            : true
      }
    },
    ms: {
      tileColor: themeColor
    },
    edge_side_panel: {
      preferred_width: 400
    },
    file_handlers: [
      {
        action: '/upload',
        launch_type: 'single-client',
        accept: {
          'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
          'application/pdf': ['.pdf']
        }
      }
    ],
    handle_links: {
      handles: [
        {
          protocol,
          url: '/handle/%s'
        }
      ]
    },
    protocol_handlers: [
      {
        protocol,
        url: '/protocol/%s'
      }
    ],
    share_target: {
      method: 'POST',
      action: '/share-target',
      enctype: 'multipart/form-data',
      params: {
        url: 'url',
        text: 'text',
        title: 'title',
        name: 'media',
        value: 'files',
        required: false,
        files: [{ name: 'media', accept: ['image/*', 'application/pdf'] }]
      }
    },
    background_sync: {
      periodic: true,
      minPeriod: 86400, // 24 hours in seconds
      maxPeriod: 604800 // 7 days in seconds
    }
  };
}

const generateManifestImages = () => {
  const icons = allSizes.map((size, idx) => {
    const sizes = `${size}x${size}`;

    const result: IconType = {
      sizes,
      type: 'image/png',
      src: `/${logoRoot}/icon-${size}.png`,
      targets: ['manifest', 'apple', 'android']
    };

    if ([16, 32].includes(size)) result.targets = ['favicon'];
    if (![16, 32].includes(size)) result.src = `/${logoRoot}/logo-${size}.png`;

    if ([192, 384, 512].includes(size)) result.purpose = 'maskable';
    if (idx === allSizes.length - 1) result.purpose = 'any';

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
      form_factor: formFactor as 'narrow' | 'wide',
      src: `/${screenshotRoot}/screenshot-${sizes}.png`
    };
  });

  const allImages = [...icons, ...screenshots];
  for (const icon of allImages) {
    icon.src = icon.src.replace('public/', '');
  }

  return {
    icons,
    screenshots
  };
};

const getSharp = async () => {
  try {
    const { default: sharp } = await import('sharp');
    return sharp;
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

  await Promise.all(
    allSizes.map(async (size) => {
      const svgPath = resolve(ROOT_DIR, `${inputRoot}/logo.svg`);
      const pngPath = resolve(ROOT_DIR, `${inputRoot}/logo.png`);

      const input = (await $`test -f ${svgPath}`.exitCode) === 0 ? svgPath : pngPath;
      const output = resolve(ROOT_DIR, `${logoRoot}/logo-${size}.png`);

      return sharp(input)
        .png()
        .resize({
          width: size,
          height: size,
          fit: 'contain',
          background: 'transparent'
        })
        .toFile(output, logError);
    })
  );

  await Promise.all(
    allSizes.map(async (size) => {
      const svgPath = resolve(ROOT_DIR, `${inputRoot}/icon.svg`);
      const pngPath = resolve(ROOT_DIR, `${inputRoot}/icon.png`);

      const input = (await $`test -f ${svgPath}`.exitCode) === 0 ? svgPath : pngPath;
      const output = resolve(ROOT_DIR, `${iconRoot}/icon-${size}.png`);

      return sharp(input)
        .png()
        .resize({
          width: size,
          height: size,
          fit: 'contain',
          background: 'transparent'
        })
        .toFile(output, logError);
    })
  );
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

    return sharp(input)
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

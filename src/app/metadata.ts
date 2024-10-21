import type { Metadata, Viewport } from 'next';

export const name = 'Your Company Name';
export const shortName = 'Your Company';
export const template = `%s | ${name}`;

export const phone = '555-5555-5555';
export const domain = 'example.com';
export const url = 'https://your-website.example.com';

export const email = 'your.email@example.com';
export const devEmail = 'dev.email@example.com';
export const noReplyEmail = 'no-reply@example.com';

export const shortDescription = 'Your Short Description Here';
export const title = `${name} - ${shortDescription}`;

export const ogImage = `${url}/images/logos/og/og.png`;
export const logoImage = `${url}/images/logos/og/logo.png`;
export const twitterImage = `${url}/images/logos/og/twitter.png`;

export const description =
  'Your company description goes here. Provide a brief overview of what your company does and stands for.';

export const socialDescription = 'Your company description for social media goes here. Customize it to convey your brand\'s message and values. #YourHashtagsHere #YourBrand';

export const longDescription =
  'Your detailed company description goes here. Discuss your values, mission, and what sets your company apart. Highlight the unique aspects of your products or services. Customize this section to showcase your brand personality and engage your audience.';

export const themeColor = '#ffffff';
export const backgroundColor = '#ffffff';

export const staticViewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark',
  width: 'device-width',
  viewportFit: 'contain',
  interactiveWidget: 'overlays-content',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

export const staticMetaData: Metadata = {
  metadataBase: null,
  title: {
    template,
    default: title
  },
  description,
  creator: name,
  publisher: name,
  applicationName: name,
  authors: [{ name, url }],
  referrer: 'origin',
  generator: 'Next.js',
  keywords: ['Your', 'Keywords', 'Here'],
  formatDetection: {
    url: false,
    date: false,
    email: false,
    address: false,
    telephone: false
  },
  appleWebApp: {
    title: name,
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        url: '/images/logos/favicon/apple-icon.png'
      }
    ]
  },
  twitter: {
    title,
    site: '@your_twitter_handle',
    creator: '@your_twitter_handle',
    card: 'summary_large_image',
    description: socialDescription,
    images: [
      {
        alt: name,
        url: twitterImage
      }
    ]
  },
  openGraph: {
    url,
    title,
    siteName: name,
    type: 'website',
    description: socialDescription,
    images: [
      {
        alt: name,
        url: ogImage
      }
    ]
  }
};

export const socialMedia = {
  Linkedin: 'https://www.linkedin.com/company/your-linkedin',
  Facebook: 'https://facebook.com/your-facebook-page',
  Twitter: 'https://twitter.com/your_twitter_handle',
  Instagram: 'https://instagram.com/your-instagram'
} as const;

export const personalSocialMedia = {
  YourName: ['https://www.linkedin.com/in/your-linkedin-profile']
} as const;

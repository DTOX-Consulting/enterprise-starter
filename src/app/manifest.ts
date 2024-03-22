import { type MetadataRoute } from 'next';

import { name, shortName, shortDescription } from '@/app/metadata';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name,
    short_name: shortName,
    description: shortDescription,
    start_url: '/?utm_source=pwa',
    display: 'standalone',
    theme_color: '#fff',
    background_color: '#fff',
    icons: [
      {
        src: '/images/logos/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/images/logos/favicon/android-chrome-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/images/logos/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/images/logos/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/logos/favicon/android-chrome-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/logos/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}

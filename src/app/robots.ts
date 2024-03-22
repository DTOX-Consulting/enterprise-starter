import type { MetadataRoute } from 'next';

import { url } from '@/app/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // allow: '/',
      userAgent: '*',
      disallow: ['/private/', '/admin/']
    },
    sitemap: `${url}/sitemap.xml`
  };
}

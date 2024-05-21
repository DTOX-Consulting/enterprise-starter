import { url } from '@/app/metadata';

import type { MetadataRoute } from 'next';


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

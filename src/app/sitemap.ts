import { url } from '@/app/metadata';

import type { MetadataRoute } from 'next';

export const runtime = 'nodejs';

const currentDate = new Date();

const changeTypes = {
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  yearly: 'yearly'
} as const;

const priorities = {
  1: 1,
  2: 0.8,
  3: 0.5
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await Promise.resolve();

  return [
    {
      url,
      priority: priorities[1],
      lastModified: currentDate,
      changeFrequency: changeTypes.yearly
    },
    {
      url: `${url}/about`,
      priority: priorities[2],
      lastModified: currentDate,
      changeFrequency: changeTypes.monthly
    },
    {
      url: `${url}/contact`,
      priority: priorities[2],
      lastModified: currentDate,
      changeFrequency: changeTypes.monthly
    }
  ];
}

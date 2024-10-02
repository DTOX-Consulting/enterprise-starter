import { url } from '@/app/metadata';

import type { MetadataRoute } from 'next';

export const runtime = 'nodejs';

const priority = 1;
const priority08 = 0.8;
const currentDate = new Date();
const changeFrequencyYearly = 'yearly';
const changeFrequencyMonthly = 'monthly';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await Promise.resolve();

  return [
    {
      url,
      priority,
      lastModified: currentDate,
      changeFrequency: changeFrequencyYearly
    },
    {
      url: `${url}/about`,
      priority: priority08,
      lastModified: currentDate,
      changeFrequency: changeFrequencyMonthly
    },
    {
      url: `${url}/contact`,
      priority: priority08,
      lastModified: currentDate,
      changeFrequency: changeFrequencyMonthly
    }
  ];
}

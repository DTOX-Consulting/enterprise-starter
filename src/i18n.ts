import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { locales, type Locale, type LocalePath } from '@/constants';

const hasLocale = (locale: string): locale is Locale => locales.includes(locale as Locale);

const createLocalePath = (locale: Locale): LocalePath => `../messages/${locale}.json`;

export type RequestConfig = Awaited<ReturnType<ReturnType<typeof getRequestConfig>>>;
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'en';

  if (!hasLocale(locale)) {
    return notFound();
  }

  const path = createLocalePath(locale);
  const messages = ((await import(path)) as { default: RequestConfig['messages'] }).default;

  return {
    messages
  };
}) as RequestConfig;

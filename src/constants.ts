export type Locale = (typeof locales)[number];
export type LocalePath = `../messages/${Locale}.json`;

export const locales = ['en'] as const;
export const defaultLocale = 'en';

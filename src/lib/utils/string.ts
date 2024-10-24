export const camelCaseToDashCase = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const camelCaseToTitleCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b([a-z])/g, (_, initial: string) => initial.toUpperCase());

export const dashCaseToTitleCase = (str: string): string =>
  str.replace(/-/g, ' ').replace(/\b([a-z])/g, (_, initial: string) => initial.toUpperCase());

export const dashCaseToCamelCase = (str: string): string =>
  str.replace(/-([a-z])/g, (_, initial: string) => initial.toUpperCase());

export const ucFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const isDashCase = (str: string): boolean => /^[a-z]+(-[a-z]+)*$/.test(str);
export const isCamelCase = (str: string): boolean => /^[a-z]+([A-Z][a-z]+)*$/.test(str);

export const ensureDashCase = (key: string): string =>
  isCamelCase(key) ? camelCaseToDashCase(key) : key;
export const ensureCamelCase = (key: string): string =>
  isDashCase(key) ? dashCaseToCamelCase(key) : key;

export function capitalize(str: string): string {
  if (!str || typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number): string => {
  if (!str || typeof str !== 'string' || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export function hash(str: string): string {
  if (!str || typeof str !== 'string') return str;

  let hashParam = 0;

  for (let indexParam = 0; indexParam < str.length; indexParam++) {
    hashParam = (hashParam << 5) - hashParam + str.charCodeAt(indexParam);
    hashParam |= 0; // Convert to 32bit integer
  }

  // Convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7.
  return (hashParam >>> 0).toString(36).padStart(7, '0');
}

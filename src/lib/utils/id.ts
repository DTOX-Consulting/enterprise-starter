import { customAlphabet } from 'nanoid';

let count = 0;
export function simpleId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  12
);

export const isNanoId = (id: string, length = 12) =>
  new RegExp(`^[0-9A-Za-z]{${length}}$`).test(id);

export const slugify = (name: string) => {
  const text = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '-')
    // eslint-disable-next-line sonarjs/anchor-precedence
    .replace(/^-|-$/gu, '');

  const id = nanoid(4);
  return `${text}-${id}`.toLowerCase().trim();
};

// Simple UUID generator
export const generateUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const rnd = randomInt(0, 16);
    const vr = char === 'x' ? rnd : (rnd & 0x3) | 0x8;
    return vr.toString(16);
  });

let seed = Date.now();

export function generateId(length = 12): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[randomInt(0, chars.length)]).join('');
}

export const randomInt = (min: number, max: number) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  if (minCeil >= maxFloor) {
    throw new Error('Min must be less than max');
  }

  seed = (seed * 16807) % 2147483647; // Park-Miller PRNG
  return minCeil + (seed % (maxFloor - minCeil + 1));
};

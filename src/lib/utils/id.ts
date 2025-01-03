import { customAlphabet } from 'nanoid';

let count = 0;
export function simpleId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export function generateId(length = 12): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  12
);

export const isNanoId = (id: string, length = 12) =>
  new RegExp(`^([0-9A-Za-z]{${length}})$`).test(id);

export const slugify = (name: string) => {
  const text = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/(^-)|(-$)/g, '');

  const id = nanoid(4);
  return `${text}-${id}`.toLowerCase().trim();
};

// Simple UUID generator
export const generateUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (i) => {
    const random = (Math.random() * 16) | 0;
    const value = i === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });

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
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');

  const id = nanoid(4);
  return `${text}-${id}`.toLowerCase().trim();
};

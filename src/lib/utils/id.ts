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

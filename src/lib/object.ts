import { G } from '@mobily/ts-belt';

export type KeyList<T> = (keyof T)[];

export type NonNullableRequiredKeys<T, K extends KeyList<T>> = {
  [Key in K[number]]: NonNullable<T[Key]>;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type GenericObject<K extends string = string, T = any> = Record<K, T>;

export type Exists<T, K extends KeyList<T>> = NonNullable<T> & NonNullableRequiredKeys<T, K>;

export function keysExist<T, K extends (keyof T)[]>(
  data?: T | undefined,
  keys?: K
): data is Exists<T, K> {
  const hasData = G.isNotNullable(data);
  const hasKeys = G.isNotNullable(keys);

  if (!hasData) {
    return false;
  }

  if (!hasKeys) {
    return true;
  }

  return !!keys.every((key) => Reflect.has(data, key));
}

export function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]] as [T, T];
  }

  return arr;
}

export function replaceWholeArray<T>(arr: T[], replacement: T[]) {
  Object.assign(arr, replacement, { length: replacement.length });
}

export function chunk<T>(arr: T[], totalLength: number): T[][] {
  const chunkSize = Math.ceil(arr.length / totalLength);

  return Array.from({ length: totalLength }, (_, i) => {
    const start = i * chunkSize;
    const end = Math.min((i + 1) * chunkSize, arr.length);
    return arr.slice(start, end);
  }).filter((subarray) => subarray.length > 0);
}

export function chunkWithListConsideration<T extends string>(arr: T[], totalLength: number): T[][] {
  if (arr.length <= totalLength) {
    return arr.map((item) => [item]);
  }

  // Separate all lists fully
  let separatedListItems: T[][] = [];
  let currentList: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    const currentItem = arr[i];

    if (currentItem?.match(/^\d+\./)) {
      // Check if the current item starts with a number followed by a period
      if (currentList.length > 0) {
        separatedListItems.push(currentList);
        currentList = [];
      }
    }

    if (currentItem) currentList.push(currentItem);
  }

  if (currentList.length > 0) {
    separatedListItems.push(currentList);
  }

  if (separatedListItems.length === 1) {
    separatedListItems = separatedListItems[0]?.map((item) => [item]) ?? [];
  }

  if (separatedListItems.length <= totalLength) {
    return separatedListItems;
  }

  // Create chunks based on the desired total chunk size
  const chunks: T[][] = [];
  let currentChunk: T[] = [];
  let currentChunkLength = 0;

  // get chunk size based on the total length and the number of lists
  const chunkSize = Math.ceil(arr.length / totalLength);

  for (const currentListItem of separatedListItems) {
    if (currentChunkLength + currentListItem.length > chunkSize) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
      } else {
        chunks.push(currentListItem);
      }
      currentChunk = [];
      currentChunkLength = 0;
    }

    currentChunk.push(...currentListItem);
    currentChunkLength += currentListItem.length;
  }

  if (currentChunk.length > 0) {
    chunks.length < totalLength
      ? chunks.push(currentChunk)
      : chunks[chunks.length - 1]?.push(...currentChunk);
  }

  ensureChunkLength(chunks, totalLength);

  return chunks;
}

export const splitChunksEvenly = (chunkedArray: string[][], columns: number): string[][] => {
  if (chunkedArray.length === 1) {
    return chunkedArray;
  }

  if (chunkedArray.length === columns) {
    chunkedArray[2] = [...(chunkedArray[1] ?? [])];
    chunkedArray[1] = [''];
  }

  return chunkedArray;
};

function ensureChunkLength<T>(chunks: T[][], totalLength: number) {
  if (chunks.length <= totalLength) {
    return;
  }

  const lastChunk = chunks[chunks.length - 1];
  const secondLastChunk = chunks[chunks.length - 2];
  secondLastChunk?.push(...(lastChunk ?? []));
  chunks.pop();

  ensureChunkLength(chunks, totalLength);
}

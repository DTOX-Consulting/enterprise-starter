export function chunkWithListConsideration<T extends string>(arr: T[], totalLength: number): T[][] {
  if (arr.length <= totalLength) {
    return arr.map((item) => [item]);
  }

  // Separate all lists fully
  let separatedListItems: T[][] = [];
  let currentList: T[] = [];

  for (const currentItem of arr) {
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

export function chunkWithListConsideration<T extends string>(arr: T[], totalLength: number): T[][] {
  if (arr.length <= totalLength) {
    return arr.map((item) => [item]);
  }

  // Separate all lists fully
  let separatedListItems: T[][] = [];
  let currentList: T[] = [];

  for (const currentItem of arr) {
    if (/^\d+\./.exec(currentItem)) {
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
    if (chunks.length < totalLength) {
      chunks.push(currentChunk);
    } else {
      chunks[chunks.length - 1]?.push(...currentChunk);
    }
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

export const addPeriod = (str: string) => {
  const punctuationAtEndRegex = /[.,?!;:()"'[\]{}\-—/\\&*%$#@+<>=|~]+$/;
  const emojiAtEndRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u;

  if (punctuationAtEndRegex.test(str) || emojiAtEndRegex.test(str) || !str.trim()) {
    return str;
  }
  return `${str}.`;
};

export const splitLines = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export const splitSentences = (_text: string) => {
  const emojiPattern =
    '[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]';

  const abbreviations = [
    'Mr',
    'Mrs',
    'Ms',
    'Dr',
    'Prof',
    'Sr',
    'Jr',
    'St',
    'Rev',
    'Fr',
    'Sir',
    'Lady',
    'Dame',
    'Mx',
    'Eng',
    'Arch',
    'Cpl',
    'Sgt',
    'Lt',
    'Capt',
    'Maj',
    'Col',
    'Gen',
    'Adm',
    'Cmdr',
    'Hon',
    'B.A',
    'M.A',
    'Ph.D',
    'D.Sc',
    'M.D',
    'D.D.S',
    'LL.D',
    'Ed.D',
    'Esq',
    'etc',
    'e.g',
    'i.e',
    'a.k.a',
    'vs',
    'inc',
    'co',
    'corp',
    'Ltd',
    'No',
    'Vol',
    'pp'
  ];

  // Create a map for placeholders and abbreviations
  let text = _text.trim();
  const abbrevMap = new Map<string, string>();
  const placeholder = 'PLACEHOLDER';

  abbreviations.forEach((abbr, index) => {
    const key = `${placeholder}${index}`;
    abbrevMap.set(key, `${abbr}.`);
    text = text.replace(new RegExp(`\\b${abbr}\\.`, 'gm'), key);
  });

  // Split pattern to handle sentence endings properly
  const splitPattern = new RegExp(
    `(?<!\\d\\.\\s)(?<!\\d)(?<!${placeholder}\\d+)\\.(?!\\d|\\s*${emojiPattern}+\\s*$)`,
    'u'
  );

  // Split text and restore abbreviations
  const sentences: string[] = text
    .split(splitPattern)
    .map((line: string) => {
      let restoredLine: string = line.trim();
      abbrevMap.forEach((abbr: string, key: string) => {
        restoredLine = restoredLine.replace(new RegExp(key, 'g'), abbr);
      });
      return addPeriod(restoredLine);
    })
    .filter(Boolean);

  return sentences;
};

export const splitAll = (text: string) => {
  const lines = splitLines(text);
  return lines.flatMap((line) => splitSentences(line));
};

export const camelCaseToDashCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const camelCaseToTitleCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b([a-z])/g, (_, initial) => initial.toUpperCase());

export const dashCaseToTitleCase = (str: string) =>
  str.replace(/-/g, ' ').replace(/\b([a-z])/g, (_, initial) => initial.toUpperCase());

export const dashCaseToCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (_, initial) => initial.toUpperCase());

export const ucFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const isDashCase = (str: string) => /^[a-z]+(-[a-z]+)*$/.test(str);
export const isCamelCase = (str: string) => /^[a-z]+([A-Z][a-z]+)*$/.test(str);

export const ensureDashCase = (key: string) => (isCamelCase(key) ? camelCaseToDashCase(key) : key);
export const ensureCamelCase = (key: string) => (isDashCase(key) ? dashCaseToCamelCase(key) : key);

export const addPeriod = (str: string) => {
  const punctuationAtEndRegex = /[.,?!;:()"'[\]{}\-—/\\&*%$#@+<>=|~]+$/;
  const emojiAtEndRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u;

  if (punctuationAtEndRegex.test(str) || emojiAtEndRegex.test(str)) {
    return str;
  }
  return `${str}.`;
};

export const splitLines = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export const splitSentences = (text: string) => {
  const emojiPattern =
    '[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]';
  const splitPattern = new RegExp(`(?<=\\D)\\.(?!\\s*${emojiPattern}+\\s*$)(?=\\s)`, 'u');

  return text
    .split(splitPattern)
    .map((line) => addPeriod(`${line.trim()}`))
    .filter(Boolean);
};

export const splitAll = (text: string) => {
  const lines = splitLines(text);
  const sentences = lines.flatMap((line) => splitSentences(line));
  return sentences;
};

export const ensureFileExtension = (_fileName: string, ext: string): string => {
  const [fileName] = _fileName.split('.');
  return `${fileName}.${ext}`;
};

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export function hash(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  // Convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7.
  return (hash >>> 0).toString(36).padStart(7, '0');
}

import { delay } from '@/lib/utils/promise';

export function getWindow(): Window | undefined {
  return typeof window === 'undefined' ? undefined : window;
}

export function getDocument(): Document | undefined {
  return getWindow()?.document;
}

export function getLocation(): Location | undefined {
  return getWindow()?.location;
}

export function isLocalHost(): boolean {
  const isLocalHost = getLocation()?.hostname.includes('localhost');
  const isExternal = getLocation()?.pathname.includes('external');
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- We want to return a boolean
  return Boolean(isLocalHost || isExternal);
}

export async function getElements<T extends keyof HTMLElementTagNameMap>(
  selector: T,
  filter = '',
  maxRetries = 5,
  retries = 0,
  delayTime = 100
): Promise<HTMLElementTagNameMap[T][]> {
  const document = getDocument();
  if (!document) return [];

  if (retries >= maxRetries) return [];

  const fullSelector = filter ? `${selector}${filter}` : selector;
  const elements = Array.from(document.querySelectorAll<T>(fullSelector as T));
  if (elements.length) return elements;

  await delay(delayTime);
  return getElements(selector, filter, maxRetries, retries + 1);
}

export async function getElement<T extends keyof HTMLElementTagNameMap>(
  selector: T,
  filter = '',
  position = 0,
  maxRetries = 5
): Promise<HTMLElementTagNameMap[T] | null> {
  const elements = await getElements<T>(selector, filter, maxRetries);
  return elements.at(position) ?? null;
}

export async function getFirstElement<T extends keyof HTMLElementTagNameMap>(
  selector: T,
  filter = '',
  maxRetries = 5
): Promise<HTMLElementTagNameMap[T] | null> {
  return getElement(selector, filter, 0, maxRetries);
}

export async function getLastElement<T extends keyof HTMLElementTagNameMap>(
  selector: T,
  filter = '',
  maxRetries = 5
): Promise<HTMLElementTagNameMap[T] | null> {
  return getElement(selector, filter, -1, maxRetries);
}

export async function getIframeDocuments(filter = ''): Promise<Document[]> {
  const iframes = await getElements('iframe', filter);
  return iframes.map((iframe) => iframe.contentDocument).filter(Boolean);
}

export async function getIframeDocumentElements(): Promise<HTMLElement[]> {
  const iframeDocuments = await getIframeDocuments();
  return iframeDocuments.map((document) => document.documentElement);
}

export async function triggerElementAction<
  T extends keyof HTMLElementTagNameMap,
  A extends keyof HTMLElementEventMap
>(action: A, selector: T, filter = '', maxTimes = 5) {
  const element = await getFirstElement(selector, filter, maxTimes);
  element?.dispatchEvent(new Event(action, { bubbles: true }));
}

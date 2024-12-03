import { useCallback, useEffect, useState, type RefObject } from 'react';

type Args = {
  freezeOnceVisible?: boolean;
} & IntersectionObserverInit;

function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = Boolean(entry?.isIntersecting) && Boolean(freezeOnceVisible);

  // Use useCallback to memoize updateEntry
  const updateEntry = useCallback(([entryParam]: IntersectionObserverEntry[]): void => {
    setEntry(entryParam);
  }, []);

  useEffect(() => {
    const node = elementRef.current; // DOM Ref
    const hasIOSupport = !!(window.IntersectionObserver as
      | typeof window.IntersectionObserver
      | undefined);

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);
    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen, updateEntry]);

  return entry;
}

export default useIntersectionObserver;

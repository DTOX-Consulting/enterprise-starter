import { debounce } from '@/lib/hooks/use-debounce';
import { getDocument } from '@/lib/utils/dom';

import type { RefObject } from 'react';

export function closeOnDocumentClick<T extends RefObject<HTMLElement>[]>(
  refs: T,
  closeFn: () => void,
  id = ''
): void {
  const document = getDocument();
  if (!document) return;

  const checkNodes = (e: MouseEvent) => refs.some((ref) => {
      const node = ref.current;
      return !node || node.contains(e.target as Node);
    });

  const handleClick = (e: MouseEvent) => {
    if (checkNodes(e)) return;
    document.removeEventListener('click', handleClick);
    debounce(`close-on-document-click-close-${id}`, closeFn, 0);
  };

  debounce(`close-on-document-click-${id}`, () => {
    document.addEventListener('click', handleClick);
  });
}

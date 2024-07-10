import { debounce } from '@/lib/hooks/use-debounce';
import { getDocument } from '@/lib/utils/dom';

import type { RefObject } from 'react';

export function closeOnDocumentClick<T extends HTMLElement>(
  ref: RefObject<T>,
  closeFn: () => void,
  id = ''
): void {
  const document = getDocument();
  if (!document) return;

  const handleClick = (e: MouseEvent) => {
    const node = ref.current;

    if (!node || node.contains(e.target as Node)) {
      return;
    }

    document.removeEventListener('click', handleClick);
    debounce(`close-on-document-click-close-${id}`, closeFn, 0);
  };

  debounce(`close-on-document-click-${id}`, () => {
    document.addEventListener('click', handleClick);
  });
}

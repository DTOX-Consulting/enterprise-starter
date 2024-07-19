'use client';

import { triggerElementAction } from '@/lib/utils/dom';
import { danglingPromise } from '@/lib/utils/promise';

export function closeSideBar() {
  danglingPromise(triggerElementAction('click', 'button', '.absolute.right-4.top-4'));
}

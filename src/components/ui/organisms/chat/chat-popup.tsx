'use client';

import Script from 'next/script';
import { isMobile } from 'react-device-detect';

import { useDebounceEffect } from '@/lib/hooks/use-debounce';

export function ChatPopup({ expand }: { expand?: boolean }) {
  useDebounceEffect(
    'debounce-chat-popup',
    () => {
      showChatPopup(isMobile ? false : expand);
      return hideChatPopup;
    },
    [expand],
    1500
  );

  return (
    <Script
      type="module"
      strategy="lazyOnload"
      src="/iframe-widget-js?app=chat&style=popup&state=collapse&position=right&size=sm"
    />
  );
}

function getElements() {
  const iframe: HTMLIFrameElement | null = document.querySelector('.iframe__wrapper iframe');
  const script = document.querySelector('script[src*="iframe-widget-js?app=chat"]');
  const iframeWrapper = document.querySelector('.iframe__wrapper');
  return { iframe, iframeWrapper, script };
}

function showChatPopup(expand = false) {
  const { iframe, iframeWrapper } = getElements();
  if (expand) iframe?.contentWindow?.postMessage('expand', '*');
  iframeWrapper?.classList.remove('hidden');
}

function hideChatPopup(remove = false) {
  const { iframe, script, iframeWrapper } = getElements();
  iframe?.contentWindow?.postMessage('collapse', '*');
  iframeWrapper?.classList.add('hidden');

  if (!remove) return;
  iframe?.contentWindow?.postMessage('close', '*');
  iframeWrapper?.remove();
  script?.remove();
}

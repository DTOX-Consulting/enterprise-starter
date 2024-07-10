'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

export function ChatPopup({ expand }: { expand?: boolean }) {
  useEffect(() => {
    showChatPopup(isMobile ? false : expand);
    return hideChatPopup;
  }, [expand]);

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
  expand && iframe?.contentWindow?.postMessage('expand', '*');
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

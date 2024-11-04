'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export function ChatPopup() {
  useEffect(() => {
    showChatPopup();
    return hideChatPopup;
  }, []);

  return (
    <Script
      type="module"
      strategy="lazyOnload"
      src="/iframe-widget-js?app=chat&style=popup&state=expand&position=right&size=sm"
    />
  );
}

function getElements() {
  const iframe: HTMLIFrameElement | null = document.querySelector('.iframe__wrapper iframe');
  const script = document.querySelector('script[src*="iframe-widget-js?app=chat"]');
  const iframeWrapper = document.querySelector('.iframe__wrapper');
  return { iframe, iframeWrapper, script };
}

function showChatPopup() {
  const { iframe, iframeWrapper } = getElements();
  // eslint-disable-next-line sonarjs/post-message
  iframe?.contentWindow?.postMessage('expand', '*');
  iframeWrapper?.classList.remove('hidden');
}

function hideChatPopup(remove = false) {
  const { iframe, script, iframeWrapper } = getElements();
  // eslint-disable-next-line sonarjs/post-message
  iframe?.contentWindow?.postMessage('collapse', '*');
  iframeWrapper?.classList.add('hidden');

  if (!remove) return;
  // eslint-disable-next-line sonarjs/post-message
  iframe?.contentWindow?.postMessage('close', '*');
  iframeWrapper?.remove();
  script?.remove();
}

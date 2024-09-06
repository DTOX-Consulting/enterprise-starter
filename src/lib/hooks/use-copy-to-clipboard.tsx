'use client';

import { useState } from 'react';

export type UseCopyToClipboardProps = {
  timeout?: number;
}

export function useCopyToClipboard({ timeout = 2000 }: UseCopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = async (value: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return { isCopied, copyToClipboard };
}

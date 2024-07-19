import { useState, useRef, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

export function useInputFocusEnd<T extends HTMLInputElement | HTMLTextAreaElement>(
  initialValue = '',
  debounceTime = 250
) {
  const inputRef = useRef<T | null>(null);
  const [debouncedValue] = useDebounce(initialValue, debounceTime);
  const [inputValue, setInputValue] = useState<string>(initialValue);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to run every time inputValue changes
  useEffect(() => {
    if (!inputRef.current?.focus) return;

    inputRef.current.focus();
    const length = inputRef.current.value.length;
    inputRef.current.setSelectionRange(length, length);
  }, [inputValue]);

  return { inputRef, inputValue, setInputValue, debouncedValue };
}

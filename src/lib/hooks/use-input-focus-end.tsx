import { useState, useRef, useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export function useInputFocusEnd<T extends HTMLInputElement | HTMLTextAreaElement>(
  initialValue = '',
  debounceTime = 250
) {
  const inputRef = useRef<T | null>(null);
  const [debouncedValue] = useDebounceValue(initialValue, debounceTime);
  const [inputValue, setInputValue] = useState<string>(initialValue);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to run every time inputValue changes
  useEffect(() => {
    if (!inputRef.current?.focus) return;

    inputRef.current.focus();
    const {length} = inputRef.current.value;
    inputRef.current.setSelectionRange(length, length);
  }, [inputValue]);

  return { inputRef, inputValue, setInputValue, debouncedValue };
}

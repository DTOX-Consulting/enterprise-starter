'use client';

import { G } from '@mobily/ts-belt';
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  type Ref,
  type TextareaHTMLAttributes
} from 'react';

import { cn } from '@/lib/utils';

interface UseTextareaAutosizeProps {
  textAreaRef: HTMLTextAreaElement | null;
  minHeight?: number;
  maxHeight?: number;
  triggerAutoSize: string;
}

export const useTextareaAutosize = ({
  textAreaRef,
  triggerAutoSize,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0
}: UseTextareaAutosizeProps) => {
  const [init, setInit] = useState(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: TriggerAutoSize is a dependency
  useEffect(() => {
    // We need to reset the height momentarily to get the correct scrollHeight for the textarea
    const offsetBorder = 2;
    if (textAreaRef) {
      if (init) {
        textAreaRef.style.minHeight = `${minHeight + offsetBorder}px`;
        if (maxHeight > minHeight) {
          textAreaRef.style.maxHeight = `${maxHeight}px`;
        }
        setInit(false);
      }
      textAreaRef.style.height = `${minHeight + offsetBorder}px`;
      const scrollHeight = textAreaRef.scrollHeight;
      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      if (scrollHeight > maxHeight) {
        textAreaRef.style.height = `${maxHeight}px`;
      } else {
        textAreaRef.style.height = `${scrollHeight + offsetBorder}px`;
      }
    }
  }, [init, maxHeight, minHeight, textAreaRef, triggerAutoSize]);
};

export type TextareaAutosizeRef = {
  textArea: HTMLTextAreaElement;
  maxHeight: number;
  minHeight: number;
};

type TextareaAutosizeProps = {
  maxHeight?: number;
  minHeight?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextareaAutosize = forwardRef<TextareaAutosizeRef, TextareaAutosizeProps>(
  (
    {
      maxHeight = Number.MAX_SAFE_INTEGER,
      minHeight = 52,
      className,
      onChange,
      value,
      ...props
    }: TextareaAutosizeProps,
    ref: Ref<TextareaAutosizeRef>
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [triggerAutoSize, setTriggerAutoSize] = useState('');

    useTextareaAutosize({
      textAreaRef: textAreaRef.current,
      triggerAutoSize: triggerAutoSize,
      maxHeight,
      minHeight
    });

    useImperativeHandle(ref, () => ({
      textArea: textAreaRef.current ?? ({} as HTMLTextAreaElement),
      maxHeight,
      minHeight
    }));

    useEffect(() => {
      if (G.isNotNullable(value)) {
        setTriggerAutoSize(value as string);
      }
    }, [value]);

    return (
      <textarea
        {...props}
        value={value}
        ref={textAreaRef}
        className={cn(
          'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onChange={(e) => {
          setTriggerAutoSize(e.target.value);
          onChange?.(e);
        }}
      />
    );
  }
);
TextareaAutosize.displayName = 'TextareaAutosize';

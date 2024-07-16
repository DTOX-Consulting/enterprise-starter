import { useCompletion as useCompletionAI } from 'ai/react';
import { useDebounce } from 'use-debounce';

type UseCompletionArgs = Parameters<typeof useCompletionAI>[0] & {
  delay?: number;
  maxWait?: number;
};

export const useCompletion = ({ delay = 250, maxWait = 250, ...args }: UseCompletionArgs) => {
  const { completion, ...rest } = useCompletionAI(args);

  const [debouncedCompletion] = useDebounce(completion, delay, { maxWait });

  return {
    ...rest,
    completion: debouncedCompletion
  };
};

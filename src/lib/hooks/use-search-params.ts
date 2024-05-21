import { useSearchParams as nextUseSearchParams } from 'next/navigation';

export function useSearchParams() {
  const searchParams = nextUseSearchParams();

  return {
    ...searchParams,
    isTrue: (key: string) => searchParams.has(key) && searchParams.get(key) === 'true',
    isNotFalse: (key: string) => !searchParams.has(key) || searchParams.get(key) !== 'false'
  };
}

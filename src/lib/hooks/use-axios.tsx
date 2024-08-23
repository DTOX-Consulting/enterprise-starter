import axios from 'axios';
import { useLayoutEffect } from 'react';

import { useForceState } from '@/lib/hooks/use-force-rerender';
import { createUrl } from '@/lib/utils/promise';

import type { AxiosRequestConfig, AxiosError } from 'axios';

type Request<T, D> = Omit<AxiosRequestConfig<D>, 'params'> & {
  params?: Record<string, string | string[] | undefined>;
  debounceTime?: number;
  defaultData?: T;
  url: string;
};

type Response<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
};

const requestMap = new Map<string, NodeJS.Timeout | Timer>();

export function useAxios<T, D = unknown>({
  url,
  data,
  method,
  params,
  headers,
  defaultData,
  debounceTime = 0
}: Request<T, D>): Response<T> {
  const [state, setState] = useForceState<Response<T>>({
    error: null,
    loading: true,
    data: defaultData ?? null
  });

  useLayoutEffect(() => {
    let debounceTimer: NodeJS.Timeout | Timer;
    const existingTimer: NodeJS.Timeout | Timer | undefined = requestMap.get(url);
    const realUrl = url.startsWith('/') ? `${globalThis.location.origin}${url}` : url;

    const fetchData = async () => {
      const url = createUrl(realUrl, params);

      try {
        const response = await axios({
          url,
          data,
          method,
          headers
        });

        setState(
          {
            error: null,
            loading: false,
            data: response.data as T
          },
          true
        );
      } catch (error) {
        setState(
          {
            data: null,
            loading: false,
            error: error as AxiosError
          },
          true
        );
      } finally {
        clearTimeout(debounceTimer);
      }
    };

    const debouncedFetchData = () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      debounceTimer = setTimeout(fetchData, debounceTime);
      requestMap.set(url, debounceTimer);
    };

    if (existingTimer) {
      debounceTimer = existingTimer;
    } else {
      debouncedFetchData();
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [url, data, method, params, headers, debounceTime, setState]);

  return state;
}

import type {
  FetchNextPageOptions,
  FetchPreviousPageOptions,
  InfiniteQueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters
} from '@tanstack/query-core';

const defaultInfiniteQueryResult = async <T>() =>
  Promise.resolve({
    data: {
      pages: [],
      pageParams: []
    },
    error: null,
    isError: false,
    isSuccess: true,
    isLoading: false,
    status: 'success',
    hasNextPage: false,
    hasPreviousPage: false,
    isFetchingNextPage: false,
    isFetchingPreviousPage: false,
    fetchNextPage: async () => noopFetchNext<T>(),
    fetchPreviousPage: async () => noopFetchPrevious<T>()
  }) as unknown as Promise<InfiniteQueryObserverResult<T, Error>>;

export const noopSync = <T>(arg?: T) => arg as T;

export const noop = async <T>(arg?: T) => Promise.resolve(noopSync<T>(arg));

export const noopFetchNext = async <T>(_options?: FetchNextPageOptions) =>
  defaultInfiniteQueryResult<T>();

export const noopFetchPrevious = async <T>(_options?: FetchPreviousPageOptions) =>
  defaultInfiniteQueryResult<T>();

export const noopRefetch = async <T>(_options?: RefetchOptions & RefetchQueryFilters) =>
  defaultInfiniteQueryResult<T>();

export type GenericFunction<T = unknown, U extends unknown[] = unknown[]> = (
  ...args: U
) => T | Promise<T>;

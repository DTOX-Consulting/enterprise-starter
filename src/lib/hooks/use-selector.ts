import { G } from '@mobily/ts-belt';
import { useObservable, useSubscription } from 'observable-hooks';
import { useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import {
  type BehaviorSubject,
  debounce,
  distinctUntilChanged,
  filter,
  map,
  type Observable,
  of,
  switchMap,
  timer
} from 'rxjs';

const EmptyDeps: unknown[] = [];

export function useSelector<
  T,
  R extends T,
  TInputs extends unknown[],
  RTInputs extends readonly [...TInputs]
>(input$: (inputs: RTInputs, deps?: readonly [...TInputs]) => BehaviorSubject<T>): R;
export function useSelector<
  T,
  R,
  TInputs extends unknown[],
  RTInputs extends readonly [...TInputs]
>(
  input$: (inputs: RTInputs) => BehaviorSubject<T>,
  options?: {
    selector?: (value: T, deps: readonly [...TInputs], enabled?: boolean) => R;
    deps?: readonly [...TInputs];
    enabled?: boolean;
    debounce?: number;
  }
): R;
export function useSelector<
  T,
  R,
  Z extends NonNullable<R>,
  TInputs extends unknown[],
  RTInputs extends readonly [...TInputs]
>(
  input$: (inputs: RTInputs) => BehaviorSubject<T>,
  options: {
    selector?: (value: T, deps: readonly [...TInputs], enabled?: boolean) => R;
    deps?: readonly [...TInputs];
    defaultValue: Z;
    enabled?: boolean;
    debounce?: number;
  }
): NonNullable<R>;
export function useSelector<
  T,
  R,
  TInputs extends unknown[],
  RTInputs extends readonly [...TInputs]
>(
  input$: (inputs?: RTInputs) => BehaviorSubject<T>,
  options: {
    selector?: (value: T, deps: readonly [...TInputs], enabled?: boolean) => R;
    deps?: readonly [...TInputs];
    defaultValue?: NonNullable<R>;
    enabled?: boolean;
    debounce?: number;
  } = {}
) {
  const emitAsyncValue = useRef(false);
  options.selector ??= (value) => value as unknown as R;
  options.enabled ??= true;
  const [state, setState] = useState<R>(() => {
    const state$ = options.deps ? input$(options.deps as [...RTInputs]) : input$();
    const val = state$.getValue();

    return (
      options.selector?.(val, options.deps as [...RTInputs], options.enabled) ??
      (options.defaultValue as R)
    );
  });

  const $obs = useObservable<R, [boolean, ...RTInputs], Observable<R>>(
    (inputs) =>
      inputs.pipe(
        filter(([enabled]) => enabled),
        debounce(() => (G.isNotNullable(options.debounce) ? timer(options.debounce) : of({}))),
        switchMap(([enabled, ...values]) =>
          input$(values).pipe(
            map((val) => options.selector?.(val, values, enabled) ?? (options.defaultValue as R))
          )
        ),
        distinctUntilChanged(isEqual)
      ),
    [options.enabled, ...(options.deps ?? EmptyDeps)] as unknown as [boolean, ...RTInputs]
  );

  useSubscription($obs, (val) => {
    // value is inside state gathered synchronously so we need to check if next state from async emit is different
    if (emitAsyncValue.current) {
      setState(val);
    } else {
      // checking if is equal to prevent unnecessary rerenders
      // if its not then we're updating state and flag
      emitAsyncValue.current = isEqual(val, state);
      if (!emitAsyncValue.current) {
        setTimeout(() => setState(val));
      }
    }
  });
  return state;
}

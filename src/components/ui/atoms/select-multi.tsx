'use client';

import { Command as CommandPrimitive, useCommandState } from 'cmdk';
import { X } from 'lucide-react';
import {
  useEffect,
  forwardRef,
  useState,
  useImperativeHandle,
  useCallback,
  useRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
  type ComponentProps,
  type Ref,
  useMemo,
  type KeyboardEvent
} from 'react';
import { stringify } from 'safe-stable-stringify';

import { Badge } from '@/components/ui/atoms/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/atoms/command';
import { cn } from '@/lib/utils';
import { danglingPromise } from '@/lib/utils/promise';

export type Option = {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
};

type GroupOption = Record<string, Option[]>;

type SelectMultiProps = {
  value?: Option[];
  defaultOptions?: Option[];
  /** manually controlled options */
  options?: Option[];
  placeholder?: string;
  /** Loading component. */
  loadingIndicator?: ReactNode;
  /** Empty component. */
  emptyIndicator?: ReactNode;
  /** Debounce time for async search. Only work with `onSearch`. */
  delay?: number;
  /**
   * Only work with `onSearch` prop. Trigger search when `onFocus`.
   * For example, when user click on the input, it will trigger the search to get initial options.
   **/
  triggerSearchOnFocus?: boolean;
  /** async search */
  onSearch?: (value: string) => Promise<Option[]>;
  onChange?: (options: Option[]) => void;
  /** Limit the maximum number of selected options. */
  maxSelected?: number;
  /** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
  onMaxSelected?: (maxLimit: number) => void;
  /** Hide the placeholder when there are options selected. */
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  /** Group the options base on provided key. */
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  /**
   * First item selected is a default behavior by cmdk. That is why the default is true.
   * This is a workaround solution by add a dummy item.
   *
   * @reference: https://github.com/pacocoursey/cmdk/issues/171
   */
  selectFirstItem?: boolean;
  /** Allow user to create option when there is no option matched. */
  creatable?: boolean;
  /** Props of `Command` */
  commandProps?: ComponentPropsWithoutRef<typeof Command>;
  /** Props of `CommandInput` */
  inputProps?: Omit<
    ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    'value' | 'placeholder' | 'disabled'
  >;
};

export type SelectMultiRef = {
  selectedValue: Option[];
  input: HTMLInputElement;
};

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: Option[], groupBy?: string) {
  if (options.length === 0) {
    return {};
  }
  if (groupBy == null) {
    return {
      '': options
    };
  }

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] ?? '') as string;
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption: GroupOption, picked: Option[]) {
  const cloneOption = JSON.parse(stringify(groupOption)) as GroupOption;

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter((val) => !picked.find((pick) => pick.value === val.value));
  }
  return cloneOption;
}

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
const CommandEmpty = forwardRef<HTMLDivElement, ComponentProps<typeof CommandPrimitive.Empty>>(
  ({ className, ...props }, forwardedRef) => {
    const render = useCommandState((state) => state.filtered.count === 0);

    if (!render) return null;

    return (
      <div
        ref={forwardedRef}
        className={cn('py-6 text-center text-sm', className)}
        data-cmdk-empty=""
        role="presentation"
        {...props}
      />
    );
  }
);

CommandEmpty.displayName = 'CommandEmpty';

const SelectMulti = forwardRef<SelectMultiRef, SelectMultiProps>(
  (
    {
      value,
      onChange,
      placeholder,
      defaultOptions: arrayDefaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      loadingIndicator,
      emptyIndicator,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps
    }: SelectMultiProps,
    ref: Ref<SelectMultiRef>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selected, setSelected] = useState<Option[]>(value ?? []);
    const [options, setOptions] = useState<GroupOption>(
      transToGroupOption(arrayDefaultOptions, groupBy)
    );
    const [inputValue, setInputValue] = useState('');
    const debouncedSearchTerm = useDebounce(inputValue, delay ?? 500);

    useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current as unknown as HTMLInputElement
      }),
      [selected]
    );

    const handleUnselect = useCallback(
      (option: Option) => {
        const newOptions = selected.filter((select) => select.value !== option.value);
        setSelected(newOptions);
        onChange?.(newOptions);
      },
      [onChange, selected]
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (event.key === 'Delete' || event.key === 'Backspace') {
            if (input.value === '' && selected.length > 0) {
              const option = selected[selected.length - 1] as unknown as Option;
              handleUnselect(option);
            }
          }
          // This is not a default behaviour of the <input /> field
          if (event.key === 'Escape') {
            input.blur();
          }
        }
      },
      [handleUnselect, selected]
    );

    useEffect(() => {
      if (value) {
        setSelected(value);
      }
    }, [value]);

    useEffect(() => {
      /** If `onSearch` is provided, do not trigger options updated. */
      if (!arrayOptions || onSearch) {
        return;
      }
      const newOption = transToGroupOption(arrayOptions, groupBy);
      if (stringify(newOption) !== stringify(options)) {
        setOptions(newOption);
      }
    }, [arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res ?? [], groupBy));
        setIsLoading(false);
      };

      const exec = async () => {
        if (!onSearch || !open) return;

        if (triggerSearchOnFocus) {
          await doSearch();
        }

        if (debouncedSearchTerm) {
          await doSearch();
        }
      };

      danglingPromise(exec());
    }, [debouncedSearchTerm, groupBy, onSearch, open, triggerSearchOnFocus]);

    const creatableItem = () => {
      if (!creatable) return undefined;

      const Item = (
        <CommandItem
          value={inputValue}
          className="cursor-pointer"
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onSelect={(selectedValue: string) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length);
              return;
            }
            setInputValue('');
            const newOptions = [...selected, { value: selectedValue, label: selectedValue }];
            setSelected(newOptions);
            onChange?.(newOptions);
          }}
        >{`Create "${inputValue}"`}</CommandItem>
      );

      // For normal creatable
      if (!onSearch && inputValue.length > 0) {
        return Item;
      }

      // For async search creatable. avoid showing creatable item before loading at first.
      if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
        return Item;
      }

      return undefined;
    };

    const emptyItem = useCallback(() => {
      if (emptyIndicator === undefined || emptyIndicator === null) return undefined;

      // For async search that showing emptyIndicator
      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          <CommandItem value="-" disabled>
            {emptyIndicator}
          </CommandItem>
        );
      }

      return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
    }, [creatable, emptyIndicator, onSearch, options]);

    const selectables = useMemo<GroupOption>(
      () => removePickedOption(options, selected),
      [options, selected]
    );

    /** Avoid Creatable Selector freezing or lagging when paste a long string. */
    const commandFilter = useCallback(() => {
      if (commandProps?.filter) {
        return commandProps.filter;
      }

      if (creatable) {
        return (itemValue: string, search: string) =>
          itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
      }
      // Using default filter in `cmdk`. We don't have to provide it.
      return undefined;
    }, [creatable, commandProps?.filter]);

    return (
      <Command
        {...commandProps}
        onKeyDown={(event) => {
          handleKeyDown(event);
          commandProps?.onKeyDown?.(event);
        }}
        className={cn('overflow-visible bg-transparent', commandProps?.className)}
        shouldFilter={
          commandProps?.shouldFilter !== undefined ? commandProps.shouldFilter : !onSearch
        } // When onSearch is provided, we don't want to filter the options. You can still override it.
        filter={commandFilter()}
      >
        <div
          className={cn(
            'group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-offset-2',
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected.map((option) => (
              <Badge
                key={option.value}
                className={cn(
                  'data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground',
                  'data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground',
                  badgeClassName
                )}
                data-fixed={option.fixed}
                data-disabled={disabled}
              >
                {option.label}
                <button
                  type="button"
                  className={cn(
                    'ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    (Boolean(disabled) || (Boolean(disabled) == null && Boolean(option.fixed))) &&
                      'hidden'
                  )}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="size-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              {...inputProps}
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              onValueChange={(itemValue) => {
                setInputValue(itemValue);
                inputProps?.onValueChange?.(itemValue);
              }}
              onBlur={(event) => {
                setOpen(false);
                inputProps?.onBlur?.(event);
              }}
              onFocus={(event) => {
                setOpen(true);
                if (triggerSearchOnFocus && onSearch) {
                  void onSearch(debouncedSearchTerm);
                }
                inputProps?.onFocus?.(event);
              }}
              placeholder={
                Boolean(hidePlaceholderWhenSelected) && Boolean(selected.length) ? '' : placeholder
              }
              className={cn(
                'flex-1 border-0 bg-transparent placeholder:text-muted-foreground focus:border-0 focus:outline-none focus:ring-0',
                inputProps?.className
              )}
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && (
            <CommandList className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              {isLoading ? (
                loadingIndicator
              ) : (
                <>
                  {emptyItem()}
                  {creatableItem()}
                  {!selectFirstItem && <CommandItem value="-" className="hidden" />}
                  {Object.entries(selectables).map(([key, dropdowns]) => (
                    <CommandGroup key={key} heading={key} className="h-full overflow-auto">
                      {dropdowns.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disable}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => {
                            if (selected.length >= maxSelected) {
                              onMaxSelected?.(selected.length);
                              return;
                            }
                            setInputValue('');
                            const newOptions = [...selected, option];
                            setSelected(newOptions);
                            onChange?.(newOptions);
                          }}
                          className={cn(
                            'cursor-pointer',
                            option.disable === true && 'cursor-default text-muted-foreground'
                          )}
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </>
              )}
            </CommandList>
          )}
        </div>
      </Command>
    );
  }
);

SelectMulti.displayName = 'SelectMulti';
export default SelectMulti;

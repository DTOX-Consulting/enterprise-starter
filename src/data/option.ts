import type { DeepReadonlyArray, DeepReadonlyObject } from '@/lib/utils/object';

export type Option = {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

export type ReadOnlyOption = DeepReadonlyObject<Option>;
export type ReadOnlyOptions = ReadOnlyOption[];

export type ReadOnlyOptionsArray = DeepReadonlyArray<Option>;

export type DoubleOption = {
  label: string;
  value: Option[];
};

export type Options = Option[] | ReadOnlyOptions | ReadOnlyOptionsArray;

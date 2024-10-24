import { Select } from '@/components/ui/organisms/select/plain';

export type SelectConfigItem<Params, T extends keyof Params = keyof Params> = {
  param: T;
  value: Params[T];
  options: Params[T][];
  condition?: boolean;
  placeholder: string;
  onItemChange?: <U extends keyof Params>(param: U, value: Params[U]) => void;
};

export type SelectGeneratorProps<Params> = {
  config: SelectConfigItem<Params, keyof Params>[];
  onChange: <K extends keyof Params>(param: K, value: Params[K]) => void;
};

export const SelectGenerator = <Params extends Record<keyof Params, unknown>>({
  config,
  onChange
}: SelectGeneratorProps<Params>) => (
  <>
    {config
      .filter(({ condition }) => condition !== false)
      .map(({ value, options, placeholder, param, onItemChange }, index) => (
        <Select
          value={`${value as string}`}
          key={`${index}-${String(param)}`}
          placeholder={placeholder ? placeholder : 'Select...'}
          options={options.map((indexOf) => `${indexOf as string}`)}
          onChange={(err) =>
            (onItemChange ?? onChange)(param, err.target.value as Params[keyof Params])
          }
        />
      ))}
  </>
);

import { Select } from '@/components/ui/organisms/select/plain';

export type SelectConfigItem<Params, K extends keyof Params = keyof Params> = {
  param: K;
  value: Params[K];
  options: Params[K][];
  condition?: boolean;
  placeholder: string;
  onItemChange?: <K extends keyof Params>(param: K, value: Params[K]) => void;
};

export type SelectGeneratorProps<Params> = {
  config: SelectConfigItem<Params, keyof Params>[];
  onChange: <K extends keyof Params>(param: K, value: Params[K]) => void;
};

export const SelectGenerator = <Params extends Record<keyof Params, unknown>>({
  config,
  onChange
}: SelectGeneratorProps<Params>) => {
  return (
    <>
      {config
        .filter(({ condition }) => condition !== false)
        .map(({ value, options, placeholder, param, onItemChange }, index) => (
          <Select
            value={`${value as string}`}
            key={`${index}-${String(param)}`}
            placeholder={placeholder ?? 'Select...'}
            options={options.map((i) => `${i as string}`)}
            onChange={(e) =>
              (onItemChange ?? onChange)(param, e.target.value as Params[keyof Params])
            }
          />
        ))}
    </>
  );
};

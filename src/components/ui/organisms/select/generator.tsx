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

export const SelectGenerator = <Params extends Record<keyof Params, any>>({
  config,
  onChange
}: SelectGeneratorProps<Params>) => {
  return (
    <>
      {config
        .filter(({ condition }) => condition !== false)
        .map(({ value, options, placeholder, param, onItemChange }, index) => (
          <Select
            value={`${value}`}
            key={`${index}-${String(param)}`}
            options={options.map((i) => `${i}`)}
            placeholder={placeholder ?? 'Select...'}
            onChange={(e) =>
              (onItemChange || onChange)(param, e.target.value as Params[keyof Params])
            }
          />
        ))}
    </>
  );
};

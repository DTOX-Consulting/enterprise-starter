import { camelCaseToTitleCase } from '@/lib/utils/string';

type Props = {
  value?: string;
  options: string[];
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = (props: Props) => (
  <select
    value={props.value}
    onChange={props.onChange}
    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <option value="">{props.placeholder}</option>
    {props.options.map((key) => (
      <option key={key} value={key}>
        {camelCaseToTitleCase(key)}
      </option>
    ))}
  </select>
);

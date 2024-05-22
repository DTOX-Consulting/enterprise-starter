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
    className="h-10 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-lg shadow-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 sm:w-48 sm:text-sm"
  >
    <option value="">{props.placeholder}</option>
    {props.options.map((key) => (
      <option key={key} value={key}>
        {camelCaseToTitleCase(key)}
      </option>
    ))}
  </select>
);

'use client';

import { forwardRef, type InputHTMLAttributes, memo } from 'react';
import ReactCurrencyInput from 'react-currency-input-field';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const CustomInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      placeholder="£ Enter amount"
      className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:border-[#042c5c] focus:outline-none"
    />
  )
);

CustomInput.displayName = 'CustomInput';

type CurrencyInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  validation?: object;
};

export const CurrencyInput = <T extends FieldValues>({
  name,
  control,
  validation
}: CurrencyInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={validation}
    render={({ field }) => (
      <ReactCurrencyInput
        id={`currency-input-${String(name)}`}
        name={String(name)}
        value={typeof field.value === 'string' ? field.value : ''}
        onValueChange={(value) => {
          field.onChange(value);
        }}
        prefix="£"
        groupSeparator=","
        decimalSeparator="."
        decimalsLimit={2}
        customInput={CustomInput}
      />
    )}
  />
);

CurrencyInput.displayName = 'CurrencyInput';

export const CurrencyInputWithSpinner = memo(
  ({
    value,
    onChange,
    ...props
  }: Readonly<{
    value: string | undefined;
    onChange: (value: string) => void;
    [key: string]: unknown;
  }>) => {
    const handleIncrement = () => {
      const currentValue = Number(value ?? 0);
      onChange((currentValue + 1000).toString());
    };

    const handleDecrement = () => {
      const currentValue = Number(value ?? 0);
      const newValue = Math.max(0, currentValue - 1000);
      onChange(newValue.toString());
    };

    return (
      <div className="relative flex">
        <ReactCurrencyInput {...props} value={value} onValueChange={(val) => onChange(val ?? '')} />
        <div className="absolute inset-y-0 right-0 flex flex-col justify-center">
          <button
            type="button"
            onClick={handleIncrement}
            className="flex h-3 w-4 items-center justify-center text-white/60 hover:text-white"
          >
            <FaChevronUp size={10} />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            className="flex h-3 w-4 items-center justify-center text-white/60 hover:text-white"
          >
            <FaChevronDown size={10} />
          </button>
        </div>
      </div>
    );
  }
);

CurrencyInputWithSpinner.displayName = 'CurrencyInputWithSpinner';

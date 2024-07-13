import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Control, Controller, FieldValues } from 'react-hook-form';

export type InputPropsType = InputHTMLAttributes<HTMLInputElement>;

interface IControlledInput {
  control: Control<FieldValues>;
  name: string;
  inputProps?: InputPropsType;
  className?: string;
  rules?: any;
}

const Input = ({
  control,
  name,
  inputProps: passedProps,
  className,
  rules = { required: false },
}: IControlledInput) => {
  const inputProps: InputPropsType = {
    type: 'text',
    autoComplete: 'off',
    ...passedProps,
  };

  if (rules.required) {
    rules.required = 'Required';
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <input
          {...field}
          {...inputProps}
          className={clsx(
            'bg-transparent text-xl outline-none w-full text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            className,
          )}
        />
      )}
    />
  );
};

export default Input;

import clsx from 'clsx';
import {forwardRef} from 'react';
import {UseFormRegister} from 'react-hook-form';

type Props = {
  autoComplete?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  label: string;
  placeholder?: string;
  type?: 'password' | 'tel' | 'text';
} & ReturnType<UseFormRegister<any>>;

const FormFieldText = forwardRef<HTMLInputElement, Props>(
  (
    {
      autoComplete,
      description,
      disabled,
      error,
      label,
      name,
      onBlur,
      onChange,
      placeholder,
      type = 'text',
    },
    ref,
  ) => {
    return (
      <div className="w-full space-y-1 first:mt-0 mt-7">
        {/* Label */}
        {label && (
          <label className="text-md text-black font-nhaasReg" htmlFor={name}>
            {label}
          </label>
        )}
        {/* Description */}
        {description && (
          <div className="text-sm text-darkGray/75">{description}</div>
        )}
        <input
          aria-label={label}
          autoComplete={autoComplete}
          className={clsx([
            'w-full border h-[38px] px-3 text-sm font-nhaasReg leading-field',
            'disabled:bg-gray/50 disabled:opacity-50',
            'focus-outline',
            error ? 'border-red' : '',
          ])}
          disabled={disabled}
          id={name}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          type={type}
        />
        {/* Field error */}
        {error && <div className="text-sm text-red">{error}</div>}
      </div>
    );
  },
);

export default FormFieldText;

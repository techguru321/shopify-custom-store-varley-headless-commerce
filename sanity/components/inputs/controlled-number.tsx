import React from 'react';
import { TextInput } from '@sanity/ui';
import { FormField } from '@sanity/base/components';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';
import { useId } from '@reach/auto-id';

export const ControlledNumber = React.forwardRef((props, ref) => {
  const {
    type,
    value,
    readOnly,
    markers,
    presence,
    compareValue,
    onFocus,
    onBlur,
    onChange,
  } = props;
  const { title, description, placeholder, options } = type;
  const { min, max, step } = options ?? { min: -Number.MAX_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER, step: 1 };

  const handleChange = React.useCallback((event) => {
    let inputValue = Number.parseFloat(event.currentTarget.value);
    if (Math.abs(inputValue) > Number.MAX_SAFE_INTEGER) inputValue = Math.sign(inputValue) * Number.MAX_SAFE_INTEGER;
    onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
  }, [onChange]);

  const inputId = useId();

  return (
    <FormField
      inputId={inputId}
      compareValue={compareValue}
      description={description}
      title={title}
      __unstable_markers={markers}
      __unstable_presence={presence}
    >
      <TextInput
        id={inputId}
        onChange={handleChange}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        type="number"
        min={min || -Number.MAX_SAFE_INTEGER}
        max={max || Number.MAX_SAFE_INTEGER}
        step={step || 1}
      />
    </FormField>
  );
});
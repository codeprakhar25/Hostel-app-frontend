// components/FormField.tsx
import { TextInput, Switch, Select, NumberInput } from '@mantine/core';
import { useState } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  options?: { label: string; value: string }[];
}

const FormField = ({
  label,
  name,
  type,
  placeholder,
  required = false,
  error = '',
  options = [],
}: FormFieldProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const inputProps = {
    value,
    onChange: handleChange,
    placeholder,
    required,
    error: error || undefined,
  };

  if (type === 'select') {
    return (
      <Select
        label={label}
        data={options}
        {...inputProps}
      />
    );
  }

  if (type === 'switch') {
    return (
      <Switch
        label={label}
        checked={value === 'on'}
        onChange={(event) => setValue(event.currentTarget.checked ? 'on' : 'off')}
      />
    );
  }

  if (type === 'number') {
    return (
      <NumberInput
        label={label}
        {...inputProps}
      />
    );
  }

  return (
    <TextInput
      label={label}
      name={name}
      {...inputProps}
    />
  );
};

export default FormField;

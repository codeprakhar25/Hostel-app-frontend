// components/FormField.tsx
import { TextInput, Switch, Select, NumberInput } from '@mantine/core';
import { ReactNode, useState } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  error?: string | ReactNode;
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
        style={{marginTop:15}}
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
        style={{marginTop:15}}

        onChange={(event) => setValue(event.currentTarget.checked ? 'on' : 'off')}
      />
    );
  }

  if (type === 'number') {
    return (
      <NumberInput
        label={label}
        {...inputProps}
        style={{marginTop:15}}

      />
    );
  }

  return (
    <TextInput
      label={label}
      name={name}
      style={{marginTop:15}}

      {...inputProps}
    />
  );
};

export default FormField;

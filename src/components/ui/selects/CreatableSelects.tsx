import React from 'react';

import { SingleValue } from 'react-select';
import ReactCreatableSelect from 'react-select/creatable';

type RestProps = Omit<React.ComponentProps<typeof ReactCreatableSelect>, 'options' | 'value' | 'onChange'>;

type Props = {
  options: { label: string; value: string }[];
  onChange: (value?: SingleValue<{ label: string; value: string }>) => void;
  value: { label: string; value: string } | undefined;
  placeholder?: string;
} & RestProps;

const CreatableSelect = ({ options, onChange, value, placeholder, ...rest }: Props): React.ReactElement => {
  return (
    <ReactCreatableSelect
      options={options}
      value={value}
      onChange={(option) => onChange(option as Props['value'])}
      placeholder={placeholder}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'black',
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: 'white',
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'black',
          color: 'white',
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'black',
          border: '1px solid #4B5563',
        }),
        option: (baseStyles, state) => {
          return {
            ...baseStyles,
            backgroundColor: state.isFocused ? '#99a1af' : 'black',
          }
        },
      }}
      {...rest}
    />
  );
};

export default CreatableSelect;

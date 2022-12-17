import { useEffect, useState } from 'react';
import Select from 'react-select';

import { CustomSelectProps, Option } from './types';

export const MyReactSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  styles,
  isMulti = false,
  values,
  label,
}: CustomSelectProps) => {
  const onChange = (option: any) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const defaultValue = () => {
    if (isMulti) {
      const tempValues: Option[] = [];
      for (const option of options) {
        for (const value of values) {
          if (option.value[`${label}`] === value[`${label}`]) {
            tempValues.push({
              label: value[`${label}`],
              value: value,
            } as Option);
          }
        }
      }
      return tempValues;
    } else {
      return options
        ? options.find((option: Option) => option.value === values)
        : "";
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={defaultValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      required={true}
      styles={styles}
    />
  );
};

export default MyReactSelect;

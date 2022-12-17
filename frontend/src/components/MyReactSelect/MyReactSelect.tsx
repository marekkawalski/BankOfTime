import { useEffect, useLayoutEffect, useState } from 'react';
import Select from 'react-select';

import { CustomSelectProps, Option } from './types';

export const MyReactSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  styles,
  defaultCategoriesOptions,
}: CustomSelectProps) => {
  const onChange = (option: any) => {
    form.setFieldValue(
      field.name,
      (option as Option[]).map((item: Option) => item.value)
    );
  };

  return (
    <Select
      className={className}
      name={field.name}
      defaultValue={defaultCategoriesOptions}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={true}
      styles={styles}
    />
  );
};

export default MyReactSelect;

import { FieldProps } from 'formik';

export interface CustomSelectProps extends FieldProps {
  options: any;
  className?: string;
  placeholder?: string;
  styles?: any;
  values?: any;
  defaultCategoriesOptions: any;
}
export interface Option {
  label: string;
  value: string;
}

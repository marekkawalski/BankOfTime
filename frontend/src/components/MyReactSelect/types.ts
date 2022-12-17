import { FieldProps } from 'formik';

export interface CustomSelectProps extends FieldProps {
  options: any;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  styles?: any;
  values?: any;
  label: string;
}
export interface Option {
  label: string;
  value: string;
}

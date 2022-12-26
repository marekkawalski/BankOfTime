import * as Yup from 'yup';

export const categoryValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, "Category name must be at least 3 characters")
    .max(25, "Category name not exceed 25 characters")
    .required("Category name is required"),
});

import { PWD_REGEX } from '@/constants/constants';
import { Role } from '@/enums/Role';
import * as Yup from 'yup';

export const updateUserValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must not exceed 25 characters")
    .matches(/^([^\d]*)$/, "Name should not contain numbers")
    .required("Name is required"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^([^\d]*)$/, "Last name should not contain numbers")
    .min(3, "Last name  must be at least 3 characters")
    .max(25, "Last name  must not exceed 25 characters"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .matches(
      PWD_REGEX,
      "8 to 40 characters. Must include uppercase and lowercase letters, a number and a special character."
    )
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Confirm Password does not match"
  ),
  userRole: Yup.string().oneOf([Role.ROLE_ADMIN, Role.ROLE_NORMAL]),
  country: Yup.string()
    .min(3, "Country must be at least 3 characters")
    .max(25, "Country must not exceed 25 characters"),
  city: Yup.string()
    .min(3, "City must be at least 3 characters")
    .max(25, "City must not exceed 25 characters"),
  aboutMe: Yup.string()
    .min(3, "About me must be at least 3 characters")
    .max(250, "About me must not exceed 250 characters"),
  phone: Yup.string()
    .min(9, "Phone me must be at least 9 characters")
    .max(13, "Phone me must not exceed 13 characters"),
  occupation: Yup.string()
    .min(3, "City must be at least 3 characters")
    .max(25, "City must not exceed 25 characters"),
});

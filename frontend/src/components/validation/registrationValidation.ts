import * as Yup from "yup";
import { PWD_REGEX } from "../../config/config";

export const registrationValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must not exceed 20 characters")
    .matches(/^([^\d]*)$/, "Name should not contain numbers")
    .required("Name is required"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^([^\d]*)$/, "Last name should not contain numbers")
    .min(3, "Last name  must be at least 6 characters")
    .max(20, "Last name  must not exceed 20 characters"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      PWD_REGEX,
      "8 to 40 characters. Must include uppercase and lowercase letters, a number and a special character."
    )
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

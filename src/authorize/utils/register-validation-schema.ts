import * as yup from "yup";

const registerValidationSchema = yup.object({
  name: yup
    .string()
    .min(4, "Name must be more than 5 characters")
    .max(25, "Name must be less than 25 characters")
    .required("Please enter your name"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(4, "Password must be more than 4 characters")
    .max(25, "Password must be more than 25 characters")
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "The password and confirm password do not match")
    .required("Please confirm your password"),

});

export default registerValidationSchema;
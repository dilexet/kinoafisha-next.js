import * as yup from "yup";

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(4, "Password must be more than 4 characters")
    .max(25, "Password must be more than 25 characters")
    .required("Please enter your password"),
});

export default loginValidationSchema;

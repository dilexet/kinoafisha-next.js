import * as yup from "yup";

const profileValidationSchema = yup.object({
  name: yup
    .string()
    .min(4, "Name must be more than 5 characters")
    .max(25, "Name must be less than 25 characters"),
  email: yup.string().email("Enter a valid email"),
  newPassword: yup
    .string()
    .min(4, "Password must be more than 4 characters")
    .max(25, "Password must be more than 25 characters"),
  oldPassword: yup
    .string()
    .when("newPassword", (newPassword, schema) =>
      newPassword ? schema.required("Please enter old password") : schema,
    ),
});

export default profileValidationSchema;

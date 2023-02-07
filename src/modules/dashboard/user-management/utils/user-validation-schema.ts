import * as yup from "yup";

export const userCreateValidationSchema = yup.object({
  name: yup.string().required("Please enter user name"),
  email: yup.string().required("Please enter user email"),
  roleId: yup.string().required("Please select user roles"),
  password: yup.string().required("Please enter user password"),
});

export const userUpdateValidationSchema = yup.object({
  name: yup.string().required("Please enter user name"),
  email: yup.string().required("Please enter user email"),
  roleId: yup.string().required("Please select user roles"),
});

export type userCreateValidationSchemaType = typeof userCreateValidationSchema;
export type userUpdateValidationSchemaType = typeof userUpdateValidationSchema;

import * as yup from "yup";

export const sessionTimesValidationSchema = yup.object({});

export const sessionCreateValidationSchema = yup.object({
  hallId: yup
    .string()
    .required("Please select hall"),
  cinemaId: yup
    .string()
    .required("Please select cinema"),
  movieId: yup
    .string()
    .required("Please select movie"),
  sessionTimes: yup
    .array().of(sessionTimesValidationSchema),
});

export const sessionUpdateValidationSchema = yup.object({
  hallId: yup
    .string()
    .required("Please select hall"),
  cinemaId: yup
    .string()
    .required("Please select cinema"),
  movieId: yup
    .string()
    .required("Please select movie"),
  sessionTime: yup
    .object({
      startDate: yup
        .date()
        .required("Please enter session start date"),
      coefficient: yup
        .number()
        .min(0.5, "Session price coefficient must be more than 0.5")
        .required("Please enter session price coefficient"),
    }),
});

export type sessionCreateValidationSchemaType = typeof sessionCreateValidationSchema
export type sessionUpdateValidationSchemaType = typeof sessionUpdateValidationSchema
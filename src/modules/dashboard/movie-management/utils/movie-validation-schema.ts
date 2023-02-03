import * as yup from "yup";

const movieValidationSchema = yup.object({
  name: yup
    .string()
    .required("Please enter movie name"),
  description: yup
    .string()
    .required("Please enter movie description"),
  premiereDate: yup
    .date()
    .required("Please enter movie premiere date"),
  durationInMinutes: yup
    .number()
    .min(1, "Movie duration must be more than 1")
    .required("Please enter movie duration (in minutes)"),
  posterURL: yup
    .string()
    .required("Please upload movie poster"),
  genres: yup
    .array()
    .required("Please select genres"),
  countries: yup
    .array()
    .required("PLease enter countries"),
});

export default movieValidationSchema;
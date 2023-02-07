import * as yup from "yup";

const cinemaValidationSchema = yup.object({
  name: yup.string().required("Please enter cinema name"),
  country: yup.string().required("Please enter cinema country"),
  city: yup.string().required("Please enter cinema city"),
  street: yup.string().required("Please enter cinema street"),
  houseNumber: yup
    .number()
    .min(0, "House number must be more than 0")
    .required("Please enter cinema house number"),
});

export default cinemaValidationSchema;

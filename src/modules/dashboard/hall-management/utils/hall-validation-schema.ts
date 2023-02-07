import * as yup from "yup";

const seatTypePricesValidationSchema = yup.object({
  price: yup
    .number()
    .min(0.1, "Price seat type must be more than 0.1")
    .required("Please enter price seat"),
  seatTypeId: yup.string().required("Please select seat type"),
});

const seatValidationSchema = yup.object({
  numberSeat: yup
    .number()
    .min(1, "Number seat must be more than 1")
    .integer("Number seat must be integer")
    .required("Please enter number seat"),
  seatTypeId: yup.string().required("Please select seat type"),
});

const rowSchema = yup.object({
  numberRow: yup
    .number()
    .min(1, "Number row must be more than 1")
    .integer("Number row must be integer")
    .required("Please enter number row"),
  seats: yup.array().of(seatValidationSchema),
});

const hallValidationSchema = yup.object({
  name: yup.string().required("Please enter hall name"),
  cinemaId: yup.string().required("Please select cinema"),
  rows: yup.array().of(rowSchema),
  seatTypePrices: yup.array().of(seatTypePricesValidationSchema),
});

export default hallValidationSchema;

import moment from "moment";

export const MovieFieldValues = {
  id: "",
  posterURL: "",
  name: "",
  description: "",
  premiereDate: moment(Date.now()).format("YYYY-MM-DD"),
  durationInMinutes: 0,
  genres: [],
  countries: [],
};
export type MovieFieldType = typeof MovieFieldValues;

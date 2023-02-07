import moment from "moment/moment";

export const getYear = (date) => {
  return moment(date).toDate().getFullYear();
};

export const convertDate = (date) => {
  return moment(date).format("DD.MM.YYYY HH:mm");
};

export const convertMinutesToHoursWithMinutes = (
  minutesNumber: number,
): string => {
  const hours = Math.trunc(minutesNumber / 60);
  if (hours <= 0) {
    return `${minutesNumber}m`;
  }

  const minutes = minutesNumber - hours * 60;
  if (minutes <= 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

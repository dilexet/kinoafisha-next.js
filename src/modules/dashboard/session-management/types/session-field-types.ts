export interface SessionFieldsType {
  id: string;
  movieId: string;
  cinemaId: string;
  hallId: string;
}

export interface SessionUpdateFieldsType extends SessionFieldsType {
  sessionTime: SessionTimeFieldsType;
}

export interface SessionCreateFieldsType extends SessionFieldsType {
  sessionTimes: SessionTimeFieldsType[];
}

export interface SessionTimeFieldsType {
  startDate: string;
  coefficient: number;
}
interface SessionFieldsType {
  id: string;
  movieId: string;
  cinemaId: string;
}

export interface SessionUpdateFieldsType extends SessionFieldsType {
  sessionTime: SessionTimeFieldsType;
}

export interface SessionCreateFieldsType extends SessionFieldsType {
  sessionTime: SessionTimeFieldsType[];
}

export interface SessionTimeFieldsType {
  startDate: Date;
  coefficient: number;
}
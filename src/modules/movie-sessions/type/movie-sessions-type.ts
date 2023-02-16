export interface MovieSessionsType {
  id: string;
  name: string;
  posterURL: string;
  premiereDate: string;
  description: string;
  durationInMinutes: number;
  genres: GenreType[];
  countries: CountryType[];
  cinemaSessions: CinemaSessionsType[];
}

export interface GenreType {
  id: string;
  name: string;
}

export interface CountryType {
  id: string;
  name: string;
}

export interface CinemaSessionsType {
  cinema: CinemaType;

  sessions: SessionType[];
}

export interface CinemaType {
  id: string;
  name: string;
  address: string;
}

export interface SessionType {
  id: string;
  startDate: string;
  hallWorkLoad: number;
  hallName: string;
}

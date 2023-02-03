export type MovieType = {
  id: string;

  name: string;

  description: string;

  premiereDate: string;

  durationInMinutes: number;

  genres: GenreType[];

  countries: CountryType[];

  posterURL: string;
}

export interface GenreType {
  id: string;

  name: string;
}

export class CountryType {
  id: string;

  name: string;
}
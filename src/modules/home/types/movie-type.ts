export interface MovieType {
  id: string;
  name: string;
  posterURL: string;
  premiereDate: string;
  genres: GenreType[];
  countries: CountryType[];
}

export interface GenreType {
  id: string;
  name: string;
}

export interface CountryType {
  id: string;
  name: string;
}

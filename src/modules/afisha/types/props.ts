import { MovieType } from "@/modules/afisha/types/movie-type";
import { MovieAfishaState } from "@/modules/afisha/reducer";

export interface AfishaComponentProps {
  movies: MovieType[],
  movieState: MovieAfishaState,
  handleSearch: (search: string | null) => void
}
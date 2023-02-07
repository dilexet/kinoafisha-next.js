import { MovieType } from "@/modules/dashboard/movie-management/types/movie-type";

export interface MovieTableBodyProps {
  movies: MovieType[];
  handleOpenModal: (value: string) => void;
}

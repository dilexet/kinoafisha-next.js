import { CinemaSessionsType, MovieSessionsType, SessionType } from "@/modules/movie-sessions/type/movie-sessions-type";
import { MovieSessionsState } from "@/modules/movie-sessions/reducer";

export interface MovieInfoComponentProps {
  movie: MovieSessionsType;
}

export interface MovieSessionComponentProps {
  movieSessionState: MovieSessionsState;
  handleClose: () => void;
}


export interface MovieSessionsListComponentProps {
  cinemaSessions: CinemaSessionsType[];
}

export interface SessionCardProps {
  cinemaSession: CinemaSessionsType;
}

export interface SessionCardInfoProps {
  session: SessionType;
}

export interface HallWorkLoadProps {
  hallWorkLoad: number;
}
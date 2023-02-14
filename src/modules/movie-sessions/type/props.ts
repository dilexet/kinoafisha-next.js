import { CinemaSessionsType, MovieSessionsType, SessionType } from "@/modules/movie-sessions/type/movie-sessions-type";
import { MovieSessionsState } from "@/modules/movie-sessions/reducer";
import { TokenPayload } from "@/modules/authorize/types/tokens-type";
import { CommentInfoType } from "@/modules/movie-sessions/type/comment-types";

export interface MovieInfoComponentProps {
  movie: MovieSessionsType;
}

export interface MovieSessionComponentProps {
  movieSessionState: MovieSessionsState;
  handleClose: () => void;
  isAuthenticate: boolean;
  commentText: string;
  handleCommentTextChange: (event: any) => void;
  handleAddComment: () => void;
  tokenPayload: TokenPayload;
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

export interface CommentAddBlockProps {
  user: TokenPayload;
  commentText: string;
  handleCommentTextChange: (event: any) => void;
  handleAddComment: () => void;
}

export interface CommentsBlockProps {
  comments: CommentInfoType[];
  currenUserProfileId: string | null;
}
import { Box, Divider, Paper } from "@mui/material";
import MovieTitleComponent from "@/modules/movie-sessions/component/movie-title";
import MovieDescriptionComponent from "@/modules/movie-sessions/component/movie-description";
import MovieInfoComponent from "@/modules/movie-sessions/component/movie-info";
import {
  MovieSessionComponentProps,
} from "@/modules/movie-sessions/type/props";
import MovieSessionsListComponent from "@/modules/movie-sessions/component/movie-sessions-list";
import CommentAddBlock from "@/modules/movie-sessions/component/comment-add-block";
import CommentsBlock from "@/modules/movie-sessions/component/comments-block";

export default function MovieSessionsComponent({
                                                 movieSessionState,
                                                 handleClose,
                                                 isAuthenticate,
                                                 commentText,
                                                 handleCommentTextChange,
                                                 handleAddComment,
                                                 tokenPayload,
                                               }: MovieSessionComponentProps) {
  return (
    <Box style={{
      margin: "16px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Box style={{ width: "90%" }}>
        <Paper sx={{ p: 2 }} style={{
          background: "#27272A",
          border: "none",
          boxShadow: "none",
        }}>
          <MovieTitleComponent movieName={movieSessionState?.movie?.name} handleClose={handleClose} />
          <Divider />
          <Box
            style={{
              display: "flex", margin: "60px 0",
            }}>
            <Box style={{
              flex: "1 1 auto", boxSizing: "border-box",
            }}>
              <MovieInfoComponent movie={movieSessionState?.movie} />
              <MovieSessionsListComponent cinemaSessions={movieSessionState?.movie?.cinemaSessions} />
            </Box>
            <MovieDescriptionComponent
              movieName={movieSessionState?.movie?.name}
              movieDescription={movieSessionState?.movie?.description}
            />
          </Box>
          <Box style={{ width: "100%", height: "100%" }}>
            {
              isAuthenticate === false ? <></> :
                <CommentAddBlock user={tokenPayload}
                                 commentText={commentText}
                                 handleCommentTextChange={handleCommentTextChange}
                                 handleAddComment={handleAddComment}
                />
            }
            <CommentsBlock comments={movieSessionState?.comments}
                           currenUserProfileId={tokenPayload?.userProfileId ?? null} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
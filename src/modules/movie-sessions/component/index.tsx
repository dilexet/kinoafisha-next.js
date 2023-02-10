import { Box, Divider, Paper } from "@mui/material";
import MovieTitleComponent from "@/modules/movie-sessions/component/movie-title";
import MovieDescriptionComponent from "@/modules/movie-sessions/component/movie-description";
import MovieInfoComponent from "@/modules/movie-sessions/component/movie-info";
import {
  MovieSessionComponentProps,
} from "@/modules/movie-sessions/type/props";
import MovieSessionsListComponent from "@/modules/movie-sessions/component/movie-sessions-list";

export default function MovieSessionsComponent({ movieSessionState, handleClose }: MovieSessionComponentProps) {
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
        </Paper>
      </Box>
    </Box>
  );
}
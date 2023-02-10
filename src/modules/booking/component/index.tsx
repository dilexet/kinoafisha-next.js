import { SessionDetailsComponentProps } from "@/modules/booking/types/props";
import { Box, Divider, Paper, Grid } from "@mui/material";
import MovieTitleComponent from "@/modules/movie-sessions/component/movie-title";
import MovieInfoComponent from "@/modules/booking/component/movie-info";
import HallPlan from "@/modules/booking/component/hall-plan/hall-plan";
import SeatTypeInfoComponent from "@/modules/booking/component/seat-type-info";

export default function SessionDetailsComponent({ sessionDetailsState, handleClose }: SessionDetailsComponentProps) {
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
          <MovieTitleComponent movieName={sessionDetailsState?.session?.movie?.name}
                               handleClose={handleClose} />
          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <MovieInfoComponent session={sessionDetailsState?.session} />
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <HallPlan hall={sessionDetailsState?.session?.hall} />
                </Grid>
                <Grid item xs={4}>
                  <SeatTypeInfoComponent sessionSeatTypes={sessionDetailsState?.session?.sessionSeatTypes}
                                         hallName={sessionDetailsState?.session?.hall?.name} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
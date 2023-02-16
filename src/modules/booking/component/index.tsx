import { SessionDetailsComponentProps } from "@/modules/booking/types/props";
import { Box, Divider, Paper, Grid } from "@mui/material";
import MovieTitleComponent from "@/modules/movie-sessions/component/movie-title";
import MovieInfoComponent from "@/modules/booking/component/movie-info";
import HallPlan from "@/modules/booking/component/hall-plan/hall-plan";
import SeatTypeInfoComponent from "@/modules/booking/component/seat-type-info";
import SelectedSeatsContainer from "@/modules/booking/container/selected-seats";

export default function SessionDetailsComponent({
  bookingState,
  handleClose,
  handleCancelSelectSeat,
  handleSelectSeat,
  selectedSeatIds,
  minutes,
  seconds,
  isRunning,
}: SessionDetailsComponentProps) {
  return (
    <Box
      style={{
        margin: "16px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box style={{ width: "90%" }}>
        <Paper
          sx={{ p: 2 }}
          style={{
            background: "#27272A",
            border: "none",
            boxShadow: "none",
          }}
        >
          <MovieTitleComponent
            movieName={bookingState?.session?.movie?.name}
            handleClose={handleClose}
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
          />
          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <MovieInfoComponent session={bookingState?.session} />
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <HallPlan
                    hall={bookingState?.session?.hall}
                    handleSelectSeat={handleSelectSeat}
                    handleCancelSelectSeat={handleCancelSelectSeat}
                  />
                </Grid>
                <Grid item xs={12}>
                  {selectedSeatIds?.length <= 0 ? (
                    <SeatTypeInfoComponent
                      sessionSeatTypes={bookingState?.session?.sessionSeatTypes}
                      hallName={bookingState?.session?.hall?.name}
                    />
                  ) : (
                    <SelectedSeatsContainer
                      selectedSeatIds={selectedSeatIds}
                      handleCancelSelectSeat={handleCancelSelectSeat}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

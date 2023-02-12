import { Box, Divider, Grid, Paper } from "@mui/material";
import MovieTitleComponent from "@/modules/movie-sessions/component/movie-title";
import MovieInfoComponent from "@/modules/booking/component/movie-info";
import { ConfirmBookingComponentProps } from "@/modules/confirm-booking/types/props";
import TotalPayableInfoComponent from "@/modules/confirm-booking/component/total-payable-info";
import OrdersListComponent from "@/modules/confirm-booking/component/orders-list";

export default function ConfirmBookingComponent({
                                                  bookingState,
                                                  handleClose,
                                                  minutes,
                                                  seconds,
                                                  isRunning,
                                                  selectedSeats,
                                                  totalPrice,
                                                  handleConfirmOrder,
                                                  confirmBookingState,
                                                }: ConfirmBookingComponentProps) {
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
          <MovieTitleComponent movieName={bookingState?.session?.movie?.name}
                               handleClose={handleClose}
                               minutes={minutes} seconds={seconds} isRunning={isRunning}
          />
          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <MovieInfoComponent session={bookingState?.session} />
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <OrdersListComponent selectedSeats={selectedSeats} />
                </Grid>
                <Grid item xs={4}>
                  <TotalPayableInfoComponent
                    totalPrice={totalPrice}
                    handleConfirmOrder={handleConfirmOrder}
                    confirmBookingState={confirmBookingState}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
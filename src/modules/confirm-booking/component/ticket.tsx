import { Box, Grid, Typography } from "@mui/material";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { SeatSelectedColor } from "@/modules/booking/constants/seat-colors";
import { TicketComponentProps } from "@/modules/confirm-booking/types/props";

export default function TicketComponent({
  selectedSeat,
}: TicketComponentProps) {
  return (
    <Grid
      container
      spacing={1}
      style={{
        margin: "20px 0",
      }}
    >
      <Grid item xs={2}>
        <Box
          style={{
            width: "85px",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <SquareRoundedIcon
            style={{
              fontSize: "40px",
              fill: SeatSelectedColor,
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={10}
        style={{
          padding: "0 10px",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              style={{
                fontSize: "1em",
                fontWeight: "400",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {selectedSeat?.numberRow}
              &nbsp;row&nbsp;/&nbsp;
              {selectedSeat?.numberSeat}
              &nbsp;seat
            </Typography>
          </Box>
          <Box
            style={{
              margin: "0 20px",
            }}
          >
            <Typography
              style={{
                fontSize: "1em",
                fontWeight: "700",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {selectedSeat?.price}
              &nbsp;$
            </Typography>
          </Box>
        </Box>
        <Box
          style={{
            margin: "5px 0",
          }}
        >
          <Typography
            style={{
              fontSize: "1em",
              fontWeight: "400",
              color: "rgba(200, 199, 199, 0.8)",
            }}
          >
            Seat type:&nbsp;
            {selectedSeat?.seatType}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

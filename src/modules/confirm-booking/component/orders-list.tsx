import { Box, Typography } from "@mui/material";
import { OrdersListComponentProps } from "@/modules/confirm-booking/types/props";
import TicketComponent from "@/modules/confirm-booking/component/ticket";

export default function OrdersListComponent({
  selectedSeats,
}: OrdersListComponentProps) {
  return (
    <Box
      style={{
        margin: "20px 50px 10px 20px",
      }}
    >
      <Box>
        <Typography
          component='h1'
          style={{
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          My tickets
        </Typography>
        <Box
          style={{
            marginTop: "30px",
            marginBottom: "60px",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          {selectedSeats?.map((selectedSeat, index) => (
            <Box
              key={index}
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <TicketComponent selectedSeat={selectedSeat} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

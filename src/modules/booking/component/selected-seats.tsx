import { Box, Button, Divider, Typography } from "@mui/material";
import { SelectedSeatsComponentProps } from "@/modules/booking/types/props";
import SelectedSeatComponent from "@/modules/booking/component/selected-seat";

export default function SelectedSeatsComponent({
                                                 totalPrice,
                                                 selectedSeats,
                                                 handleCancelSelectSeat,
                                                 session,
                                               }: SelectedSeatsComponentProps) {
  return (
    <Box
      style={{
        margin: "25px 0", padding: "10px",
      }}>
      <Box
        style={{
          marginBottom: "20px",
        }}>
        <Box
          style={{
            display: "inline", textAlign: "left",
          }}>
          <Typography
            style={{
              fontSize: "1.47em",
              fontWeight: "700",
              color: "rgba(255, 255, 255, 0.8)",
            }}>
            My tickets
          </Typography>
          <Typography
            style={{
              marginTop: "25px",
              fontSize: "15px",
              fontWeight: "400",
              color: "rgba(255, 255, 255, 0.5)",
            }}>
            {session?.hall?.name}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Box>
          {
            selectedSeats?.map((selectedSeat, index) => (
                <Box key={index}
                     style={{
                       borderBottom: "1px solid rgba(255, 255, 255, 0.15",
                     }}>
                  <SelectedSeatComponent selectedSeat={selectedSeat}
                                         handleCancelSelectSeat={handleCancelSelectSeat} />
                </Box>
              ),
            )
          }
        </Box>
        <Box
          style={{
            marginTop: "25px", textAlign: "center",
          }}>
          <Typography
            style={{
              fontSize: "1.625em",
              fontWeight: "500",
              color: "rgba(255, 255, 255, 0.8)",
            }}>
            <span>
              Total price:&nbsp;
            </span>
            <strong>
              <span>
                {totalPrice}
              </span>
            </strong>
            <small>
              &nbsp;$
            </small>
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          margin: "25px 0",
        }}>
        <Button variant="outlined" fullWidth
                onClick={() => console.log("CONFIRM ORDER")}
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  textTransform: "none",
                  borderRadius: "22px",
                  border: "2px solid #FFFFFF",
                  fontSize: "1em",
                }}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
}
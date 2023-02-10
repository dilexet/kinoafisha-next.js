import { Box, Typography } from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { SeatTypeComponentProps } from "@/modules/booking/types/props";
import { generateColor } from "@/modules/shared/utils/generate-color";

export default function SeatTypeComponent({ seatType }: SeatTypeComponentProps) {
  return (
    <Box
      style={{
        display: "flex",
        margin: "15px",
      }}>
      <Box
        style={{
          flex: "0 0 auto",
          width: "85px",
          textAlign: "center",
          paddingRight: "20px",
        }}>
        <CropSquareIcon style={{
          fontSize: "40px",
          color: generateColor(seatType?.id),
        }} />
      </Box>
      <Box
        style={{
          flex: "1 1 auto",
          margin: "auto",
        }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Box>
            <Typography
              style={{
                fontSize: "1em",
                fontWeight: "400",
                color: "rgba(255, 255, 255, 0.8)",
              }}>
              {seatType?.name}
            </Typography>
          </Box>
          <Box
            style={{
              marginLeft: "20px",
              flex: "0 0 auto",
            }}>
            <Typography
              style={{
                fontSize: "1em",
                fontWeight: "700",
                color: "rgba(255, 255, 255, 0.8)",
              }}>
              {seatType?.price}&nbsp;$
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
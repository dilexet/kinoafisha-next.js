import { SeatType } from "@/modules/dashboard/hall-management/types/hall-type";
import { Box, Typography, useTheme } from "@mui/material";

export default function ToolTipSeatMenu({ seat, numberRow }: { seat: SeatType, numberRow: number }) {
  const theme = useTheme();
  return (
    <Box style={{
      borderRadius: "5px",
      padding: "5px",
      width: "190px",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
    }}>
      <Box style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: "0 0 auto",
        width: "72px",
        minHeight: "90px",
        marginRight: "5px",
        borderRadius: "3px",
        border: theme.palette.mode === "dark" ?
          "1px solid rgba(255, 255, 255, 0.3)" :
          "1px solid rgba(0, 0, 0, 0.3)",
      }}>
        <Box style={{
          padding: "2px",
        }}>
          <Typography style={{
            fontSize: "12px",
            lineHeight: "16px",
            color: theme.palette.mode === "dark" ?
              "rgba(255, 255, 255, 0.8)" :
              "rgba(0, 0, 0, 0.8)",
          }}>
            {numberRow}
            &nbsp;
            row
          </Typography>
        </Box>
        <Box style={{
          padding: "2px",
        }}>
          <Typography style={{
            fontSize: "30px",
            lineHeight: "36px",
            fontWeight: "700",
            color: theme.palette.mode === "dark" ?
              "rgba(255, 255, 255, 0.8)" :
              "rgba(0, 0, 0, 0.8)",
          }}>
            {seat?.numberSeat}
          </Typography>
        </Box>
        <Box style={{
          padding: "2px",
        }}>
          <Typography style={{
            fontSize: "12px",
            lineHeight: "16px",
            color: theme.palette.mode === "dark" ?
              "rgba(255, 255, 255, 0.8)" :
              "rgba(0, 0, 0, 0.8)",
          }}>
            seat
          </Typography>
        </Box>
      </Box>
      <Box style={{
        flex: "1 1 auto",
      }}>
        <Box>
          <Typography style={{
            fontSize: "14px",
            lineHeight: "24px",
            color: theme.palette.mode === "dark" ?
              "rgba(255, 255, 255, 0.8)" :
              "rgba(0, 0, 0, 0.8)",
          }}>
            {seat?.seatType.name}
          </Typography>
        </Box>
        <Box>
          <Typography style={{
            fontSize: "14px",
            lineHeight: "24px",
            fontWeight: "700",
            marginTop: "8px",
            color: theme.palette.mode === "dark" ?
              "rgba(255, 255, 255, 0.8)" :
              "rgba(0, 0, 0, 0.8)",
          }}>
            {seat?.price}
            &nbsp;$
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
import { Box, Fade, Tooltip } from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { HallSeatsPlanProps } from "@/modules/booking/types/hall-seats-plan-props";
import ToolTipSeatMenu from "@/modules/booking/component/hall-plan/tool-tip-seat-menu";
import { TicketState } from "@/modules/shared/constants/ticket-state";
import { SeatBookedColor, SeatSelectedColor } from "@/modules/booking/constants/seat-colors";

export default function HallSeatsPlan({
                                        seat, numberRow,
                                        handleCancelSelectSeat,
                                        handleSelectSeat,
                                      }: HallSeatsPlanProps) {
  return (
    <Box
      style={{
        display: "inline-block",
      }}
    >
      {
        seat?.ticketState === TicketState.Free ?
          <Tooltip
            TransitionComponent={Fade}
            arrow
            placement="top"
            TransitionProps={{ timeout: 400 }}
            title={<ToolTipSeatMenu seat={seat} numberRow={numberRow} />}
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                },
              },
              arrow: {
                sx: {
                  color: "rgba(0, 0, 0, 0.9)",
                },
              },
            }}
          >
            <Box
              onClick={() => handleSelectSeat(seat?.sessionSeatId)}
              style={{
                margin: "0 2px",
                cursor: "pointer",
              }}
            >
              <CropSquareIcon
                style={{
                  fontSize: "40px",
                  color: seat?.colorHex,
                }}
              />
            </Box>
          </Tooltip> :
          seat.ticketState === TicketState.BlockedMySelf ?
            <Box onClick={() => handleCancelSelectSeat(seat?.sessionSeatId)}
                 style={{
                   margin: "0 2px",
                   cursor: "pointer",
                 }}>
              <SquareRoundedIcon style={{
                fontSize: "40px",
                fill: SeatSelectedColor,
              }} />
            </Box> :
            <Box style={{
              margin: "0 2px",
              cursor: "not-allowed",
            }}>
              <CropSquareIcon style={{
                fontSize: "40px",
                color: SeatBookedColor,
              }} />
            </Box>
      }
    </Box>
  );
}
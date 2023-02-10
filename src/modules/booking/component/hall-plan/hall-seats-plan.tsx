import { Box, Fade, Tooltip, useTheme } from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { generateColor } from "@/modules/shared/utils/generate-color";
import { HallSeatsPlanProps } from "@/modules/booking/types/hall-seats-plan-props";
import ToolTipSeatMenu from "@/modules/booking/component/hall-plan/tool-tip-seat-menu";

export default function HallSeatsPlan({ seat, numberRow }: HallSeatsPlanProps) {
  const theme = useTheme();
  return (
    <Box
      key={seat.id}
      style={{
        display: "inline-block",
      }}
    >
      <Tooltip
        TransitionComponent={Fade}
        arrow
        placement="top"
        TransitionProps={{ timeout: 400 }}
        title={<ToolTipSeatMenu seat={seat} numberRow={numberRow} />}
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.9)"
                  : "rgba(255, 255, 255, 0.9)",
            },
          },
          arrow: {
            sx: {
              color:
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.9)"
                  : "rgba(255, 255, 255, 0.9)",
            },
          },
        }}
      >
        <Box
          style={{
            margin: "0 2px",
            cursor: "pointer",
          }}
        >
          <CropSquareIcon
            style={{
              fontSize: "40px",
              color: generateColor(seat.seatTypeId),
            }}
          />
        </Box>
      </Tooltip>
    </Box>
  );
}

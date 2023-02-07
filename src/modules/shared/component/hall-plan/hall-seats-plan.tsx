import { Box, Fade, Tooltip, useTheme } from "@mui/material";
import ToolTipSeatMenu from "@/modules/shared/component/hall-plan/tool-tip-seat-menu";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import React from "react";
import { generateColor } from "@/modules/shared/utils/generate-color";
import { HallSeatsPlanProps } from "@/modules/shared/types/hall-seats-plan-props";

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
        placement='top'
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
              color: generateColor(seat.seatType.id),
            }}
          />
        </Box>
      </Tooltip>
    </Box>
  );
}

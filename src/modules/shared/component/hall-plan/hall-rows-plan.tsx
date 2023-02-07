import { Box } from "@mui/material";
import RowNumbers from "@/modules/shared/component/hall-plan/row-numbers";
import React from "react";
import HallSeatsPlan from "@/modules/shared/component/hall-plan/hall-seats-plan";
import { calculateWidthBySeats } from "@/modules/shared/utils/calculate-width";
import { HallRowsPlanProps } from "@/modules/shared/types/hall-rows-plan-props";

export default function HallRowsPlan({ row }: HallRowsPlanProps) {
  return (
    <Box style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px 0",
      minWidth: calculateWidthBySeats(row?.seats?.length),
    }}>
      <RowNumbers numberRow={row?.numberRow} />
      <Box
        style={{
          margin: "0 10px",
        }}>
        {
          row?.seats?.map((seat) => (
            <React.Fragment key={seat.id}>
              <HallSeatsPlan seat={seat} numberRow={row?.numberRow} />
            </React.Fragment>
          ))
        }
      </Box>
      <RowNumbers numberRow={row?.numberRow} />
    </Box>
  );
}
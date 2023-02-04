import { RowType } from "@/modules/dashboard/hall-management/types/hall-type";
import { Box } from "@mui/material";
import RowNumbers from "@/modules/shared/component/hall-plan/row-numbers";
import React from "react";
import HallSeatsPlan from "@/modules/shared/component/hall-plan/hall-seats-plan";

export default function HallRowsPlan({ row }: { row: RowType }) {
  return (
    <Box style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px 0",
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
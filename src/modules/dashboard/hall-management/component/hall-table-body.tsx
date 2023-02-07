import { TableBody } from "@mui/material";
import React from "react";
import HallRowContainer from "@/modules/dashboard/hall-management/container/hall-row-container";
import { HallTableBodyProps } from "@/modules/dashboard/hall-management/types/hall-table-body-props";

export default function HallTableBody({
  halls,
  handleOpenModal,
}: HallTableBodyProps) {
  return (
    <TableBody>
      {halls.map((hall, index) => (
        <React.Fragment key={hall.id}>
          <HallRowContainer
            hall={hall}
            index={index}
            handleOpenModal={handleOpenModal}
          />
        </React.Fragment>
      ))}
    </TableBody>
  );
}

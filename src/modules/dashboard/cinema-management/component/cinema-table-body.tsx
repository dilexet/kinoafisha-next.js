import { TableBody } from "@mui/material";
import React from "react";
import CinemaRowContainer from "@/modules/dashboard/cinema-management/container/cinema-row-container";
import { CinemaTableBodyProps } from "@/modules/dashboard/cinema-management/types/cinema-table-body-props";

export default function CinemaTableBody({
                                          cinemas,
                                          handleOpenModal,
                                        }: CinemaTableBodyProps) {
  return (
    <TableBody>
      {
        cinemas.map((cinema, index) => (
          <React.Fragment key={cinema.id}>
            <CinemaRowContainer cinema={cinema} index={index} handleOpenModal={handleOpenModal} />
          </React.Fragment>
        ))
      }
    </TableBody>
  );
}
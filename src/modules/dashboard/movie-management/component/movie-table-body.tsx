import React from "react";
import { TableBody } from "@mui/material";
import { MovieTableBodyProps } from "@/modules/dashboard/movie-management/types/movie-table-body-props";
import MovieRowContainer from "@/modules/dashboard/movie-management/container/movie-row-container";

export default function MovieTableBody({
                                          movies,
                                          handleOpenModal,
                                        }: MovieTableBodyProps) {
  return (
    <TableBody>
      {
        movies.map((movie, index) => (
          <React.Fragment key={movie.id}>
            <MovieRowContainer movie={movie} index={index} handleOpenModal={handleOpenModal} />
          </React.Fragment>
        ))
      }
    </TableBody>
  );
}
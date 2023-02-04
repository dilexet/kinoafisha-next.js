import { TableCell, TableRow, useTheme } from "@mui/material";
import { HallRowComponentProps } from "@/modules/dashboard/hall-management/types/hall-row-props";
import UtilsButtonGroup from "@/modules/dashboard/shared/component/utils-button-group";

export default function HallRow({
                                  hall, handleGetDetails,
                                  handleUpdate, handleRemove,
                                  handleClearErrors, index,
                                }: HallRowComponentProps) {
  const theme = useTheme();
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      style={{
        backgroundColor: theme.palette.grey[1000],
      }}
    >
      <TableCell component="th" scope="row" align="left">
        {index + 1}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {hall.name}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {hall.cinemaName}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {hall.numberOfRows}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {hall.numberOfSeats}
      </TableCell>
      <TableCell component="th" scope="row" align="right">
        <UtilsButtonGroup handleGetDetails={handleGetDetails}
                          handleUpdate={handleUpdate}
                          handleRemove={handleRemove}
                          clearErrors={handleClearErrors}
        />
      </TableCell>
    </TableRow>
  );
}
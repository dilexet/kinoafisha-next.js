import { TableCell, TableRow, ButtonGroup, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { CinemaRowComponentProps } from "@/modules/dashboard/cinema-management/types/cinema-row-props";
import UtilsButtonGroup from "@/modules/dashboard/shared/component/utils-button-group";

export default function CinemaRow({
                                    theme,
                                    cinema,
                                    index,
                                    handleGetDetails,
                                    handleUpdate,
                                    handleRemove,
                                  }: CinemaRowComponentProps) {
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
        {cinema.name}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {`${cinema.houseNumber} ${cinema.street}, ${cinema.city}, ${cinema.country}`}
      </TableCell>
      <TableCell component="th" scope="row" align="right">
        <UtilsButtonGroup handleGetDetails={handleGetDetails}
                          handleUpdate={handleUpdate}
                          handleRemove={handleRemove} />
      </TableCell>
    </TableRow>
  );
}
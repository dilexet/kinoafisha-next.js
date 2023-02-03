import { TableCell, TableRow, ButtonGroup, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { CinemaRowComponentProps } from "@/modules/dashboard/cinema-management/types/cinema-row-props";

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
        <ButtonGroup>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={handleGetDetails}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              border: "1px solid",
              borderColor: theme.palette.grey["300"],
              borderRadius: "11px",
            }}>
            <VisibilityIcon
              fontSize="small"
              style={{ fill: theme.palette.grey["300"] }} />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={handleUpdate}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              border: "1px solid",
              borderColor: theme.palette.info.main,
              borderRadius: "11px",
            }}>
            <BorderColorIcon
              fontSize="small"
              style={{ fill: theme.palette.info.main }} />
          </IconButton>
          <IconButton
            onClick={handleRemove}
            aria-label="delete"
            size="small"
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              border: "1px solid",
              borderColor: theme.palette.error.main,
              borderRadius: "11px",
            }}>
            <DeleteOutlineIcon
              fontSize="small"
              style={{ fill: theme.palette.error.main }} />
          </IconButton>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
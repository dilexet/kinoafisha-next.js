import { TableCell, TableRow, ButtonGroup, IconButton, Avatar, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { MovieRowComponentProps } from "@/modules/dashboard/movie-management/types/movie-row-props";
import { convertMinutesToHoursWithMinutes, getYear } from "@/modules/dashboard/movie-management/utils/date-formater";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";

export default function MovieRow({
                                   theme,
                                   movie,
                                   index,
                                   handleGetDetails,
                                   handleUpdate,
                                   handleRemove,
                                 }: MovieRowComponentProps) {
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
        <Box component="div" sx={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}>
          <Avatar alt="poster" src={IMAGE_URL(movie.posterURL)} />
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {movie.name}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {getYear(movie.premiereDate)}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {convertMinutesToHoursWithMinutes(movie.durationInMinutes)}
      </TableCell>
      {
        // TODO: move to another component
      }
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
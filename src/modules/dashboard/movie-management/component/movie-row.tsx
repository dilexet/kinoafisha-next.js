import { TableCell, TableRow, Avatar, Box, Skeleton } from "@mui/material";
import { MovieRowComponentProps } from "@/modules/dashboard/movie-management/types/movie-row-props";
import {
  convertMinutesToHoursWithMinutes,
  getYear,
} from "@/modules/dashboard/shared/utils/date-formater";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";
import UtilsButtonGroup from "@/modules/dashboard/shared/component/utils-button-group";

export default function MovieRow({
  theme,
  movie,
  index,
  handleGetDetails,
  handleUpdate,
  handleRemove,
  handleClearErrors,
}: MovieRowComponentProps) {
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      style={{
        backgroundColor: theme.palette.grey[1000],
      }}
    >
      <TableCell component='th' scope='row' align='left'>
        {index + 1}
      </TableCell>
      <TableCell component='th' scope='row' align='left'>
        <Box
          component='div'
          sx={{
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {movie?.posterURL ? (
            <Avatar alt='poster' src={IMAGE_URL(movie.posterURL)} />
          ) : (
            <Skeleton variant='circular' width={50} height={50} />
          )}
        </Box>
      </TableCell>
      <TableCell component='th' scope='row' align='left'>
        {movie.name}
      </TableCell>
      <TableCell component='th' scope='row' align='center'>
        {getYear(movie.premiereDate)}
      </TableCell>
      <TableCell component='th' scope='row' align='center'>
        {convertMinutesToHoursWithMinutes(movie.durationInMinutes)}
      </TableCell>
      <TableCell component='th' scope='row' align='right'>
        <UtilsButtonGroup
          handleGetDetails={handleGetDetails}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
          clearErrors={handleClearErrors}
        />
      </TableCell>
    </TableRow>
  );
}

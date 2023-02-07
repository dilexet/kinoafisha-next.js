import { TableCell, TableRow, useTheme, Typography } from "@mui/material";
import UtilsButtonGroup from "@/modules/dashboard/shared/component/utils-button-group";
import { SessionRowComponentProps } from "@/modules/dashboard/session-management/types/session-row";
import { convertDate } from "@/modules/dashboard/shared/utils/date-formater";
import moment from "moment";

export default function SessionRow({
  session,
  index,
  handleGetDetails,
  handleUpdate,
  handleRemove,
  handleClearErrors,
}: SessionRowComponentProps) {
  const theme = useTheme();
  const sessionIsExpire = moment(session?.startDate).isBefore(new Date());
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      style={{
        backgroundColor: theme.palette.grey[1000],
        opacity: sessionIsExpire ? "0.6" : "1",
      }}
    >
      <TableCell component='th' scope='row' align='left'>
        <Typography
          style={{
            color: sessionIsExpire ? theme.palette.error.main : "",
          }}
        >
          {index + 1}
        </Typography>
      </TableCell>
      <TableCell component='th' scope='row' align='center'>
        {session.movieName}
      </TableCell>
      <TableCell component='th' scope='row' align='center'>
        {`${session.coefficient}`}
      </TableCell>
      <TableCell component='th' scope='row' align='left'>
        {convertDate(session?.startDate)}
      </TableCell>
      <TableCell component='th' scope='row' align='left'>
        {convertDate(session?.endDate)}
      </TableCell>
      <TableCell component='th' scope='row' align='center'>
        {session.cinemaName}
      </TableCell>
      <TableCell component='th' scope='row' align='center'>
        {session.hallName}
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

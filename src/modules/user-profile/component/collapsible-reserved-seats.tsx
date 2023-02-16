import {
  Box,
  Collapse,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { CollapsibleReservedSeatsComponentProps } from "@/modules/user-profile/types/props";

export default function CollapsibleReservedSeatsComponent({
  open,
  reservedSeats,
}: CollapsibleReservedSeatsComponentProps) {
  return (
    <Collapse in={open} timeout='auto' unmountOnExit>
      <Box sx={{ margin: "20px 10px 10px 0" }}>
        <TableContainer>
          <Table sx={{ maxWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Number row</TableCell>
                <TableCell align='center'>Number seat</TableCell>
                <TableCell align='center'>Seat type</TableCell>
                <TableCell align='center'>price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservedSeats?.map((seat) => (
                <TableRow key={seat.sessionSeatId}>
                  <TableCell component='th' scope='row' align='center'>
                    {seat?.numberRow}
                  </TableCell>
                  <TableCell component='th' scope='row' align='center'>
                    {seat?.numberSeat}
                  </TableCell>
                  <TableCell component='th' scope='row' align='center'>
                    {seat?.seatType}
                  </TableCell>
                  <TableCell component='th' scope='row' align='center'>
                    {seat?.price}&nbsp;$
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Collapse>
  );
}

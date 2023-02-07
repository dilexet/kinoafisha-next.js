import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TicketState } from "@/modules/shared/constants/ticket-state";
import LockResetIcon from "@mui/icons-material/LockReset";
import { SessionSeatTableProps } from "@/modules/dashboard/session-management/types/session-seat-table-props";


export default function SessionSeatTable({ session, handleRemoveFromBooking }: SessionSeatTableProps) {
  return (
    <TableContainer style={{ margin: "20px 0" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Row</TableCell>
            <TableCell align="center">Seat</TableCell>
            <TableCell align="center">Seat type</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Ticket state</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {session?.sessionSeats?.map((sessionSeat) => (
            <TableRow
              key={sessionSeat.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                {sessionSeat.numberRow}
              </TableCell>
              <TableCell align="center">
                {sessionSeat.numberSeat}
              </TableCell>
              <TableCell align="center">
                {sessionSeat.seatType}
              </TableCell>
              <TableCell align="center">
                {`${session?.sessionData?.coefficient} * ${sessionSeat.price} $ = ${session?.sessionData?.coefficient * sessionSeat.price} $`}
              </TableCell>
              <TableCell align="center">
                {sessionSeat.ticketState}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="add"
                  disabled={sessionSeat?.ticketState === TicketState.Free}
                  onClick={() => handleRemoveFromBooking(sessionSeat?.id)}
                >
                  <LockResetIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
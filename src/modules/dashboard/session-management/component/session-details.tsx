import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody, IconButton,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { TicketState } from "@/modules/shared/constants/ticket-state";
import { SessionDetailsProps } from "@/modules/dashboard/session-management/types/session-details-props";

export default function SessionDetails({ gridItems, sessionState, handleRemoveFromBooking }: SessionDetailsProps) {
  return (
    <ModalLayout title="Show session details" error={sessionState?.errorInfo?.message}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        style={{ minWidth: "550px" }}
      >
        {
          gridItems?.map((item, index) => (
            <Grid
              item
              key={index}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography style={{
                fontWeight: "500",
                fontSize: "1.625em",
                opacity: "0.8",
              }}>
                {item.property}:&nbsp;
              </Typography>
              <Typography style={{
                fontWeight: "500",
                fontSize: "1.625em",
                textAlign: "center",
              }}>
                {item.value}
              </Typography>
            </Grid>
          ))
        }
        <Grid item>
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
                {sessionState?.session?.sessionSeats?.map((sessionSeat) => (
                  <TableRow
                    key={sessionSeat.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{sessionSeat.numberRow}</TableCell>
                    <TableCell align="center">{sessionSeat.numberSeat}</TableCell>
                    <TableCell align="center">{sessionSeat.seatType}</TableCell>
                    <TableCell align="center">{sessionSeat.price}</TableCell>
                    <TableCell align="center">{sessionSeat.ticketState}</TableCell>
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
        </Grid>
      </Grid>
    </ModalLayout>
  );
}
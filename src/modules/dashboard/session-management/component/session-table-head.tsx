import { TableCell, TableHead, TableRow } from "@mui/material";

export default function SessionTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align='left'>Id</TableCell>
        <TableCell align='left'>Movie</TableCell>
        <TableCell align='center'>Price (coefficient)</TableCell>
        <TableCell align='center'>Start</TableCell>
        <TableCell align='center'>End</TableCell>
        <TableCell align='center'>Cinema</TableCell>
        <TableCell align='center'>Hall</TableCell>
        <TableCell align='center'>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

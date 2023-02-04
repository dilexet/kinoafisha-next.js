import { TableCell, TableHead, TableRow } from "@mui/material";

export default function HallTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">Id</TableCell>
        <TableCell align="left">Name</TableCell>
        <TableCell align="center">Cinema</TableCell>
        <TableCell align="center">Number of rows</TableCell>
        <TableCell align="center">Number of seats</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
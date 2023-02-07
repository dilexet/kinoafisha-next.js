import { TableCell, TableHead, TableRow } from "@mui/material";

export default function CinemaTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align='left'>Id</TableCell>
        <TableCell align='left'>Name</TableCell>
        <TableCell align='center'>Address</TableCell>
        <TableCell align='center'>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

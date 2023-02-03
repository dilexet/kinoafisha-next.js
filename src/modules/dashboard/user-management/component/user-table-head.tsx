import { TableCell, TableHead, TableRow } from "@mui/material";

export default function UserTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">Id</TableCell>
        <TableCell align="left">Email</TableCell>
        <TableCell align="center">Activated</TableCell>
        <TableCell align="center">Blocked</TableCell>
        <TableCell align="center">Role</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
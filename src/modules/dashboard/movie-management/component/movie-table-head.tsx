import { TableCell, TableHead, TableRow } from "@mui/material";

export default function MovieTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align='left'>Id</TableCell>
        <TableCell align='left'>Poster</TableCell>
        <TableCell align='left'>Name</TableCell>
        <TableCell align='center'>Premier year</TableCell>
        <TableCell align='center'>Duration</TableCell>
        <TableCell align='center'>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

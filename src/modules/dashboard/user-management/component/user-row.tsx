import { TableCell, TableRow, Box, Typography, IconButton } from "@mui/material";
import { UserRowComponentProps } from "@/modules/dashboard/user-management/types/user-row-props";
import UtilsButtonGroup from "@/modules/dashboard/shared/component/utils-button-group";
import { LockStatus } from "@/modules/dashboard/user-management/constants/lock-status";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export default function UserRow({
                                  theme,
                                  user,
                                  index,
                                  handleGetDetails,
                                  handleUpdate,
                                  handleRemove,
                                }: UserRowComponentProps) {
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      style={{
        backgroundColor: theme.palette.grey[1000],
      }}
    >
      <TableCell component="th" scope="row" align="left">
        {index + 1}
      </TableCell>
      <TableCell component="th" scope="row" align="left">
        {user.email}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <Box style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Box style={{
            width: "18px",
            height: "18px",
            border: "1px solid",
            borderRadius: "99px",
            backgroundColor: user.isActivated ?
              theme.palette?.success?.light :
              theme.palette?.error?.light,
          }} />
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <Typography style={{
          color: user.isBlocked ?
            theme.palette?.error?.light :
            theme.palette?.success?.light,
        }}>
          {user.isBlocked ? LockStatus.BLOCK : LockStatus.UNLOCK}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {user.role.name}
      </TableCell>
      <TableCell component="th" scope="row" align="right">
        <UtilsButtonGroup handleGetDetails={handleGetDetails}
                          handleUpdate={handleUpdate}
                          handleRemove={handleRemove}>
          <IconButton
            onClick={() => console.log()}
            aria-label="delete"
            size="small"
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              border: "1px solid",
              borderColor: user.isBlocked ?
                theme.palette?.success?.light :
                theme.palette?.error?.light,
              borderRadius: "11px",
            }}>
            {
              user.isBlocked ?
                <LockOpenIcon fontSize="small"
                              style={{
                                fill: theme.palette?.success?.light,
                              }}
                /> :
                <BlockIcon
                  fontSize="small"
                  style={{
                    fill: theme.palette?.error?.light,
                  }}
                />
            }
          </IconButton>
        </UtilsButtonGroup>
      </TableCell>
    </TableRow>
  );
}
import { useState } from "react";
import { ButtonGroup, IconButton, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export default function UtilsButtonGroup({
                                           handleGetDetails,
                                           handleUpdate,
                                           handleRemove,
                                           clearErrors,
                                           children = null,
                                         }) {
  const theme = useTheme();
  const [openDelete, setOpenDelete] = useState(false);

  if (openDelete) {
    return (
      <ButtonGroup>
        <IconButton aria-label="confirm" onClick={handleRemove}
                    style={{ marginLeft: "5px", marginRight: "5px" }}>
          <DoneIcon style={{ fill: theme.palette.success.dark }} />
        </IconButton>
        <IconButton aria-label="close" onClick={() => {
          clearErrors();
          setOpenDelete(false);
        }}
                    style={{ marginLeft: "5px", marginRight: "5px" }}>
          <CloseIcon style={{ fill: theme.palette.error.dark }} />
        </IconButton>
      </ButtonGroup>
    );
  }
  return (
    <ButtonGroup>
      <IconButton
        aria-label="edit"
        size="small"
        onClick={handleGetDetails}
        style={{
          marginLeft: "5px",
          marginRight: "5px",
          border: "1px solid",
          borderColor: theme.palette.grey["300"],
          borderRadius: "11px",
        }}>
        <VisibilityIcon
          fontSize="small"
          style={{ fill: theme.palette.grey["300"] }} />
      </IconButton>
      {children}
      <IconButton
        aria-label="edit"
        size="small"
        onClick={handleUpdate}
        style={{
          marginLeft: "5px",
          marginRight: "5px",
          border: "1px solid",
          borderColor: theme.palette.info.main,
          borderRadius: "11px",
        }}>
        <BorderColorIcon
          fontSize="small"
          style={{ fill: theme.palette.info.main }} />
      </IconButton>
      <IconButton
        onClick={() => setOpenDelete(true)}
        aria-label="delete"
        size="small"
        style={{
          marginLeft: "5px",
          marginRight: "5px",
          border: "1px solid",
          borderColor: theme.palette.error.main,
          borderRadius: "11px",
        }}>
        <DeleteOutlineIcon
          fontSize="small"
          style={{ fill: theme.palette.error.main }} />
      </IconButton>
    </ButtonGroup>
  );
}
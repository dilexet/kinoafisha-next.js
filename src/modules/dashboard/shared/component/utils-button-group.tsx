import { ButtonGroup, IconButton, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function UtilsButtonGroup({ handleGetDetails, handleUpdate, handleRemove, children = null }) {
  const theme = useTheme();
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
        onClick={handleRemove}
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
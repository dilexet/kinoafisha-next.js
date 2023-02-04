import { Box, Button, useTheme } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export default function FormButtonGroup({ handleCancel, isLoading }: { handleCancel: () => void; isLoading: boolean }) {
  const theme = useTheme();
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "20px",
      }}>
      <Button
        variant="outlined"
        type="submit"
        disabled={isLoading}
        style={{
          color: theme.palette.success.light,
          borderColor: theme.palette.success.dark,
          borderRadius: "11px",
          padding: "7px 14px",
        }}
        startIcon={<SaveIcon style={{ fill: theme.palette.success.dark }} />}>
        Save
      </Button>
      <Button
        onClick={handleCancel}
        disabled={isLoading}
        variant="outlined"
        style={{
          color: theme.palette.error.light,
          borderColor: theme.palette.error.dark,
          borderRadius: "11px",
          padding: "7px 14px",
        }}
        startIcon={<CancelIcon style={{ fill: theme.palette.error.dark }} />}>
        Cancel
      </Button>
    </Box>
  );
}
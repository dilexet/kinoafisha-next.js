import { Box, Typography, useTheme } from "@mui/material";
import { RowNumbersProps } from "@/modules/shared/types/row-numbers-props";

export default function RowNumbers({ numberRow }: RowNumbersProps) {
  const theme = useTheme();
  return (
    <Box
      style={{
        margin: "0 10px",
      }}>
      <Typography
        style={{
          fontSize: "15px",
          fontWeight: "400",
          color: theme.palette.mode === "dark" ?
            "rgba(255, 255, 255, 0.35)" :
            "rgba(0, 0, 0, 0.35)",
        }}>
        {numberRow}
      </Typography>
    </Box>
  );
};
import { Box, Typography } from "@mui/material";

export default function ModalLayout({ title, error, children }) {
  return (
    <Box
      style={{
        width: "100%",
      }}
    >
      <Box>
        <Typography
          style={{
            fontSize: "2em",
            fontWeight: "900",
            opacity: "0.9",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box style={{ marginTop: "10px", width: "300px" }}>
        <Typography
          color='error'
          style={{
            fontSize: "1.125em",
            fontWeight: "500",
            opacity: "0.9",
          }}
        >
          {error?.toString() ?? ""}
        </Typography>
      </Box>
      <Box
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

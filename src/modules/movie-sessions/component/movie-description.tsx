import { Box, Typography } from "@mui/material";

export default function MovieDescriptionComponent({
  movieName,
  movieDescription,
}) {
  return (
    <Box
      style={{
        flex: "0 0 auto",
        width: "30%",
        maxWidth: "30%",
        minWidth: "300px",
        paddingLeft: "70px",
        boxSizing: "border-box",
      }}
    >
      <Box>
        <Typography
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {movieName}
        </Typography>
      </Box>
      <Box style={{ margin: "10px 0" }}>
        <Typography
          style={{
            fontSize: "16px",
            fontWeight: "400",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {movieDescription}
        </Typography>
      </Box>
    </Box>
  );
}

import { Box, Typography } from "@mui/material";

export function CountriesContent({ countries }) {
  return (
    <Box style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
    }}>
      {
        countries?.map((country) => (
          <Box key={country?.id} style={{
            border: "1px solid rgba(199, 199, 199, 0.8)",
            borderRadius: "99px",
            padding: "5px 15px",
            margin: "0 10px 10px",
          }}>
            <Typography style={{
              color: "rgba(199, 199, 199, 0.8)",
              fontSize: "1em",
              fontWeight: "500",
            }}>
              {country?.name}
            </Typography>
          </Box>
        ))
      }
    </Box>
  );
}
import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Link from "next/link";

export default function HomeTitle() {
  return (
    <Box style={{
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      marginTop: "10px",
    }}>
      <Box>
        <Typography style={{
          fontSize: "3.1235em",
          fontWeight: "700",
          opacity: "0.8",
        }}>
          Poster
        </Typography>
      </Box>
      <Box style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: "25px 0 15px",
      }}>
        <Box>
          <CalendarTodayIcon style={{
            fontSize: "25px",
          }} />
        </Box>
        <Box style={{marginLeft: "20px"}}>
          <Typography component={Link} href="/afisha" style={{
            fontSize: "1.125em",
            fontWeight: "500",
            opacity: "0.8",
            borderBottom: "1px solid",
            textDecoration: "none",
            color: "rgb(255, 255, 255)",
          }}>
            Session schedule
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
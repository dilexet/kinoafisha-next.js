import { HallWorkLoadProps } from "@/modules/movie-sessions/type/props";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function HallWorkLoadComponent({
  hallWorkLoad,
}: HallWorkLoadProps) {
  return (
    <Box
      style={{
        marginTop: "20px",
        marginBottom: 0,
        height: "6px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      {hallWorkLoad <= 0 ? (
        <Box
          style={{ paddingTop: "20px", position: "relative", width: "100%" }}
        >
          <LockIcon style={{ fill: "rgb(212, 7, 84)", fontSize: "50px" }} />
          <Typography
            style={{
              fontSize: "1.125em",
              fontWeight: "500",
              top: 30,
              left: 0,
              position: "absolute",
              color: "rgb(255, 255, 255)",
              opacity: "0.5",
            }}
          >
            There are not seats
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            style={{
              display: "inline-block",
              flex: "auto",
              height: "100%",
              width: `${100 - hallWorkLoad}%`,
              background: getColorByHallWorkLoad(hallWorkLoad),
            }}
          />
          <Box
            style={{
              display: "inline-block",
              flex: "auto",
              height: "100%",
              width: `${hallWorkLoad}%`,
              background: "rgb(255, 255, 255, 0.15)",
            }}
          />
        </>
      )}
    </Box>
  );
}

export function getColorByHallWorkLoad(hallWorkLoad: number): string {
  if (hallWorkLoad >= 60) {
    return "rgb(63, 182, 24)";
  }
  if (hallWorkLoad >= 40) {
    return "rgb(248, 145, 0)";
  }

  return "rgb(238, 32, 77)";
}

import { SessionCardInfoProps } from "@/modules/movie-sessions/type/props";
import { Box, Typography } from "@mui/material";
import moment from "moment/moment";

export function SessionCardInfo({ session }: SessionCardInfoProps) {
  return (
    <Box
      style={{
        minHeight: "120px",
      }}
    >
      <Box
        style={{
          margin: "10px 0 20px",
        }}
      >
        <Typography
          style={{
            fontSize: "1.625em",
            fontWeight: "400",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {moment(session.startDate).format("HH:mm")}
        </Typography>
        <Typography
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {moment(session.startDate).format("dddd, MMMM DD")}
        </Typography>
      </Box>
      {session?.hallWorkLoad <= 0 ? (
        <></>
      ) : (
        <Box>
          <Typography
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "rgba(255, 255, 255, 0.35)",
            }}
          >
            {session.hallName}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

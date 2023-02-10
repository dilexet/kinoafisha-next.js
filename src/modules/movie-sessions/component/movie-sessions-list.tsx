import { MovieSessionsListComponentProps } from "@/modules/movie-sessions/type/props";
import { Box, Typography } from "@mui/material";
import { SessionCard } from "@/modules/movie-sessions/component/session-card";

export default function MovieSessionsListComponent({ cinemaSessions }: MovieSessionsListComponentProps) {
  return (
    <Box>
      {
        cinemaSessions && cinemaSessions?.length > 0 ?
          cinemaSessions.map((cinemaSession, index) => (
            <Box key={index} style={{
              display: "flex",
              padding: "35px 0",
              color: "rgba(255, 255, 255, 0.8)",
              borderTop: "5px solid rgba(255, 255, 255, 0.15)",
            }}>
              <SessionCard cinemaSession={cinemaSession} />
            </Box>
          )) :
          <Box>
            <Typography style={{
              fontSize: "1.47em",
              fontWeight: "700",
              color: "rgba(255, 255, 255, 0.8)",
            }}>
              Not sessions found
            </Typography>
          </Box>
      }
    </Box>
  );
}
import { SessionCardProps } from "@/modules/movie-sessions/type/props";
import { Box, Grid, Typography } from "@mui/material";
import { SessionCardInfo } from "./session-card-info";
import styles from "@/styles/session-card.module.css";
import HallWorkLoadComponent from "@/modules/movie-sessions/component/hall-work-load";
import { useRouter } from "next/navigation";
import { session_booking } from "@/modules/shared/constants/app-routes";

export function SessionCard({ cinemaSession }: SessionCardProps) {
  const router = useRouter();
  return (
    <Box style={{
      width: "100%",
    }}>
      <Grid container style={{
        width: "100%",
      }}>
        <Grid item xs={4}
              style={{
                maxWidth: "220px",
              }}>
          <Box>
            <Typography style={{
              fontSize: "1.47em",
              fontWeight: "700",
              color: "rgba(255, 255, 255, 0.8)",
            }}>
              {cinemaSession?.cinema?.name}
            </Typography>
            <Box style={{ margin: "10px 0" }}>
              <Typography component="span" style={{
                fontSize: "1em",
                fontWeight: "400",
                color: "rgba(255, 255, 255, 0.35)",
              }}>
                {cinemaSession?.cinema?.address}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            {
              cinemaSession?.sessions?.map((session, index) => (
                <Grid item xs={3} sm={3} md={3} lg={2} key={index}
                      onClick={() => {
                        if (session?.hallWorkLoad > 0) {
                          router.push(session_booking(session?.id));
                        }
                      }}
                      style={{
                        margin: "5px",
                        padding: "20px",
                      }}
                      aria-disabled={session?.hallWorkLoad <= 0}
                      className={styles.session_card}>
                  <SessionCardInfo session={session} />
                  <HallWorkLoadComponent hallWorkLoad={session.hallWorkLoad} />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}


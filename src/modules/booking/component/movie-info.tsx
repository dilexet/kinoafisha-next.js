import { SessionMovieInfoComponentProps } from "@/modules/booking/types/props";
import { Box, CardMedia, Typography } from "@mui/material";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment/moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { convertMinutesToHoursWithMinutes } from "@/modules/dashboard/shared/utils/date-formater";

export default function MovieInfoComponent({ session }: SessionMovieInfoComponentProps) {
  return (
    <Box
      style={{
        padding: "20px 0", display: "flex",
      }}>
      <Box
        style={{
          flex: "0 0 auto", margin: "10px 20px 10px 0",
        }}>
        <CardMedia
          component="img"
          style={{
            width: "100px",
            height: "160px",
            borderRadius: "5px",
            position: "relative",
            overflow: "hidden",
            opacity: "0.9",
          }}
          image={IMAGE_URL(session?.movie.posterURL)}
          alt={session?.movie?.name}
        />
      </Box>
      <Box
        style={{
          flex: "1 1 auto", marginLeft: "20px",
        }}>
        <Typography
          style={{
            fontSize: "2.25em", fontWeight: "700", lineHeight: "34px", marginBottom: "6px", opacity: "0.8",
          }}>
          {session?.movie?.name}
        </Typography>
        <Box
          style={{
            display: "inline-block", verticalAlign: "top",
          }}>
          <Box
            style={{
              margin: "10px 0", display: "inline-flex", verticalAlign: "top", alignItems: "center",
            }}>
            <Box
              style={{
                display: "flex", paddingRight: "12px",
              }}>
              <LocationOnIcon sx={{ fontSize: 26 }} style={{
                color: "rgba(255, 255, 255, 0.35)",
              }} />
            </Box>
            <Box>
              <Typography
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  color: "rgba(255, 255, 255, 0.8)",
                }}>
                <span>
                  {session?.hall?.cinemaName}
                  &nbsp;in&nbsp;
                  {session?.hall?.address}
                </span>
                <span
                  style={{
                    color: "rgba(255, 255, 255, 0.35)",
                  }}>
                  &nbsp;/&nbsp;
                </span>
                <span>
                  {session?.hall?.name}
                </span>
              </Typography>
            </Box>
          </Box>
          <Box
            style={{
              margin: "10px 0",
              display: "inline-flex",
              verticalAlign: "top",
              alignItems: "center",
            }}>
            <Box
              style={{
                display: "flex",
              }}>
              <CalendarTodayIcon style={{
                color: "rgba(255, 255, 255, 0.35)",
                fontSize: "26px",
              }} />
            </Box>
            <Box
              style={{
                margin: "0 15px",
              }}>
              <Typography
                style={{
                  fontSize: "1em",
                  fontWeight: "400",
                  color: "rgba(255, 255, 255, 0.8)",
                }}>
                <span>
                  {moment(session?.startDate).format("dddd, MMMM DD")}
                </span>
                <span>
                  &nbsp;/&nbsp;
                </span>
                <span>
                  {moment(session?.startDate).format("HH:mm")}
                </span>
                <span>
                  &nbsp;-&nbsp;
                </span>
                <span>
                  {moment(session?.endDate).format("HH:mm")}
                </span>
              </Typography>
            </Box>
          </Box>
          <Box style={{
            margin: "10px 0",
            display: "inline-flex",
            verticalAlign: "top",
            alignItems: "center",
            width: "100%",
          }}>
            <Box
              style={{
                display: "flex",
              }}>
              <AccessTimeIcon style={{
                color: "rgba(255, 255, 255, 0.35)",
                fontSize: "26px",
              }} />
            </Box>
            <Box style={{
              margin: "0 15px",
            }}>
              <Typography
                style={{
                  fontSize: "1em",
                  fontWeight: "400",
                  color: "rgba(255, 255, 255, 0.8)",
                }}>
                <span>
                  {`${session?.movie?.durationInMinutes} m`}
                </span>
                <span>
                  &nbsp;=&nbsp;
                </span>
                <span>
                  {convertMinutesToHoursWithMinutes(session?.movie?.durationInMinutes)}
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
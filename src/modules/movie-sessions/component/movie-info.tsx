import { Box, CardMedia, Skeleton, Typography } from "@mui/material";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";
import { MovieInfoComponentProps } from "@/modules/movie-sessions/type/props";

export default function MovieInfoComponent({ movie }: MovieInfoComponentProps) {
  return (
    <Box
      style={{
        display: "flex",
        marginBottom: "40px",
      }}
    >
      <Box
        style={{
          flex: "0 0 auto",
          width: "190px",
        }}>
        {
          movie?.posterURL ? <CardMedia
              component="img"
              style={{
                width: "120px", height: "180px",
                borderRadius: "12px",
                position: "relative",
                overflow: "hidden",
                opacity: "0.9", display: "block",
              }}
              image={IMAGE_URL(movie?.posterURL)}
              alt={movie?.name}
            /> :
            <Skeleton variant="rounded" width={120} height={180} />
        }
      </Box>
      <Box style={{
        color: "rgba(255, 255, 255, 0.8)",
      }}>
        <Typography style={{
          fontSize: "40px",
          fontWeight: "700",
        }}>
          {movie?.name}
        </Typography>
        <Box
          style={{
            margin: "15px 0",
            color: "rgba(255, 255, 255, 0.35)",
          }}>
          <Typography style={{
            fontSize: "1em",
            fontWeight: "400",
          }}>
           <span>
              {movie?.genres.map(x => x.name).join(", ")}
           </span>
            <span>
            &nbsp;/&nbsp;
            </span>
            <span>
            {movie?.countries.map(x => x.name).join(", ")}
            </span>
            <span>
            &nbsp;/&nbsp;
            </span>
            <span>
              {`${movie?.durationInMinutes} min`}
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
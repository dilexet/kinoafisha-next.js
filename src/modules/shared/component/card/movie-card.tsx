import {
  Card, CardMedia, CardContent,
  Typography, CardActions, Button, Box, Skeleton,
} from "@mui/material";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";
import { CountriesContent } from "@/modules/shared/component/card/countries-content";
import { GenresContent } from "@/modules/shared/component/card/genres-content";
import { MovieCardProps } from "@/modules/shared/types/movie-card-props";
import { useRouter } from "next/navigation";
import { movie_sessions } from "@/modules/shared/constants/app-routes";

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  return (
    <Card
      style={{
        backgroundImage: "none",
        background: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
        boxShadow: "none",
        margin: "10px 0",
        minHeight: "725px",
      }}>
      {
        movie?.posterURL ?
          <CardMedia
            component="img"
            style={{
              width: "240px", height: "360px",
              borderRadius: "22px",
              opacity: "0.9", display: "block",
            }}
            image={IMAGE_URL(movie?.posterURL)}
            alt={movie?.name}
          /> :
          <Skeleton variant="rounded" width={240} height={360} />
      }
      <CardContent
        style={{
          margin: "5% 0",
          width: "98%",
          flexGrow: 1,
        }}
      >
        <CountriesContent countries={movie?.countries?.slice(0, 2)} />
        <Box style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10% 0 15%",
        }}>
          <Typography style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "1.375em",
            fontWeight: "700",
            textAlign: "center",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}>
            {movie?.name}
          </Typography>
        </Box>
        <GenresContent genres={movie?.genres?.slice(0, 2)} />
      </CardContent>
      <CardActions
        style={{
          margin: "auto 0",
        }}>
        <Button
          variant="outlined"
          onClick={() => router.push(movie_sessions(movie.id))}
          style={{
            borderRadius: "22px",
            border: "2px solid #D40754",
            color: "inherit",
            textDecoration: "none",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "10px 30px",
          }}
        >
          Buy ticket
        </Button>
      </CardActions>
    </Card>
  );
}
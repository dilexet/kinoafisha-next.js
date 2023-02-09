import {
  Card, CardMedia, CardContent, useTheme,
  Typography, CardActions, Button, Box, Stack, Skeleton,
} from "@mui/material";
import { MovieType } from "@/modules/home/types/movie-type";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";
import { CountriesContent } from "@/modules/home/component/card/countries-content";
import { GenresContent } from "@/modules/home/component/card/genres-content";
import { generateEmptyArray } from "@/modules/shared/utils/generate-empty-array";
import React from "react";

// TODO: move it
export interface MovieCardProps {
  movie: MovieType;
}

export function MovieCardSkeleton() {
  return (
    <Stack spacing={1} style={{
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
      <Skeleton variant="rounded" width={240} height={360} />
      <Box style={{
        width: "98%",
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "space-between",
        flexDirection: "column",
        margin: "60px 0",
      }}>
        <Skeleton variant="rounded" width={80} height={40} />
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rounded" width={80} height={40} />
      </Box>
      <Box>
        <Skeleton variant="rounded" width={150} height={50} />
      </Box>
    </Stack>
  );
}

// TODO: move it
export default function MovieCard({ movie }: MovieCardProps) {
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
      <CardMedia
        component="img"
        style={{
          width: "240px", height: "360px",
          borderRadius: "22px",
          opacity: "0.9", display: "block",
        }}
        image={IMAGE_URL(movie?.posterURL)}
        alt={movie?.name}
      />
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
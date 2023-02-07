import { Typography, Grid, Box, Avatar } from "@mui/material";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import { MovieDetailsProps } from "@/modules/dashboard/movie-management/types/movie-details-props";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";

export default function MovieDetails({
  gridItems,
  movieState,
}: MovieDetailsProps) {
  return (
    <ModalLayout
      title='Show movie details'
      error={movieState?.errorInfo?.message}
    >
      <Grid
        container
        spacing={3}
        direction='column'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid
          item
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt='Poster'
            sx={{ width: 228, height: 228 }}
            src={IMAGE_URL(movieState?.movie?.posterURL)}
          />
        </Grid>
        {gridItems?.map((item, index) => (
          <Grid
            item
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{
                fontWeight: "500",
                fontSize: "1.625em",
                opacity: "0.8",
              }}
            >
              {item.property}:&nbsp;
            </Typography>
            <Typography
              style={{
                fontWeight: "500",
                fontSize: item.value.toString().length < 20 ? "1.625em" : "1em",
                textAlign: "start",
              }}
            >
              {item.value}
            </Typography>
          </Grid>
        ))}
        <Grid
          item
          style={{
            display: "inline-flex",
          }}
        >
          <Typography
            style={{
              fontWeight: "500",
              fontSize: "1.625em",
              opacity: "0.8",
            }}
          >
            Genres:&nbsp;
          </Typography>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {movieState?.movie?.genres?.map((genre) => (
              <Box
                key={genre.id}
                style={{
                  border: "1px solid",
                  borderRadius: "99px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px 10px",
                  margin: "0 5px",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "500",
                    fontSize: "1.125em",
                  }}
                >
                  {genre.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          style={{
            display: "inline-flex",
          }}
        >
          <Typography
            style={{
              fontWeight: "500",
              fontSize: "1.625em",
              opacity: "0.8",
            }}
          >
            Countries:&nbsp;
          </Typography>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {movieState?.movie?.countries?.map((country) => (
              <Box
                key={country.id}
                style={{
                  border: "1px solid",
                  borderRadius: "99px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px 10px",
                  margin: "0 5px",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "500",
                    fontSize: "1.125em",
                  }}
                >
                  {country.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </ModalLayout>
  );
}

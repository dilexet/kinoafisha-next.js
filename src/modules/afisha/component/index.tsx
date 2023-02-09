import { AfishaComponentProps } from "@/modules/afisha/types/props";
import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "@/modules/shared/component/card/movie-card";
import SearchInputContainer from "@/modules/dashboard/shared/container/search-input-container";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import Loading from "@/modules/loading";

export default function AfishaComponent({ movies, movieState, handleSearch }: AfishaComponentProps) {
  return (
    <Box style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      flexWrap: "wrap",
      overflow: "auto",
      height: "100%",
    }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          padding: "35px 0",
        }}>
        <Box>
          <Typography variant="h1"
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "3.125em",
                        fontWeight: "700",
                      }}>
            Cinema poster
          </Typography>
        </Box>
        <Box>
          <SearchInputContainer loadData={handleSearch} />
        </Box>
      </Box>
      {
        movieState?.loadingStatusGetAll === LOADING_STATUSES.LOADING ? <Loading /> : <></>
      }
      <Box style={{ width: "90%" }}>
        <Grid container spacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
          {
            movies?.length > 0 ?
              movies?.map((movie, index) => (
                <Grid item xs={2} sm={4} md={4} lg={3} key={index}>
                  <MovieCard movie={movie} />
                </Grid>
              )) :
              <Box style={{
                width: "100%",
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Typography variant="h1"
                            style={{
                              color: "rgba(255, 255, 255, 0.7)",
                              fontSize: "4.125em",
                              fontWeight: "900",
                            }}>
                  Not found :(
                </Typography>
              </Box>
          }
        </Grid>
      </Box>
    </Box>
  );
}
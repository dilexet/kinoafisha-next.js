import { Box, Tab } from "@mui/material";
import SwiperComponent from "@/modules/home/component/swiper";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import HomeTitle from "@/modules/home/component/home-title";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import MoviesSwiper from "@/modules/home/component/movies-swiper";
import { TabValue } from "@/modules/home/types/tab-value";

export default function HomeComponent({ imageState, movieState, movies, slidesPerView, tabValue, handleChange }) {
  return (
    <Box style={{ margin: "5px 0" }}>
      <SwiperComponent images={imageState?.images} slidesPerView={slidesPerView} />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{
            display: "flex", justifyContent: "center",
          }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: "90%" }}>
              <HomeTitle />
              <TabList onChange={handleChange}
                       indicatorColor="secondary">
                <Tab label="Now at the cinema" value={TabValue.ONE}
                     style={{
                       color: tabValue === TabValue.ONE ?
                         "rgba(255, 255, 255, 0.8)" :
                         "rgba(144, 144, 143, 0.8)",
                     }}
                />
                <Tab label="Soon" value={TabValue.TWO}
                     style={{
                       color: tabValue === TabValue.TWO ?
                         "rgba(255, 255, 255, 0.8)" :
                         "rgba(144, 144, 143, 0.8)",
                     }}
                />
              </TabList>
            </Box>
          </Box>
          <TabPanel value="1">
            <MoviesSwiper
              isLoading={
                movieState?.loadingStatusGetAll === LOADING_STATUSES.PENDING ||
                movieState?.loadingStatusGetAll === LOADING_STATUSES.LOADING
              }
              movies={movies} slidesPerView={slidesPerView} />
          </TabPanel>
          <TabPanel value="2">
            <MoviesSwiper
              isLoading={
                movieState?.loadingStatusGetAll === LOADING_STATUSES.PENDING ||
                movieState?.loadingStatusGetAll === LOADING_STATUSES.LOADING
              }
              movies={movies} slidesPerView={slidesPerView} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

import { Box, Tab } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { ImageUploadState } from "@/modules/upload-image/reducer";
import SwiperComponent from "@/modules/home/component/swiper";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { SyntheticEvent, useEffect, useState } from "react";
import HomeTitle from "@/modules/home/component/home-title";
import { MovieFilterState, selectAll } from "@/modules/home/reducer";
import MovieCard, { MovieCardSkeleton } from "@/modules/home/component/card/movie-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Scrollbar } from "swiper";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { generateEmptyArray } from "@/modules/shared/utils/generate-empty-array";
import { moviesFilterGetAllAsync } from "@/modules/home/action";

export enum TabValue {
  ONE = "1",
  TWO = "2"
}

export default function HomeComponent() {
  const dispatch = useAppDispatch();
  const imageState = useAppSelector<ImageUploadState>((x) => x.upload_image_reducer);
  const movieState = useAppSelector<MovieFilterState>((x) => x.movie_filter_reducer);
  const movies = useAppSelector(selectAll);

  const [tabValue, setTabValue] = useState(TabValue.ONE);

  const handleChange = async (event: SyntheticEvent, newValue) => {
    if (newValue === TabValue.ONE) {
      await dispatch(moviesFilterGetAllAsync({ onlyPopular: true }));
    } else {
      await dispatch(moviesFilterGetAllAsync({ onlyFuture: true }));
    }
    setTabValue(newValue);
  };

  const [slidesPerView, setSlidesPerView] = useState(window.innerWidth <= 960 ? "sm" : "lg");
  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth <= 960) {
        setSlidesPerView("sm");
      } else {
        setSlidesPerView("lg");
      }
    };
  }, []);

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

export function MoviesSwiper({ isLoading, movies, slidesPerView }) {
  return (
    <Swiper
      modules={[Pagination, Scrollbar, Navigation, Autoplay]}
      spaceBetween={5}
      slidesPerView={slidesPerView === "sm" ? 3 : 6}
      loop={true}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {
        isLoading ?
          generateEmptyArray(10, 0).map((value, index) => (
            <SwiperSlide key={index}>
              <MovieCardSkeleton />
            </SwiperSlide>
          )) :
          movies?.map((movie) => (
            <SwiperSlide key={movie?.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))
      }
    </Swiper>
  );
}
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { generateEmptyArray } from "@/modules/shared/utils/generate-empty-array";
import MovieCard from "@/modules/shared/component/card/movie-card";
import MovieCardSkeleton from "@/modules/shared/component/card/movie-card-skeleton";

export default function MoviesSwiper({ isLoading, movies, slidesPerView }) {
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
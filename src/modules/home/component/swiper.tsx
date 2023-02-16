import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Scrollbar } from "swiper";
import Image from "next/image";

export default function SwiperComponent({ images, slidesPerView }) {
  return (
    <Box>
      <Swiper
        modules={[Pagination, Scrollbar, Autoplay]}
        spaceBetween={1}
        slidesPerView={slidesPerView === "sm" ? 2 : 4}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt='Poster'
              quality={100}
              width={500}
              height={700}
              style={{
                objectFit: "contain",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

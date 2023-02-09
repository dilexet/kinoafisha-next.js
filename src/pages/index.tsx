import Head from "next/head";
import HomeComponent from "@/modules/home/component";
import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { imagesGetAllAsync } from "@/modules/upload-image/action";
import { moviesFilterGetAllAsync } from "@/modules/home/action";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { selectAll } from "@/modules/home/reducer";
import { SyntheticEvent, useEffect, useState } from "react";
import { TabValue } from "@/modules/home/types/tab-value";

export default function Home() {
  const dispatch = useAppDispatch();
  const imageState = useAppSelector((x) => x.upload_image_reducer);
  const movieState = useAppSelector((x) => x.movie_filter_reducer);
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
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main style={{ overflow: "auto" }}>
        <HomeComponent movies={movies} movieState={movieState}
                       imageState={imageState} handleChange={handleChange}
                       slidesPerView={slidesPerView} tabValue={tabValue} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async () => {
    await store.dispatch(imagesGetAllAsync());
    await store.dispatch(moviesFilterGetAllAsync({ onlyPopular: true }));
    return { props: {} };
  });
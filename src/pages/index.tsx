import Head from "next/head";
import HomeComponent from "@/modules/home/component";
import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { imagesGetAllAsync } from "@/modules/upload-image/action";
import { moviesFilterGetAllAsync } from "@/modules/home/action";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { selectAll } from "@/modules/home/reducer";

export default function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectAll);
  const movieState = useAppSelector((x) => x.movie_filter_reducer);
  const imageState = useAppSelector((x) => x.upload_image_reducer);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <HomeComponent />
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
import Head from "next/head";
import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { moviesAfishaGetAllAsync, moviesAfishaUploadAsync } from "@/modules/afisha/action";
import { useAppSelector, useAppDispatch } from "@/modules/shared/redux/hooks";
import { MovieAfishaState, selectAll } from "@/modules/afisha/reducer";
import AfishaComponent from "@/modules/afisha/component";
import { useCallback, useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import Loading from "@/modules/loading";

export const pageItemLimit = 6;
export const pageStart = 1;

export default function Afisha() {
  const dispatch = useAppDispatch();
  const movieState = useAppSelector<MovieAfishaState>((x) => x.movie_afisha_reducer);
  const movies = useAppSelector(selectAll);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(pageStart);
  const [fetching, setFetching] = useState(false);

  const handleSearch = async (search) => {
    await dispatch(moviesAfishaGetAllAsync({ page: pageStart, limit: pageItemLimit, movie: search }));
    setSearchQuery(search);
    setCurrentPage(pageStart);
  };

  const onScroll = useCallback((event) => {
    if (event?.target?.documentElement?.scrollHeight -
      (event?.target?.documentElement?.scrollTop + window.innerHeight) < 50) {
      if ((movieState?.loadingStatusUpload === LOADING_STATUSES.IDLE ||
        movieState?.loadingStatusUpload === LOADING_STATUSES.PENDING) && movieState?.isFull === false) {
        setFetching(true);
      }
    }
  }, [movieState?.isFull, movieState?.loadingStatusUpload]);

  const fetchData = useCallback(async () => {
    await dispatch(moviesAfishaUploadAsync({ page: currentPage + 1, limit: pageItemLimit, movie: searchQuery }));
  }, [currentPage, dispatch, searchQuery]);

  useEffect(() => {
    if (movieState.loadingStatusUpload === LOADING_STATUSES.IDLE && fetching === true) {
      setFetching(false);
      setCurrentPage(prevState => prevState + 1);
    } else if (movieState.loadingStatusUpload === LOADING_STATUSES.FAILED) {
      setFetching(false);
    }
  }, [fetching, movieState.loadingStatusUpload]);

  useEffect(() => {
    if (fetching) {
      fetchData().catch(console.error);
    }
  }, [fetchData, fetching]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll, true);

    return function() {
      document.removeEventListener("scroll", onScroll, true);
    };
  }, [onScroll]);

  console.log(currentPage);
  return (
    <>
      <Head>
        <title>Movie afisha</title>
      </Head>
      <main>
        {
          movieState?.loadingStatusGetAll === LOADING_STATUSES.PENDING ||
          movieState?.loadingStatusGetAll === LOADING_STATUSES.LOADING ?
            <Loading /> :
            <AfishaComponent movies={movies} movieState={movieState} handleSearch={handleSearch} />
        }
      </main>
    </>
  );
}


export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async () => {
    await store.dispatch(moviesAfishaGetAllAsync({ page: pageStart, limit: pageItemLimit }));
    return { props: {} };
  });
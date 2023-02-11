import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { movieWithSessionsGetAsync } from "@/modules/movie-sessions/action";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import Head from "next/head";
import MovieSessionsComponent from "@/modules/movie-sessions/component";
import { useRouter } from "next/navigation";
import { afisha } from "@/modules/shared/constants/app-routes";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import Loading from "@/modules/loading";

export default function MovieSessions() {
  const router = useRouter();
  const movieSessionState = useAppSelector(x => x.movie_sessions_reducer);

  const handleClose = () => {
    router.push(afisha);
  };

  console.log("Afisha");

  return (
    <>
      <Head>
        <title>{`KinoAfisha: ${movieSessionState?.movie?.name}`}</title>
      </Head>
      <main>
        {
          movieSessionState?.loadingStatus === LOADING_STATUSES.PENDING ||
          movieSessionState?.loadingStatus === LOADING_STATUSES.LOADING ?
            <Loading /> :
            <MovieSessionsComponent movieSessionState={movieSessionState} handleClose={handleClose} />
        }
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async ({ query, req }) => {
    const movieId = typeof query?.id === "string" ? query?.id : query?.id[0];
    if (!movieId || !req) {
      return {
        props: { movieId: null },
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    await store.dispatch(movieWithSessionsGetAsync(movieId));
    return { props: { movieId } };
  });
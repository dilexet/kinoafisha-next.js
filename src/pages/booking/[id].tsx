import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { movie_sessions } from "@/modules/shared/constants/app-routes";
import { sessionDetailsGetAsync } from "@/modules/booking/action";
import SessionDetailsComponent from "@/modules/booking/component";

export default function Booking() {
  const router = useRouter();
  const sessionDetailsState = useAppSelector(x => x.session_details_reducer);

  const handleClose = () => {
    router.push(movie_sessions(sessionDetailsState?.session?.movie?.id));
  };

  return (
    <>
      <Head>
        <title>{`Watch: ${sessionDetailsState?.session?.movie?.name}`}</title>
      </Head>
      <main>
        <SessionDetailsComponent sessionDetailsState={sessionDetailsState} handleClose={handleClose} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async ({ query, req }) => {
    const sessionId = typeof query?.id === "string" ? query?.id : query?.id[0];
    if (!sessionId || !req) {
      return {
        props: { sessionId: null },
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    await store.dispatch(sessionDetailsGetAsync(sessionId));
    return { props: { sessionId: sessionId } };
  });
import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { movieWithSessionsGetAsync } from "@/modules/movie-sessions/action";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import Head from "next/head";
import MovieSessionsComponent from "@/modules/movie-sessions/component";
import { useRouter } from "next/navigation";
import { afisha } from "@/modules/shared/constants/app-routes";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import Loading from "@/modules/loading";
import { EVENTS } from "@/modules/movie-sessions/constants/events";
import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getTokenPayload } from "@/modules/authorize/utils/token-service";
import { COMMENTS_GATEWAY } from "@/modules/shared/constants/api-constants";
import { CommentArrayType, CommentType } from "@/modules/movie-sessions/type/comment-types";
import { addComment, getComments } from "@/modules/movie-sessions/reducer";

export default function MovieSessions({ movieId, isAuth, tokenPayload }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const movieSessionState = useAppSelector(x => x.movie_sessions_reducer);
  const [socket, setSocket] = useState<Socket>();
  const [isAuthenticate, setIsAuthenticate] = useState(isAuth);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const handleClose = () => {
    router.push(afisha);
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleAddComment = useCallback(async () => {
    if (!commentText) {
      return;
    }
    const { userProfileId } = getTokenPayload();
    if (!userProfileId) {
      setIsAuthenticate(false);
      return;
    }
    if (!movieId) {
      router.push("/404");
    }
    await socket.emit(EVENTS.COMMENT_ADD, {
      userProfileId: userProfileId,
      movieId: movieId,
      text: commentText,
    });
    setCommentText("");
  }, [commentText, movieId, router, socket]);

  const handleGetComments = useCallback(async () => {
    if (!movieId) {
      router.push("/404");
    }
    await socket.emit(EVENTS.COMMENT_GET_ALL, movieId);
  }, [movieId, router, socket]);


  const addCommentHandler = useCallback(async (comment: CommentType) => {
    if (comment.movieId === movieId && comment?.comment) {
      await dispatch(addComment(comment));
    }
  }, [dispatch, movieId]);

  const getCommentsHandler = useCallback(async (commentArray: CommentArrayType) => {
    console.log(commentArray);
    if (commentArray.movieId === movieId && commentArray?.comments) {
      await dispatch(getComments(commentArray));
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    if (!socket) {
      setSocket(io(COMMENTS_GATEWAY));
    }
  }, [socket]);

  useEffect(() => {
    if (isLoading === true && socket) {
      handleGetComments().catch(console.error);
      setIsLoading(false);
    }
  }, [handleGetComments, isLoading, socket]);

  useEffect(() => {
    if (socket) {
      socket.on(EVENTS.COMMENT_RECEIVE_ADD, addCommentHandler);
      socket.on(EVENTS.COMMENT_RECEIVE_GET_ALL, getCommentsHandler);

      return () => {
        socket.off(EVENTS.COMMENT_RECEIVE_ADD, addCommentHandler);
        socket.off(EVENTS.COMMENT_RECEIVE_GET_ALL, getCommentsHandler);
      };
    }
  }, [addCommentHandler, getCommentsHandler, socket]);


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
            <MovieSessionsComponent movieSessionState={movieSessionState}
                                    handleClose={handleClose}
                                    isAuthenticate={isAuthenticate}
                                    commentText={commentText}
                                    handleCommentTextChange={handleCommentTextChange}
                                    handleAddComment={handleAddComment}
                                    tokenPayload={tokenPayload}
            />
        }
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async ({ query, req, res }) => {
    const movieId = typeof query?.id === "string" ? query?.id : query?.id[0];
    if (!movieId || !req) {
      return {
        props: { movieId: null, isAuth: false, tokenPayload: null },
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    const tokenPayload = getTokenPayload(true, req, res);
    const isAuth = Boolean(tokenPayload && tokenPayload?.userProfileId && tokenPayload?.name);
    await store.dispatch(movieWithSessionsGetAsync(movieId));
    return { props: { movieId, isAuth, tokenPayload } };
  });
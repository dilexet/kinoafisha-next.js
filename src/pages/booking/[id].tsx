import { GetServerSideProps } from "next";
import { wrapper } from "@/modules/shared/redux/store";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { movie_sessions } from "@/modules/shared/constants/app-routes";
import { sessionDetailsGetAsync } from "@/modules/booking/action";
import SessionDetailsComponent from "@/modules/booking/component";
import { io, Socket } from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import { BOOKING_GATEWAY } from "@/modules/shared/constants/api-constants";
import * as uuid from "uuid";
import { useTimer } from "react-timer-hook";
import {
  blockSeat,
  receiveBlockSeat,
  unlockSeat,
} from "@/modules/booking/reducer";
import { EVENTS } from "@/modules/booking/constants/events";
import { Payload, PayloadArray } from "@/modules/booking/types/payload";
import {
  timer_key,
  timerSeconds,
  getTimerSettings,
} from "@/modules/booking/container/timer-settings";
import { setCookie } from "cookies-next";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import Loading from "@/modules/loading";

export default function Booking({ sessionId, userSessionId }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const bookingState = useAppSelector((x) => x.booking_reducer);
  const [socket, setSocket] = useState<Socket>();
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  const handleClose = async () => {
    if (selectedSeatIds?.length > 0) {
      await handleCancelSelectAllSeats(selectedSeatIds);
    }
    router.push(movie_sessions(bookingState?.session?.movie?.id));
  };

  const { seconds, minutes, isRunning, start, restart } = useTimer({
    ...getTimerSettings(selectedSeatIds.length <= 0),
    onExpire: async () => await handleUnlockAllReceive(selectedSeatIds),
  });

  const handleBlock = useCallback(
    async (sessionSeatId: string) => {
      await dispatch(blockSeat(sessionSeatId));
    },
    [dispatch],
  );

  const handleBlockReceive = useCallback(
    async (sessionSeatId: string) => {
      await dispatch(receiveBlockSeat(sessionSeatId));
    },
    [dispatch],
  );

  const handleUnlockReceive = useCallback(
    async (sessionSeatId: string) => {
      await dispatch(unlockSeat(sessionSeatId));
    },
    [dispatch],
  );

  const handleUnlockAllReceive = useCallback(
    async (sessionSeatIds: string[]) => {
      for (const sessionSeatId of sessionSeatIds) {
        await dispatch(unlockSeat(sessionSeatId));
      }
    },
    [dispatch],
  );

  const handleSelectSeat = useCallback(
    async (sessionSeatId: string) => {
      await socket.emit(EVENTS.BLOCK_SEND, {
        sessionSeatId: sessionSeatId,
        sessionId: sessionId,
        userSessionId: userSessionId,
      });
      if (selectedSeatIds?.length <= 0) {
        start();
      }
      setSelectedSeatIds((prevState) => [...prevState, sessionSeatId]);
    },
    [selectedSeatIds?.length, sessionId, socket, start, userSessionId],
  );

  const handleCancelSelectSeat = useCallback(
    async (sessionSeatId: string) => {
      await socket.emit(EVENTS.UNLOCK_SEND, {
        sessionSeatId: sessionSeatId,
        sessionId: sessionId,
        userSessionId: userSessionId,
      });

      if (selectedSeatIds.length <= 1) {
        const time = new Date();
        time.setSeconds(time.getSeconds() + timerSeconds);
        restart(time, false);
      }

      setSelectedSeatIds((prevState) =>
        prevState.filter((value) => value !== sessionSeatId),
      );
    },
    [restart, selectedSeatIds.length, sessionId, socket, userSessionId],
  );

  const handleCancelSelectAllSeats = useCallback(
    async (sessionSeatIds: string[]) => {
      await socket.emit(EVENTS.UNLOCK_ALL_SEND, {
        sessionSeatIds: sessionSeatIds,
        sessionId: sessionId,
        userSessionId: userSessionId,
      });
      setSelectedSeatIds([]);
    },
    [sessionId, socket, userSessionId],
  );

  const blockReceiveHandler = useCallback(
    async (payload: Payload) => {
      if (
        payload?.sessionId === sessionId &&
        payload?.userSessionId !== userSessionId &&
        payload?.sessionSeatId
      ) {
        await handleBlockReceive(payload.sessionSeatId);
      }

      if (
        payload?.sessionId === sessionId &&
        payload?.userSessionId === userSessionId &&
        payload?.sessionSeatId
      ) {
        await handleBlock(payload.sessionSeatId);
      }
    },
    [handleBlock, handleBlockReceive, sessionId, userSessionId],
  );

  const unlockReceiveHandler = useCallback(
    async (payload: Payload) => {
      if (payload?.sessionId === sessionId && payload?.sessionSeatId) {
        await handleUnlockReceive(payload.sessionSeatId);
      }
    },
    [handleUnlockReceive, sessionId],
  );

  const unlockAllReceiveHandler = useCallback(
    async (payload: PayloadArray) => {
      if (payload?.sessionId === sessionId && payload?.sessionSeatIds) {
        await handleUnlockAllReceive(payload.sessionSeatIds);
      }
    },
    [handleUnlockAllReceive, sessionId],
  );

  useEffect(() => {
    const time = new Date();
    const secondsLeft = minutes * 60 + seconds;
    time.setSeconds(time.getSeconds() + secondsLeft);
    setCookie(timer_key, time.toString(), {
      maxAge: secondsLeft,
    });
  }, [minutes, seconds]);

  useEffect(() => {
    if (!socket) {
      setSocket(io(BOOKING_GATEWAY));
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on(EVENTS.BLOCK_RECEIVE, blockReceiveHandler);
      socket.on(EVENTS.UNLOCK_RECEIVE, unlockReceiveHandler);
      socket.on(EVENTS.UNLOCK_ALL_RECEIVE, unlockAllReceiveHandler);

      return () => {
        socket.off(EVENTS.BLOCK_RECEIVE, blockReceiveHandler);
        socket.off(EVENTS.UNLOCK_RECEIVE, unlockReceiveHandler);
        socket.off(EVENTS.UNLOCK_ALL_RECEIVE, unlockAllReceiveHandler);
      };
    }
  }, [
    blockReceiveHandler,
    socket,
    unlockAllReceiveHandler,
    unlockReceiveHandler,
  ]);

  useEffect(() => {
    if (bookingState?.loadingStatus === LOADING_STATUSES.FAILED) {
      router.push("/404");
    }
  }, [bookingState?.loadingStatus, router]);

  return (
    <>
      <Head>
        <title>{`Watch: ${bookingState?.session?.movie?.name ?? ""}`}</title>
      </Head>
      <main>
        {bookingState?.loadingStatus !== LOADING_STATUSES.IDLE ? (
          <Loading />
        ) : (
          <SessionDetailsComponent
            bookingState={bookingState}
            handleClose={handleClose}
            handleSelectSeat={handleSelectSeat}
            handleCancelSelectSeat={handleCancelSelectSeat}
            selectedSeatIds={selectedSeatIds}
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
          />
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query, req }) => {
    const sessionId = typeof query?.id === "string" ? query?.id : query?.id[0];
    if (!sessionId || !req) {
      return {
        props: { sessionId: null, userSessionId: null },
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    const userSessionId = uuid.v4();
    await store.dispatch(sessionDetailsGetAsync(sessionId));
    return { props: { sessionId: sessionId, userSessionId: userSessionId } };
  });

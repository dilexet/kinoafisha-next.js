import Head from "next/head";
import { useRouter } from "next/navigation";
import { wrapper } from "@/modules/shared/redux/store";
import { GetServerSideProps } from "next";
import { sessionDetailsGetAsync } from "@/modules/booking/action";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { afisha, authorize, session_booking } from "@/modules/shared/constants/app-routes";
import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BOOKING_GATEWAY } from "@/modules/shared/constants/api-constants";
import { EVENTS } from "@/modules/booking/constants/events";
import { useTimer } from "react-timer-hook";
import { SeatType } from "@/modules/booking/types/session-details-type";
import ConformBookingComponent from "@/modules/confirm-booking/component";
import { getCookie } from "cookies-next";
import { timer_key } from "@/modules/booking/container/timer-settings";
import { confirmBookingActionAsync } from "@/modules/confirm-booking/action";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { getTokenPayload } from "@/modules/authorize/utils/token-service";

export default function ConfirmBooking({ query }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const bookingState = useAppSelector(x => x.booking_reducer);
  const confirmBookingState = useAppSelector(x => x.confirm_booking_reducer);
  const [socket, setSocket] = useState<Socket>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeat, setSelectedSeats] = useState<SeatType[]>([]);

  const getTimerSettings = () => {
    const timer = getCookie(timer_key);
    if (!timer) {
      return null;
    }
    const time = new Date(timer.toString());
    return {
      expiryTimestamp: time,
      autoStart: true,
    };
  };

  const {
    seconds, minutes, isRunning,
  } = useTimer(
    {
      ...getTimerSettings(),
      onExpire: async () => await handleCancelSelectAllSeats(query.seats),
    });

  const handleClose = async () => {
    await handleCancelSelectAllSeats(query.seats);
    router.push(session_booking(query?.id));
  };

  const handleConfirmOrder = async () => {
    const tokenPayload = getTokenPayload();
    if (!tokenPayload || !tokenPayload.userProfileId) {
      router.push(authorize.Login);
    }
    const seats = typeof query.seats === "string" ? [query.seats] : query.seats;
    await dispatch(confirmBookingActionAsync(
      {
        userProfileId: tokenPayload.userProfileId,
        sessionId: query.id,
        sessionSeatsId: seats,
      },
    ));

  };

  const handleCancelSelectAllSeats = useCallback(async (sessionSeatIds: string[]) => {
    await socket.emit(EVENTS.UNLOCK_ALL_SEND, {
      sessionSeatIds: sessionSeatIds,
      sessionId: query.id,
    });
    router.push(session_booking(query?.id));
  }, [query.id, router, socket]);

  useEffect(() => {
    if (!socket) {
      setSocket(io(BOOKING_GATEWAY));
    }
  }, [socket]);

  useEffect(() => {
    if (confirmBookingState.loadingStatus === LOADING_STATUSES.IDLE) {
      router.push(afisha);
    }
  }, [confirmBookingState.loadingStatus, router]);

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + (minutes * 60 + seconds));
    sessionStorage.setItem("timer", time.toString());
  }, [minutes, seconds]);

  useEffect(() => {
    if (query.seats) {
      let price = 0;
      const selectedSeatArray: SeatType[] = [];
      bookingState?.session?.hall?.rows.forEach((row) => {
        row?.seats.forEach(seat => {
          if (query.seats.indexOf(seat?.sessionSeatId) >= 0) {
            price = price + seat.price;
            selectedSeatArray.push(seat);
          }
        });
      });

      price = +price.toFixed(2);

      setTotalPrice(price);
      setSelectedSeats(selectedSeatArray);
    }
  }, [bookingState?.session?.hall?.rows, query.seats]);

  return (
    <>
      <Head>
        <title>{`Confirm: ${bookingState?.session?.movie?.name}`}</title>
      </Head>
      <main>
        <ConformBookingComponent
          bookingState={bookingState}
          minutes={minutes}
          seconds={seconds}
          isRunning={isRunning}
          handleClose={handleClose}
          selectedSeats={selectedSeat}
          totalPrice={totalPrice}
          handleConfirmOrder={handleConfirmOrder}
          confirmBookingState={confirmBookingState}
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async ({ query, req }) => {
    const sessionId = typeof query?.id === "string" ? query?.id : query?.id[0];
    const seats = query?.seats;
    if (!sessionId || !req || !seats || seats?.length <= 0) {
      return {
        props: { query: null },
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }

    await store.dispatch(sessionDetailsGetAsync(sessionId));

    return { props: { query: query } };
  });
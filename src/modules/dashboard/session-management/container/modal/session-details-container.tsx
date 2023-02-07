import SessionDetails from "@/modules/dashboard/session-management/component/session-details";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { sessionSeatRemoveFromBookingAsync } from "@/modules/dashboard/session-management/action";

export default function SessionDetailsContainer() {
  const dispatch = useAppDispatch();
  const sessionState = useAppSelector((x) => x.session_management_reducer);

  const [gridItems, setGridItems] = useState<GridItemsType[]>(null);

  const handleRemoveFromBooking = async (id: string) => {
    await dispatch(sessionSeatRemoveFromBookingAsync(id));
  };

  useEffect(() => {
    if (!gridItems && sessionState?.loadingStatusGetOne === LOADING_STATUSES.IDLE) {
      const newGridItems = [
        {
          property: "Movie name",
          value: sessionState?.session?.sessionData?.movieName,
        },
        {
          property: "Cinema name",
          value: sessionState?.session?.sessionData?.cinemaName,
        },
        {
          property: "Hall name",
          value: sessionState?.session?.sessionData?.hallName,
        },
        {
          property: "Start date and time",
          value: sessionState?.session?.sessionData?.startDate,
        },
        {
          property: "End date and time",
          value: sessionState?.session?.sessionData?.endDate,
        },
        {
          property: "Price coefficient",
          value: sessionState?.session?.sessionData?.coefficient,
        },
      ];
      setGridItems(newGridItems);
    }
  }, [gridItems, sessionState?.loadingStatusGetOne, sessionState?.session?.sessionData?.cinemaName, sessionState?.session?.sessionData?.coefficient, sessionState?.session?.sessionData?.endDate, sessionState?.session?.sessionData?.hallName, sessionState?.session?.sessionData?.movieName, sessionState?.session?.sessionData?.startDate]);

  return (
    <SessionDetails gridItems={gridItems} sessionState={sessionState}
                    handleRemoveFromBooking={handleRemoveFromBooking} />
  );
}
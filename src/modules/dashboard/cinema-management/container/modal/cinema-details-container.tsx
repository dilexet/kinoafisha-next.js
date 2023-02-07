import { useAppSelector } from "@/modules/shared/redux/hooks";
import CinemaDetails from "@/modules/dashboard/cinema-management/component/cinema-details";
import { useEffect, useState } from "react";
import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function CinemaDetailsContainer() {
  const cinemaState = useAppSelector((x) => x.cinema_management_reducer);

  const [gridItems, setGridItems] = useState<GridItemsType[]>(null);

  useEffect(() => {
    if (
      !gridItems &&
      cinemaState?.loadingStatusGetOne === LOADING_STATUSES.IDLE
    ) {
      const newGridItems = [
        {
          property: "Name",
          value: cinemaState?.cinema?.name,
        },
        {
          property: "Country",
          value: cinemaState?.cinema?.country,
        },
        {
          property: "City",
          value: cinemaState?.cinema?.city,
        },
        {
          property: "Street",
          value: cinemaState?.cinema?.street,
        },
        {
          property: "House number",
          value: cinemaState?.cinema?.houseNumber,
        },
      ];
      setGridItems(newGridItems);
    }
  }, [
    cinemaState?.cinema?.city,
    cinemaState?.cinema?.country,
    cinemaState?.cinema?.houseNumber,
    cinemaState?.cinema?.name,
    cinemaState?.cinema?.street,
    cinemaState?.loadingStatusGetOne,
    gridItems,
  ]);

  return <CinemaDetails gridItems={gridItems} cinemaState={cinemaState} />;
}

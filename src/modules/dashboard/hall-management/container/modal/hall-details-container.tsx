import HallDetails from "@/modules/dashboard/hall-management/component/hall-details";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function HallDetailsContainer() {
  const hallState = useAppSelector((x) => x.hall_management_reducer);

  const [gridItems, setGridItems] = useState<GridItemsType[]>(null);

  useEffect(() => {
    if (
      !gridItems &&
      hallState?.loadingStatusGetOne === LOADING_STATUSES.IDLE
    ) {
      const newGridItems = [
        {
          property: "Name",
          value: hallState?.hall?.name,
        },
        {
          property: "Cinema name",
          value: hallState?.hall?.cinemaName,
        },
      ];
      setGridItems(newGridItems);
    }
  }, [
    gridItems,
    hallState?.hall?.cinemaName,
    hallState?.hall?.name,
    hallState?.loadingStatusGetOne,
  ]);

  return <HallDetails gridItems={gridItems} hallState={hallState} />;
}

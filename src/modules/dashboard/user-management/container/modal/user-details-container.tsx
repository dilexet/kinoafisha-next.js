import { useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import UserDetails from "@/modules/dashboard/user-management/component/user-details";
import { LockStatus } from "@/modules/dashboard/user-management/constants/lock-status";

export default function UserDetailsContainer() {
  const userState = useAppSelector((x) => x.user_management_reducer);

  const [gridItems, setGridItems] = useState<GridItemsType[]>(null);

  useEffect(() => {
    if (
      !gridItems &&
      userState?.loadingStatusGetOne === LOADING_STATUSES.IDLE
    ) {
      const newGridItems = [
        {
          property: "Name",
          value: userState?.user?.name,
        },
        {
          property: "Email",
          value: userState?.user?.email,
        },
        {
          property: "Provider",
          value: userState?.user?.provider,
        },
        {
          property: "Activated",
          value: userState?.user?.isActivated.toString(),
        },
        {
          property: "Block status",
          value: userState?.user?.isBlocked
            ? LockStatus.BLOCK
            : LockStatus.UNLOCK,
        },
        {
          property: "Role",
          value: userState?.user?.role?.name,
        },
      ];
      setGridItems(newGridItems);
    }
  }, [
    gridItems,
    userState?.loadingStatusGetOne,
    userState?.user?.email,
    userState?.user?.isActivated,
    userState?.user?.isBlocked,
    userState?.user?.name,
    userState?.user?.provider,
    userState?.user?.role?.name,
  ]);

  return <UserDetails gridItems={gridItems} userState={userState} />;
}

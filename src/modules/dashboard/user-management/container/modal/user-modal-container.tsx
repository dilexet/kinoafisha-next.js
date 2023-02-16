import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import UserDetailsContainer from "@/modules/dashboard/user-management/container/modal/user-details-container";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { rolesGetAllAsync } from "@/modules/roles/action";
import UserCreateContainer from "@/modules/dashboard/user-management/container/modal/user-create-container";
import UserUpdateContainer from "@/modules/dashboard/user-management/container/modal/user-update-container";
import Loading from "@/modules/loading";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function UserModalContainer({ modalType, handleCloseModal }) {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((x) => x.user_management_reducer);
  const [loadData, setLoadData] = useState(true);

  const fetchData = useCallback(async () => {
    await dispatch(rolesGetAllAsync());
  }, [dispatch]);

  useEffect(() => {
    if (loadData === true && modalType !== ModalActionTypes.DETAILS) {
      fetchData().catch(console.error);
      setLoadData(false);
    } else {
      setLoadData(false);
    }
  }, [fetchData, loadData, modalType]);

  if (loadData || userState?.loadingStatusGetOne === LOADING_STATUSES.LOADING) {
    return <Loading />;
  }

  if (modalType === ModalActionTypes.DETAILS) {
    return <UserDetailsContainer />;
  }

  if (modalType === ModalActionTypes.UPDATE) {
    return <UserUpdateContainer handleCloseModal={handleCloseModal} />;
  }

  if (modalType === ModalActionTypes.CREATE) {
    return <UserCreateContainer handleCloseModal={handleCloseModal} />;
  }
}

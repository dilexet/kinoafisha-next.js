import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import UserDetailsContainer from "@/modules/dashboard/user-management/container/modal/user-details-container";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/modules/shared/redux/hooks";
import { rolesGetAllAsync } from "@/modules/roles/action";
import UserCreateContainer from "@/modules/dashboard/user-management/container/modal/user-create-container";
import UserUpdateContainer from "@/modules/dashboard/user-management/container/modal/user-update-container";

export default function UserModalContainer({ modalType, handleCloseModal }) {
  const dispatch = useAppDispatch();
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

  //TODO: skeleton
  if (loadData) {
    return <div></div>;
  }
  if (modalType === ModalActionTypes.DETAILS) {
    return <UserDetailsContainer />;
  } else {
    if (modalType === ModalActionTypes.UPDATE) {
      return <UserUpdateContainer handleCloseModal={handleCloseModal} />;
    }
    if (modalType === ModalActionTypes.CREATE) {
      return <UserCreateContainer handleCloseModal={handleCloseModal} />;
    }
  }
}

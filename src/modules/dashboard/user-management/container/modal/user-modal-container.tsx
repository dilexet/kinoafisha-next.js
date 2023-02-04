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

  const fetchData = useCallback(
    async () => {
      await dispatch(rolesGetAllAsync());
    },
    [dispatch],
  );

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
    return (
      <UserDetailsContainer />
    );
  } else {
    if (modalType === ModalActionTypes.UPDATE) {
      const userUpdateFields = [
        {
          id: "name",
          name: "name",
          label: "Name",
          type: "text",
        },
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "text",
        },
      ];
      return (
        <UserUpdateContainer handleCloseModal={handleCloseModal} userUpdateFields={userUpdateFields} />
      );
    }
    if (modalType === ModalActionTypes.CREATE) {
      const userCreateFields = [
        {
          id: "name",
          name: "name",
          label: "Name",
          type: "text",
        },
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "text",
        },
        {
          id: "password",
          name: "password",
          label: "Password",
          type: "password",
        },
      ];

      return (
        <UserCreateContainer handleCloseModal={handleCloseModal} userCreateFields={userCreateFields} />
      );
    }
  }
}
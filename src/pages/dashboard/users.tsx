import { DashboardPageLayout } from "@/pages/dashboard/index";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import { clearErrors, selectAll } from "@/modules/dashboard/user-management/reducer";
import { userGetAllActionAsync } from "@/modules/dashboard/user-management/action";
import TableManagementComponent from "@/modules/dashboard/shared/component/table-management-component";
import UserTableHead from "@/modules/dashboard/user-management/component/user-table-head";
import UserTableBody from "@/modules/dashboard/user-management/component/user-table-body";
import Modal from "@/modules/dashboard/shared/component/modal";
import UserModalContainer from "@/modules/dashboard/user-management/container/modal/user-modal-container";

function Users() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAll);
  const userState = useAppSelector((x) => x.user_management_reducer);

  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(ModalActionTypes.DETAILS);

  const handleCloseModal = async () => {
    setOpenModal(false);
    await dispatch(clearErrors());
  };

  const handleOpenModal = async (modalType: string) => {
    setModalType(modalType);
    setOpenModal(true);
    await dispatch(clearErrors());
  };

  const loadUsers = async (searchQuery = "") => {
    await dispatch(userGetAllActionAsync(searchQuery));
  };

  const fetchData = useCallback(
    async () => {
      await dispatch(userGetAllActionAsync(null));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isLoading === true) {
      fetchData().catch(console.error);
      setIsLoading(false);
    }
  }, [fetchData, isLoading]);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <main>
        <TableManagementComponent
          title="Users"
          loadData={loadUsers}
          handleOpenModal={handleOpenModal}
          loadingStatus={userState?.loadingStatusGetAll}
          errorMessage={userState?.errorInfo?.message}
          TableHead={<UserTableHead />}
          TableBody={<UserTableBody users={users} handleOpenModal={handleOpenModal} />}
        />
        <Modal
          openModal={openModal}
          handleCloseModal={handleCloseModal}>
          <UserModalContainer modalType={modalType} handleCloseModal={handleCloseModal} />
        </Modal>
      </main>
    </>
  );
}


Users.getLayout = DashboardPageLayout;

export default Users;
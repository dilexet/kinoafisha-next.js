import { DashboardPageLayout } from "./";
import Head from "next/head";
import TableManagementComponent from "@/modules/dashboard/shared/component/table-management-component";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import {
  clearErrors,
  selectAll,
} from "@/modules/dashboard/session-management/reducer";
import { sessionGetAllActionAsync } from "@/modules/dashboard/session-management/action";
import SessionTableHead from "@/modules/dashboard/session-management/component/session-table-head";
import SessionTableBody from "@/modules/dashboard/session-management/component/session-table-body";
import SessionModalContainer from "@/modules/dashboard/session-management/container/modal/session-modal-container";
import Modal from "@/modules/dashboard/shared/component/modal";

function Sessions() {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(selectAll);
  const sessionState = useAppSelector((x) => x.session_management_reducer);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(ModalActionTypes.DETAILS);
  const [isLoading, setIsLoading] = useState(true);

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
    await dispatch(sessionGetAllActionAsync(searchQuery));
  };

  const fetchData = useCallback(async () => {
    await dispatch(sessionGetAllActionAsync(null));
  }, [dispatch]);

  useEffect(() => {
    if (isLoading === true) {
      fetchData().catch(console.error);
      setIsLoading(false);
    }
  }, [fetchData, isLoading]);

  return (
    <>
      <Head>
        <title>Sessions</title>
      </Head>
      <main>
        <TableManagementComponent
          title='Sessions'
          loadData={loadUsers}
          handleOpenModal={handleOpenModal}
          loadingStatus={sessionState?.loadingStatusGetAll}
          errorMessage={sessionState?.errorInfo?.message}
          TableHead={<SessionTableHead />}
          TableBody={
            <SessionTableBody
              sessions={sessions}
              handleOpenModal={handleOpenModal}
            />
          }
        />
        <Modal openModal={openModal} handleCloseModal={handleCloseModal}>
          <SessionModalContainer
            modalType={modalType}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      </main>
    </>
  );
}

Sessions.getLayout = DashboardPageLayout;

export default Sessions;

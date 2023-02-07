import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import {
  clearErrors,
  selectAll,
} from "@/modules/dashboard/cinema-management/reducer";
import { cinemaGetAllActionAsync } from "@/modules/dashboard/cinema-management/action";
import { DashboardPageLayout } from "@/pages/dashboard/index";
import Modal from "@/modules/dashboard/shared/component/modal";
import React, { useCallback, useEffect, useState } from "react";
import CinemaModalContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-modal-container";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import TableManagementComponent from "@/modules/dashboard/shared/component/table-management-component";
import CinemaTableHead from "@/modules/dashboard/cinema-management/component/cinema-table-head";
import CinemaTableBody from "@/modules/dashboard/cinema-management/component/cinema-table-body";

function Cinemas() {
  const dispatch = useAppDispatch();
  const cinemas = useAppSelector(selectAll);
  const cinemaState = useAppSelector((x) => x.cinema_management_reducer);

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const loadCinemas = async (searchQuery = "") => {
    await dispatch(cinemaGetAllActionAsync(searchQuery));
  };

  const fetchData = useCallback(async () => {
    await dispatch(cinemaGetAllActionAsync(null));
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
        <title>Cinemas</title>
      </Head>
      <main>
        <TableManagementComponent
          title='Cinemas'
          loadData={loadCinemas}
          handleOpenModal={handleOpenModal}
          loadingStatus={cinemaState?.loadingStatusGetAll}
          errorMessage={cinemaState?.errorInfo?.message}
          TableHead={<CinemaTableHead />}
          TableBody={
            <CinemaTableBody
              cinemas={cinemas}
              handleOpenModal={handleOpenModal}
            />
          }
        />
        <Modal openModal={openModal} handleCloseModal={handleCloseModal}>
          <CinemaModalContainer
            modalType={modalType}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      </main>
    </>
  );
}

Cinemas.getLayout = DashboardPageLayout;

export default Cinemas;
